import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import { isMobile } from "react-device-detect";
import { getIdResult } from "./services";

const ResultDetail = () => {
  const { id } = useParams();
  // console.log("params", useParams());
  const context = useContext(AppContext);
  const {
    isOpenSidebar,
    setChatResponse,
    chatResponse,
    chatHistory,
    setChatHistory,
    setEnteredPrompt,
    setLoading,
    setCloseModal,
    setIsOpenChatAccordion,
  } = context;

  const navigate = useNavigate();

  useEffect(() => {
    const getResult = async () => {
      const idObj = {
        id: id,
      };
      let response = await getIdResult(idObj);
      // console.log(result);
      // let result = response.data.result.choices[0].message.content;
      // console.log("idan", idAnswer);
      let result = response.data.result[1];
      if (result) {
        let outputString = result.replace(/\n/g, " <br/>");
        // Define the regular expression to match the pattern
        var regex = /(<br\s*\/?>\s*)(\d+\.\s(?:.{0,97}?:))/gs;

        // Apply bold tag to numbers followed by dot adjacent after <br/> tag
        outputString = outputString.replace(regex, function (match, p1, p2) {
          // Check if the captured string after the number with a dot is longer than 100 characters
          // If it is, do not apply bold. This is a safeguard, though the regex already limits the capture.
          if (p2.length > 70) {
            return match;
          }
          // Return the line break as is, and wrap the number, dot, and following text up to the colon in <b> tags
          return p1 + "<b>" + p2 + "</b>";
        });
        let mssgObject = {};
        // mssgObject.id = uuidv4();
        mssgObject.question = response.data.result[0];
        var urlRegex = /(?:<|\()?((https?:\/\/[^\s<>\)]+))(?:>|\))?/g;

        // Function to replace the matched URL and surrounding characters
        function replaceURLsAndSurroundings(match, url) {
          return `<a href="${url}" style="color: blue; text-decoration: underline;" target="_blank">${url}</a>`;
        }

        // Replace URLs in the text, handling surrounding characters
        var formattedText = outputString.replace(
          urlRegex,
          replaceURLsAndSurroundings
        );

        // Find the index of "<br/>References:" in the paragraph content
        var startIndex = formattedText.indexOf("<br/>References:");

        // If "<br/>References:" is found
        if (startIndex !== -1) {
          // Extract the content starting from "<br/>References:"
          var referencesContent = formattedText.substring(startIndex);

          // Replace the "<br/>References:" with an empty string to remove it
          referencesContent = referencesContent.replace("<br/>References:", "");

          // Split the references content by "<br/>* " to create an array of references
          var referencesArray = referencesContent.split("<br/>* ");

          // Remove the first empty string element created by the split
          referencesArray.shift();

          // Create a new list element to hold the references
          var listElement = document.createElement("ul");

          // Loop through each reference and create a list item for it
          referencesArray.forEach(function (reference) {
            // Create a list item element
            var listItem = document.createElement("li");

            // Set the inner HTML of the list item to the reference content
            listItem.innerHTML = reference;

            // Append the list item to the list element
            listElement.appendChild(listItem);
          });

          // Replace the original paragraph content with the formatted list
          formattedText =
            formattedText.substring(0, startIndex) + listElement.outerHTML;
        }

        mssgObject.answer = formattedText;
        mssgObject.id = id;
        // const answerSubString = outputString.substring((0, 1000));
        // const lastSpaceIndex = answerSubString.lastIndexOf(" ");
        mssgObject.viewed = 1000;
        mssgObject.rating = 0;
        mssgObject.feedback = "";
        setChatResponse([...chatResponse, mssgObject]);
        chatHistory.unshift(mssgObject);
        setChatHistory(chatHistory);
        setEnteredPrompt("");
        setLoading(false);
        // setCloseModal(true);
        setIsOpenChatAccordion(true);
        navigate("/results");
      }
      // navigate("/results");
    };

    getResult();
  }, [
    chatHistory,
    chatResponse,
    id,
    navigate,
    setChatHistory,
    setChatResponse,
    setEnteredPrompt,
    setIsOpenChatAccordion,
    setLoading,
  ]);

  return (
    <div
      className={`${!isOpenSidebar ? "flex items-center justify-center" : ""}`}
    >
      <div
        className={`my-20 ${
          isOpenSidebar && !isMobile
            ? "ml-[467px] pr-[250px] transition-margin duration-300"
            : "ml-0 transition-margin duration-400  w-[85%]"
        } relative `}
      >
        <Sidebar />
      </div>
    </div>
  );
};

export default ResultDetail;
