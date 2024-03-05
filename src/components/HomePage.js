import React, { useContext, useEffect, useState } from "react";
import { cn } from "../utils/cn";
import samplImg from "../images/sample_img.png";
import { Image } from "@nextui-org/react";
import SuggestionCards from "./SuggestionCards";
import { suggestedCardsData } from "../utils/suggestionCardsData";
import ChatInput from "./ChatInput";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { handleSearch } from "../utils/utilityFunctions";

const HomePage = ({ className }) => {
  const context = useContext(AppContext);
  const { setCurrentPage } = context;
  const navigate = useNavigate();
  const [showMoreCards, setShowMoreCards] = useState(false);

  useEffect(() => {
    setCurrentPage("home");
  }, [setCurrentPage]);

  const handleCardClick = (e) => {
    let prompt = e.currentTarget.name;
    handleSearch(context, navigate, prompt);
  };

  return (
    <main className={cn("flex flex-col justify-around gap-12", className)}>
      <div className="flex flex-col items-center gap-5 mt-5">
        <div className="flex flex-col items-center justify-center">
          <Image src={samplImg} alt="sample image" className="h-12 w-12" />
          <span className="tracking-widest font-bold">PRACH</span>
        </div>
        <h2 className="text-2xl font-bold text-center">
          Welcome to Prach Knowledge Assistant on Autism!
        </h2>
        <ChatInput className="w-full" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="text-xl text-gray-500">
          Discover the world of Autism
        </div>
        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
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
          className="flex gap-2 cursor-pointer mt-5 font-bold text-[14px]"
          onClick={() => setShowMoreCards((prev) => !prev)}
        >
          {!showMoreCards ? (
            <>
              <span>+ 8 More</span>
              <div className="rotate-180">^</div>
            </>
          ) : (
            <>
              <span>show less</span>
              <div>^</div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
