import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const handleSearch = async (ctx, navigate, prompt = "") => {
  const {
    chatResponse,
    setChatResponse,
    enteredPrompt,
    setEnteredPrompt,
    setLoading,
    setCloseModal,
    setCheckLogin,
    signerData,
    chatHistory,
    setChatHistory,
    setQuestionPrompt,
    setIsOpenChatAccordion,
  } = ctx;
  if (
    (chatResponse.length === 2 || chatHistory.length === 2) &&
    Object.keys(signerData).length < 1
  ) {
    setCheckLogin(true);
  } else {
    try {
      setLoading(true);
      let questionPromptTemp = "";
      if (prompt) {
        questionPromptTemp = prompt;
      } else if (enteredPrompt) {
        questionPromptTemp = enteredPrompt;
      }
      setQuestionPrompt(questionPromptTemp);
      navigate("/results");
      const response = await axios.post(
        "https://www.prach.org:5001/handle_user_prompt",
        {
          prompt: questionPromptTemp,
          rejectUnauthorized: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let result = response.data.result.choices[0].message.content;
      if (result) {
        let outputString = result.replace(/\n/g, "<br/>");
        let mssgObject = {};
        // mssgObject.id = uuidv4();
        mssgObject.question = questionPromptTemp;
        mssgObject.answer = outputString;
        mssgObject.id = response.data.result.id;
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
        setCloseModal(true);
        setIsOpenChatAccordion(true);
        // navigate("/results");
      }
    } catch (error) {
      setLoading(false);
    }
  }
};
