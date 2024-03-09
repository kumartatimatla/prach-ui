import { Button } from "@nextui-org/react";
import { useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const AnswerComponent = ({ answer, obj }) => {
  const [displayedText, setDisplayedText] = useState(
    answer.substring(0, obj.viewed)
  );
  const [showMore, setShowMore] = useState(answer.length > 1000);

  const handleShowMore = () => {
    const nextViewed = obj.viewed + 1000;
    const substring = answer.substring(obj.viewed, nextViewed);
    const lastSpaceIndex = substring.lastIndexOf(" ");

    let newViewed;
    if (lastSpaceIndex > 0) {
      newViewed = obj.viewed + lastSpaceIndex;
    } else {
      const nextSpaceIndex = answer.indexOf(" ", nextViewed);
      newViewed = nextSpaceIndex > 0 ? nextSpaceIndex : nextViewed;
    }

    setDisplayedText(answer.substring(0, newViewed));
    setShowMore(newViewed < answer.length);
    obj.viewed = newViewed;
  };

  return (
    <div>
      <Markdown rehypePlugins={[rehypeRaw]}>{displayedText}</Markdown>
      {showMore && (
        <Button
          className="redHatSemiBold min-h-fit h-fit px-[15px] py-[10px] bg-white shadow-md border border-[#DDDDDD]"
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
      )}
    </div>
  );
};

export default AnswerComponent;
