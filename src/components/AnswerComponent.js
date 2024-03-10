import { Button } from "@nextui-org/react";
import { useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import likeOutlined from "../images/like-outline.svg";
import disLikeOutlined from "../images/dislike-outline.svg";
import Feedback from "./Feedback";

const AnswerComponent = ({ answer, obj }) => {
  const lastWordStringIndex = answer.substring(0, obj.viewed);
  const [displayedText, setDisplayedText] = useState(
    answer.substring(0, lastWordStringIndex.lastIndexOf(" "))
  );
  const [textLength, setTextLength] = useState(
    lastWordStringIndex.lastIndexOf(" ")
  );
  const [showMore, setShowMore] = useState(answer.length > 999);
  const handleShowMore = () => {
    const nextViewed = textLength + 1000;
    const substring = answer.substring(0, nextViewed);
    const lastSpaceIndexInString = substring.lastIndexOf(" ");

    if (answer.length - nextViewed < 100) {
      setDisplayedText(answer.substring(0, answer.length));
      setShowMore(false);
      setTextLength(answer.length);
    } else {
      setDisplayedText(answer.substring(0, lastSpaceIndexInString));
      setShowMore(displayedText.length < answer.length);
      setTextLength(lastSpaceIndexInString);
    }
  };

  return (
    <div>
      <Markdown rehypePlugins={[rehypeRaw]}>{displayedText}</Markdown>
      {showMore ? (
        <>
          {/* <div className="flex gap-3 mt-[15px] mb-[16px]">
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
      ) : (
        <Feedback chatObj={obj} />
      )}
    </div>
  );
};

export default AnswerComponent;
