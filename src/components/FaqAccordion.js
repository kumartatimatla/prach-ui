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

const FaqAccordion = () => {
  const context = useContext(AppContext);
  const {
    activeFaq,
    setActiveFaq,
    loading,
    isOpenFaqAccordion,
    setIsOpenFaqAccordion,
    setIsOpenSidebar,
    setIsOpenChatAccordion,
  } = context;

  const navigate = useNavigate();

  const toggleAccordion = () => {
    setIsOpenFaqAccordion(!isOpenFaqAccordion);
    setIsOpenChatAccordion(false);
  };

  const handleClick = (e) => {
    let prompt = e.currentTarget.dataset.name;
    setActiveFaq(prompt);
    if (isMobile) {
      setIsOpenSidebar(false);
    }
    handleSearch(context, navigate, prompt);
  };

  return (
    <div className="">
      <div className="">
        <div
          className={`cursor-pointer bg-[transparent] w-full flex justify-between p-0 redHatBold text-[16px] md:text-[18px] leading-[23px] items-center ${
            isOpenFaqAccordion ? "mb-[13px]" : ""
          }`}
          onClick={toggleAccordion}
        >
          <span>Frequently Asked Questions</span>
          <span className="">
            {isOpenFaqAccordion ? (
              <img src={upArrowBold} alt="up arrow" />
            ) : (
              <img src={downArrowBold} alt="down arrow" />
            )}
          </span>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpenFaqAccordion ? "max-h-[1000px]" : "max-h-0"
          } flex flex-col items-start`}
        >
          <div className="flex flex-col gap-2">
            {suggestedCardsData.slice(0, 12).map((item, i) => {
              return (
                <button
                  className={`flex items-center gap-[11px] ${
                    loading ? "cursor-default" : "cursor-pointer"
                  } text-left`}
                  key={i}
                  onClick={handleClick}
                  data-name={item.title}
                  disabled={loading}
                >
                  <img
                    src={
                      activeFaq === item.title
                        ? rightArrowBold
                        : rightArrowlight
                    }
                    alt="right arrow"
                  />
                  <span
                    className={`${
                      activeFaq === item.title
                        ? "text-black redHatSemiBold"
                        : "text-[#5A5A5A] redHatRegular"
                    } text-[13px] leading-[15px]`}
                  >
                    {item.title}
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

export default FaqAccordion;
