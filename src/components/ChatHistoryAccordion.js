// Accordion.js
import { Button, Divider } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import upArrowBold from "../images/up-arrow-bold.svg";
import rightArrowlight from "../images/right-arrow-light.svg";
import rightArrowBold from "../images/right-arrow-bold.svg";
import downArrowBold from "../images/down-arrow-bold.svg";
import { suggestedCardsData } from "../utils/suggestionCardsData";
import { handleSearch } from "../utils/utilityFunctions";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { isMobile } from "react-device-detect";

const ChatHistoryAccordion = () => {
  const context = useContext(AppContext);
  const {
    activeFaq,
    setActiveFaq,
    loading,
    isOpenChatAccordion,
    setIsOpenChatAccordion,
    setIsOpenSidebar,
    setChatResponse,
    chatHistory,
    setIsOpenFaqAccordion,
  } = context;

  const navigate = useNavigate();

  const toggleAccordion = () => {
    setIsOpenChatAccordion(!isOpenChatAccordion);
    setIsOpenFaqAccordion(false);
  };

  useEffect(() => {
    if (chatHistory.length > 0) {
      setIsOpenFaqAccordion(false);
      setIsOpenChatAccordion(true);
    }
  }, [chatHistory, setIsOpenFaqAccordion, setIsOpenChatAccordion]);

  const handleClick = (e) => {
    let prompt = e.currentTarget.dataset.name;
    setActiveFaq(prompt);
    handleSearch(context, navigate, prompt);
  };
  const handleLinkClick = (data) => {
    setActiveFaq(data.question);
    if (isMobile) {
      setIsOpenSidebar(false);
    }
    setChatResponse([data]);
  };
  return (
    <div className="mt-3">
      <div className="">
        <div
          className={`cursor-pointer bg-[transparent] w-full flex justify-between p-0 redHatBold text-[14px] md:text-[14px] leading-[23px] items-center ${
            isOpenChatAccordion ? "mb-[13px]" : ""
          }`}
          onClick={toggleAccordion}
        >
          <span>Chat History</span>
          <span className="">
            {isOpenChatAccordion ? (
              <img src={upArrowBold} alt="up arrow" />
            ) : (
              <img src={downArrowBold} alt="down arrow" />
            )}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpenChatAccordion ? "max-h-[1000px]" : "max-h-0"
          } flex flex-col items-start`}
        >
          <div className="flex flex-col gap-2">
            {chatHistory.map((item, i) => {
              return (
                <button
                  className={`flex items-center gap-[11px] ${
                    loading ? "cursor-default" : "cursor-pointer"
                  } text-left`}
                  key={i}
                  onClick={() => handleLinkClick(item)}
                  data-name={item.question}
                  disabled={loading}
                >
                  <img
                    src={
                      activeFaq === item.question
                        ? rightArrowBold
                        : rightArrowlight
                    }
                    alt="right arrow"
                  />
                  <span
                    className={`${
                      activeFaq === item.question
                        ? "text-black redHatSemiBold"
                        : "text-[#5A5A5A] redHatRegular"
                    } text-[13px] leading-[15px]`}
                  >
                    {item.question}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <Divider className="mt-3" />
    </div>
  );
};

export default ChatHistoryAccordion;
