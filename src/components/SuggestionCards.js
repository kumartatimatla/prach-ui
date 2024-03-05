import React from "react";
import samplImg from "../images/sample_img.png";
import { Card, CardBody, Image } from "@nextui-org/react";
import { cn } from "../utils/cn";

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
      <Card className="h-full cursor-pointer">
        <CardBody className="flex flex-row items-center justify-between gap-3 h-full">
          <span className="flex items-center gap-2">
            <span className="min-w-[20px]">
              <Image src={samplImg} alt="sample image" className="h-5 w-5" />
            </span>
            <span className="flex flex-col">
              <span className="font-bold text-[14px]">{title}</span>
              <span className="text-[12px] text-slate-400">{subTitle}</span>
            </span>
          </span>
          <span>&uarr;</span>
        </CardBody>
      </Card>
    </button>
  );
};

export default SuggestionCards;
