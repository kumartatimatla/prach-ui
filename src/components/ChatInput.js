import { Button, Input } from "@nextui-org/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { handleSearch } from "../utils/utilityFunctions";
import { cn } from "../utils/cn";

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
    <div className={cn("flex justify-center", className)}>
      <Input
        value={enteredPrompt}
        onKeyDown={handleKeyPress}
        onChange={(e) => setEnteredPrompt(e.target.value)}
        className="sm:w-[100%] md:w-[80%] xl:w-[60%]"
        classNames={{
          inputWrapper: ["bg-white", "shadow-lg"],
          input: ["font-bold"],
        }}
        placeholder={"How can i help you today? Ask here..."}
        startContent={<span className="text-green-400 text-2xl pb-1">|</span>}
        endContent={
          <span className="flex">
            <Button className="min-w-max bg-transparent">&darr;</Button>
            <Button
              disabled={isDisabled}
              onClick={() => handleSearch(context, navigate)}
              className={`min-w-max ${
                isDisabled
                  ? "bg-gray-200 opacity-50 cursor-default"
                  : "bg-gray-300 cursor-pointer"
              } `}
            >
              &uarr;
            </Button>
          </span>
        }
      />
    </div>
  );
};

export default ChatInput;
