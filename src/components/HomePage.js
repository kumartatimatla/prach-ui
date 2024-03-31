import React, { useContext, useEffect, useState } from "react";
import { cn } from "../utils/cn";
import logo from "../images/logo.svg";
import moreIcon from "../images/more-icon.svg";
import { Image } from "@nextui-org/react";
import SuggestionCards from "./SuggestionCards";
import { suggestedCardsData } from "../utils/suggestionCardsData";
import ChatInput from "./ChatInput";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { handleSearch } from "../utils/utilityFunctions";
import { accoladesData } from "../utils/accoladesData";
import Accolades from "./Accolades";
import loginImg from "../images/login.svg";
import { isMobile } from "react-device-detect";

const HomePage = ({ className }) => {
  const context = useContext(AppContext);
  const { setCurrentPage, setActiveFaq, setIsOpenFaqAccordion, signerData } =
    context;
  const navigate = useNavigate();
  const [showMoreCards, setShowMoreCards] = useState(false);

  useEffect(() => {
    setCurrentPage("home");
  }, [setCurrentPage]);

  useEffect(() => {
    if (Object.keys(signerData).length > 0 && signerData?.verified_email) {
      navigate("/results");
    }
  }, [signerData]);

  const handleCardClick = (e) => {
    let prompt = e.currentTarget.name;
    setActiveFaq(prompt);
    // setIsOpenFaqAccordion(true);
    handleSearch(context, navigate, prompt);
  };

  useEffect(() => {
    let element = null;
    if (isMobile) {
      element = document.getElementById("mainChatMobile");
    } else {
      element = document.getElementById("mainChatDesktop");
    }
    if (element) {
      element.focus();
    }
  }, []);

  return (
    <main className={cn("flex flex-col justify-between", className)}>
      <div className="flex flex-col items-center gap-5 md:gap-9 mt-8 md:mt-11 ">
        <div className="flex flex-col items-center justify-center">
          <img
            src={logo}
            alt="Prach Logo"
            className="rounded-none w-[70px] h-[70px] md:w-[120px] md:h-[120px]"
          />
        </div>
        <h2 className="text-2xl font-bold text-center redHatBold text-[16px] md:text-[22px] leading-[20px] md:leading-[43px] w-[60%]">
          Special Needs Companion
        </h2>
        <ChatInput className="w-full md:w-[70%]" />
        <p className="text-center w-full md:w-[70%] text-sm md:text-md">
          <em>
            Prach AI Chatbot is designed to offer Support and Information. Our
            conversations do not replace Medical Advice
          </em>
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="text-[18px] md:text-[20px] leading-[31px] text-[#8B8B8B] redHatBold mt-6">
          Frequently Asked Questions
        </div>
        <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {suggestedCardsData
            .slice(0, showMoreCards ? 16 : 4)
            .map((card, i) => {
              const { title, subTitle, iconSrc } = card;
              return (
                <SuggestionCards
                  handleCardClick={handleCardClick}
                  key={i + { title }}
                  title={title}
                  subTitle={subTitle}
                  iconSrc={iconSrc}
                />
              );
            })}
        </div>

        <div
          className="flex gap-2 cursor-pointer mt-5 font-bold text-[14px] leading-[18px]"
          onClick={() => setShowMoreCards((prev) => !prev)}
        >
          {!showMoreCards ? (
            <>
              <span className="redHatBold">+ 8 More</span>
              <img src={moreIcon} alt="show more" />
            </>
          ) : (
            <>
              <span className="redHatBold">show less</span>
              <img src={moreIcon} alt="show more" className="rotate-180" />
            </>
          )}
        </div>
        {/* <div className="gap-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {accoladesData.map((item, i) => {
            return (
              <Accolades
                key={i + item.userName}
                title={item.userName}
                subTitle={item.review}
                iconSrc={loginImg}
              />
            );
          })}
        </div> */}
      </div>
    </main>
  );
};

export default HomePage;
