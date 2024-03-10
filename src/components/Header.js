import { Button, Image } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import loginImg from "../images/login.svg";
import newKnowledge from "../images/new-knowledge.svg";
import { cn } from "../utils/cn";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import leftArrowBold from "../images/left-arrow-bold.svg";

const Header = ({ className }) => {
  const context = useContext(AppContext);
  const { currentPage, signerData } = context;
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const isScrolled = window.scrollY > 15;
    setScrolled(isScrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="header"
      className={cn(
        `flex ${
          currentPage === "login" ? "justify-start" : "justify-end "
        } gap-8 pt-[38px] ${scrolled ? "shadow-md" : "shadow-none"}`,
        className
      )}
    >
      {currentPage === "login" ? (
        <Button
          onClick={() => navigate("/")}
          className="bg-transparent p-0 text-[16px] leading-[21px] redHatMedium"
          startContent={
            <img src={leftArrowBold} alt="dicover world of autism" />
          }
        >
          Discover the world of Autism
        </Button>
      ) : (
        <>
          {currentPage !== "results" && (
            <Button
              onClick={() => navigate("/")}
              className="bg-transparent p-0 redHatMedium text-[16px] text-[#000000] leading-[21px]"
              startContent={
                <Image
                  src={newKnowledge}
                  alt="new knowledge"
                  className="h-[20px] w-[23px] rounded-none"
                />
              }
            >
              New Knowledge
            </Button>
          )}
          {!(
            Object.keys(signerData).length > 0 && signerData?.verified_email
          ) && (
            <Button
              onClick={() => navigate("/login/?page=login")}
              className="bg-transparent p-0  redHatMedium text-[16px] text-[#000000] leading-[21px]"
              startContent={
                <Image
                  src={loginImg}
                  alt="login image"
                  className="h-[20px] w-[23px] rounded-none"
                />
              }
            >
              Log in
            </Button>
          )}
        </>
      )}
    </nav>
  );
};

export default Header;
