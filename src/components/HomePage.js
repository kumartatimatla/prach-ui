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

const HomePage = ({ className }) => {
  const context = useContext(AppContext);
  const { setCurrentPage, setActiveFaq, setIsOpenFaqAccordion } = context;
  const navigate = useNavigate();
  const [showMoreCards, setShowMoreCards] = useState(false);

  useEffect(() => {
    setCurrentPage("home");
  }, [setCurrentPage]);

  const handleCardClick = (e) => {
    let prompt = e.currentTarget.name;
    setActiveFaq(prompt);
    setIsOpenFaqAccordion(true);
    handleSearch(context, navigate, prompt);
  };

  return (
    <main className={cn("flex flex-col justify-between", className)}>
      <div className="flex flex-col items-center gap-9 mt-11 ">
        <div className="flex flex-col items-center justify-center">
          <Image src={logo} alt="Prach Logo" className="rounded-none" />
        </div>
        <h2 className="text-2xl font-bold text-center redHatBold text-[22px] md:text-[32px] leading-[32px] md:leading-[43px] w-[60%]">
          Autism Knowledge Assistant!
        </h2>
        <ChatInput className="w-full md:w-[70%]" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="text-[18px] md:text-[24px] leading-[31px] text-[#8B8B8B] redHatBold mt-6">
          Discover the world of Autism
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
