import { Button, Input } from "@nextui-org/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { handleSearch } from "../utils/utilityFunctions";
import { cn } from "../utils/cn";
import upArrow from "../images/backward-arrow.svg";
import recordIcon from "../images/record-icon.svg";

const ChatInput = ({ className }) => {
  const context = useContext(AppContext);
  const { enteredPrompt, setEnteredPrompt } = context;
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (enteredPrompt) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [enteredPrompt]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(context, navigate);
    }
  };
  return (
    <div className={cn("flex", className)}>
      <Input
        value={enteredPrompt}
        onKeyDown={handleKeyPress}
        onChange={(e) => setEnteredPrompt(e.target.value)}
        className="w-full"
        classNames={{
          inputWrapper: ["bg-white", "shadow-lg", "pr-[10px]"],
          input: [
            "font-bold",
            "placeholder:text-placeholder",
            "placeholder:text-[18px]",
            "placeholder:leading-[26px]",
            "redHatMedium",
            "text-[20px]",
            "leading-[26px]",
            "pl-[10px]",
          ],
        }}
        placeholder={"How can i help you today? Ask here…"}
        // startContent={<span className="text-green-400 text-2xl pb-1">|</span>}
        endContent={
          <span className="flex gap-1">
            <Button className="min-w-max bg-transparent">
              <img src={recordIcon} alt="search arrow" />
            </Button>
            <Button
              disabled={isDisabled}
              onClick={() => handleSearch(context, navigate)}
              className={`min-w-max rounded-[11px] ${
                isDisabled
                  ? "bg-gray-200 opacity-50 cursor-default"
                  : "bg-[#EBEBEB] cursor-pointer"
              } `}
            >
              <img src={upArrow} alt="search arrow" />
            </Button>
          </span>
        }
      />
    </div>
  );
};

export default ChatInput;
