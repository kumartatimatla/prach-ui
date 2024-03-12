import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { handleSearch } from "../utils/utilityFunctions";
import { cn } from "../utils/cn";
import upArrow from "../images/backward-arrow.svg";
import upArrowWhite from "../images/up-arrow-white.svg";
import recordIcon from "../images/record-icon.svg";
import attachmentIcon from "../images/attachment-icon.svg";
import { isMobile, isDesktop } from "react-device-detect";

const ChatInput = ({ className }) => {
  const context = useContext(AppContext);
  const { enteredPrompt, setEnteredPrompt, chatResponse } = context;
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
      {isMobile && (
        <Textarea
          value={enteredPrompt}
          onKeyDown={handleKeyPress}
          onChange={(e) => setEnteredPrompt(e.target.value)}
          className="w-full"
          minRows={2}
          classNames={{
            inputWrapper: ["bg-white", "shadow-lg", "p-[5px]"],
            innerWrapper: ["flex", "flex-col", "items-end"],
            input: [
              "font-bold",
              "placeholder:text-placeholder",
              "placeholder:text-[16px]",
              "placeholder:md:text-[18px]",
              "placeholder:leading-[26px]",
              "redHatMedium",
              "text-[16px]",
              "md:text-[20px]",
              "leading-[26px]",
              "pl-[10px]",
            ],
          }}
          placeholder={`${
            chatResponse.length > 0
              ? "Looking for more answers? Ask here…"
              : "How can i help you today? Ask here…"
          }`}
          // startContent={<span className="text-green-400 text-2xl pb-1">|</span>}
          endContent={
            <span className="flex gap-1 md:gap-5 w-full border border-t-[#71717160] border-r-0 border-l-0 border-b-0 justify-end pt-[5px]">
              <Button
                isDisabled
                className={`min-w-max bg-transparent p-0 ${
                  isMobile ? "p-0 w-[30px] h-[30px]" : ""
                }`}
              >
                <img
                  src={recordIcon}
                  alt="search arrow"
                  className={`${isMobile ? "w-[25px] h-[25px]" : ""}`}
                />
              </Button>
              <Button
                isDisabled
                className={`min-w-max bg-transparent p-0 ${
                  isMobile ? "p-0 w-[30px] h-[30px]" : ""
                }`}
              >
                <img src={attachmentIcon} alt="search arrow" className="" />
              </Button>
              <Button
                disabled={isDisabled}
                onClick={() => handleSearch(context, navigate)}
                className={`min-w-max rounded-[11px] ${
                  isDisabled
                    ? "bg-[#EBEBEB] cursor-default"
                    : "bg-[#000000] cursor-pointer"
                } ${isMobile ? "p-0 w-[30px] h-[30px]" : ""}`}
              >
                <img
                  src={isDisabled ? upArrow : upArrowWhite}
                  alt="search arrow"
                  className={`${isMobile ? "w-[15px] h-[15px]" : ""}`}
                />
              </Button>
            </span>
          }
        />
      )}
      {isDesktop && (
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
          placeholder={`${
            chatResponse.length > 0
              ? "Looking for more answers? Ask here…"
              : "How can i help you today? Ask here…"
          }`}
          // startContent={<span className="text-green-400 text-2xl pb-1">|</span>}
          endContent={
            <span className="flex gap-5">
              <Button isDisabled className="min-w-max bg-transparent p-0">
                <img src={recordIcon} alt="search arrow" />
              </Button>
              <Button isDisabled className="min-w-max bg-transparent p-0">
                <img src={attachmentIcon} alt="search arrow" />
              </Button>
              <Button
                disabled={isDisabled}
                onClick={() => handleSearch(context, navigate)}
                className={`min-w-max rounded-[11px] ${
                  isDisabled
                    ? "bg-[#EBEBEB] cursor-default"
                    : "bg-[#000000] cursor-pointer"
                } `}
              >
                <img
                  src={isDisabled ? upArrow : upArrowWhite}
                  alt="search arrow"
                />
              </Button>
            </span>
          }
        />
      )}
    </div>
  );
};

export default ChatInput;
