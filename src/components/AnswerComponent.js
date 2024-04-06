import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import likeOutlined from "../images/like-outline.svg";
import disLikeOutlined from "../images/dislike-outline.svg";
import Feedback from "./Feedback";
import { BsClipboard2 } from "react-icons/bs";

const AnswerComponent = ({ answer, obj }) => {
  const lastWordStringIndex = answer.substring(0, obj.viewed);
  const [displayedText, setDisplayedText] = useState("");
  const checkAnchorTagInText = (text, extract) => {
    // Check if we're cutting off inside an <a> tag
    const lastOpenTag = extract.lastIndexOf("<a");
    const lastCloseTag = extract.lastIndexOf("</a>");

    // If there's an opening tag after the last closing tag, we're cutting off inside a tag
    if (lastOpenTag > lastCloseTag) {
      // Find the end of the <a> tag in the original text
      const endOfTag = text.indexOf("</a>", lastOpenTag);

      // If endOfTag is not found, something went wrong, return the initial extract
      if (endOfTag === -1) {
        return extract;
      }

      // Adjust the extract to include the full <a> tag
      extract = text.substring(0, endOfTag + 4);
    }
    return extract;
  };
  useEffect(() => {
    // setDisplayedText(answer.substring(0, lastWordStringIndex.lastIndexOf(" ")));
    setDisplayedText(
      checkAnchorTagInText(
        answer,
        answer.substring(0, lastWordStringIndex.lastIndexOf(" "))
      )
    );
  }, [answer]);
  const [textLength, setTextLength] = useState(
    lastWordStringIndex.lastIndexOf(" ")
  );
  const [showMore, setShowMore] = useState(answer.length > 999);
  const handleShowMore = () => {
    const nextViewed = textLength + 1000;
    const substring = answer.substring(0, nextViewed);
    const lastSpaceIndexInString = substring.lastIndexOf(" ");

    if (answer.length - nextViewed < 100) {
      // setDisplayedText(answer.substring(0, answer.length));
      setDisplayedText(
        checkAnchorTagInText(answer, answer.substring(0, answer.length))
      );
      setShowMore(false);
      setTextLength(answer.length);
    } else {
      // setDisplayedText(answer.substring(0, lastSpaceIndexInString));
      setDisplayedText(
        checkAnchorTagInText(
          answer,
          answer.substring(0, lastSpaceIndexInString)
        )
      );
      setShowMore(displayedText.length < answer.length);
      setTextLength(lastSpaceIndexInString);
    }
  };

  return (
    <div>
      <Markdown rehypePlugins={[rehypeRaw]}>{displayedText}</Markdown>
      {showMore && (
        <>
          {/* <div className="flex gap-3 mt-[15px] mb-[6px]">
            <img src={likeOutlined} alt="like" className="cursor-pointer" />
            <img
              src={disLikeOutlined}
              alt="dislike"
              className="cursor-pointer"
            />
          </div> */}
          <Button
            className="redHatSemiBold min-h-fit h-fit px-[15px] py-[10px] bg-white shadow-md border border-[#DDDDDD] mt-[10px]"
            onClick={handleShowMore}
          >
            Show More
            <sapn className="flex">
              <div
                className={"w-[5px] h-[5px] rounded-full bg-[#ff659b] mr-[2px]"}
              ></div>
              <div
                className={"w-[5px] h-[5px] rounded-full bg-[#52e3ff] mr-[2px]"}
              ></div>
              <div
                className={"w-[5px] h-[5px] rounded-full bg-[#a3a3a3] mr-[2px]"}
              ></div>
            </sapn>
          </Button>
        </>
      )}
      <Feedback chatObj={obj} />
    </div>
  );
};

export default AnswerComponent;
