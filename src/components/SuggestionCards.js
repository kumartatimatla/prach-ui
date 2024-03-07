import React from "react";
import samplImg from "../images/sample_img.png";
import { Card, CardBody, Image } from "@nextui-org/react";
import { cn } from "../utils/cn";
import cardSearchArrow from "../images/backward-arrow-cards.svg";

const SuggestionCards = ({
  className,
  title,
  subTitle,
  iconSrc,
  handleCardClick,
}) => {
  return (
    <button
      className={cn("flex-1", className)}
      name={title}
      onClick={handleCardClick}
    >
      <Card className="h-full min-h-[80px] cursor-pointer max-w-[391px] rounded-[14px]">
        <CardBody className="flex flex-row items-center justify-between gap-3 h-full p-[15px]">
          <span className="flex items-center gap-2">
            <span className="min-w-[20px]">
              <Image src={iconSrc} alt="search card" className="rounded-none" />
            </span>
            <span className="flex flex-col">
              <span className="redHatBold text-[16px] leading-[21px]">
                {title}
              </span>
              <span className="redHatMedim font-semibold text-[12px] leading-[16px] text-[#505050]">
                {subTitle}
              </span>
            </span>
          </span>
          <Image src={cardSearchArrow} alt="search card" />
        </CardBody>
      </Card>
    </button>
  );
};

export default SuggestionCards;
