import { useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const AnswerComponent = ({ answer, obj }) => {
  const [displayedText, setDisplayedText] = useState(
    answer.substring(0, obj.viewed)
  );
  const [showMore, setShowMore] = useState(answer.length > 1000);

  // const handleShowMore = () => {
  //   const nextViewed = obj.viewed + 1000;
  //   setDisplayedText(answer.substring(0, nextViewed));
  //   setShowMore(nextViewed < answer.length);
  //   obj.viewed = nextViewed;
  // };
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
        <button
          // style={{ color: "red", fontWeight: "bold" }}
          className="font-bold"
          onClick={handleShowMore}
        >
          show more...
        </button>
      )}
    </div>
  );
};

export default AnswerComponent;
