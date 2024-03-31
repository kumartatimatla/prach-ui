import {
  Button,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import loginImg from "../images/login.svg";
import newKnowledge from "../images/new-knowledge.svg";
import { cn } from "../utils/cn";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import leftArrowBold from "../images/left-arrow-bold.svg";
import myAccount from "../images/my-account.svg";
import wpCommunity from "../images/wp-community.svg";
import termsOfUse from "../images/terms-of-use.svg";
import privacyPolicy from "../images/privacy-policy.svg";
import logout from "../images/logout.svg";
import { isMobile } from "react-device-detect";
import rightArrowBold from "../images/right-arrow-bold.svg";
import { googleLogout } from "@react-oauth/google";
import { sendLogoutData } from "./services";

const Header = ({ className }) => {
  const context = useContext(AppContext);
  const {
    currentPage,
    signerData,
    setChatHistory,
    setSignerData,
    setChatResponse,
  } = context;
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

  const logOut = async () => {
    googleLogout();
    await sendLogoutData(signerData?.id);
    setChatHistory([]);
    setSignerData([]);
    setChatResponse([]);
    navigate(`/`);
  };

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
          className="bg-transparent p-0 text-[14px] md:text-[16px] leading-[21px] redHatMedium"
          startContent={
            <img src={leftArrowBold} alt="dicover world of autism" />
          }
        >
          Discover the world of Autism
        </Button>
      ) : (
        <>
          {/* {currentPage !== "results" && (
            <Button
              onClick={() => navigate("/")}
              className="bg-transparent p-0 redHatMedium text-[14px] md:text-[16px] text-[#000000] leading-[21px]"
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
          )} */}
          {Object.keys(signerData).length > 0 && signerData?.verified_email ? (
            <Dropdown
              showArrow
              placement={`${isMobile}?"top-end":right-start`}
              className=""
              classNames={{
                base: "before:bg-default-200 ",
                content: "shadow-md",
              }}
            >
              <DropdownTrigger>
                <span className="flex flex-col gap-1 px-4 py-1 hover:shadow-lg hover:rounded-[12px]">
                  <span className="flex gap-1 cursor-pointer">
                    <span className="w-[20px] h-[20px] bg-[#4A4A4A] rounded-full flex justify-center items-center">
                      <img
                        src={signerData?.picture}
                        alt="login user"
                        className={`w-[20px] h-[20px] rounded-full p-0`}
                      />
                    </span>
                    <span className="redHatSemiBold text-[#000000] text-[16px] leading-[19px] flex gap-2 items-center justify-center">
                      {signerData?.name}
                      <img src={rightArrowBold} alt="user details" />
                    </span>
                  </span>
                </span>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dropdown menu with description">
                <DropdownItem
                  key="my-account"
                  className="flex redHatMedium text-[14px]"
                  startContent={<img src={myAccount} alt="" />}
                >
                  My Account
                </DropdownItem>
                <DropdownItem
                  key="ap-community"
                  className="flex redHatMedium text-[14px]"
                  startContent={<img src={wpCommunity} alt="" />}
                >
                  WhatsApp Community
                </DropdownItem>
                <DropdownItem
                  key="terms-of-use"
                  className="flex redHatMedium text-[14px]"
                  startContent={<img src={termsOfUse} alt="" />}
                >
                  Terms of use
                </DropdownItem>
                <DropdownItem
                  key="privacy-policy"
                  className="flex redHatMedium text-[14px]"
                  startContent={<img src={privacyPolicy} alt="" />}
                >
                  Privacy Policy
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="flex redHatMedium text-[14px] border border-t-1 border-l-0 border-r-0 border-b-0"
                  startContent={<img src={logout} alt="" />}
                  onClick={logOut}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Tooltip
              color="warning"
              closeDelay={5000}
              content="Login for better experience"
              className="bg-white text-[12px] rounded-md"
            >
              <Button
                onClick={() => navigate("/login/?page=login")}
                // className="bg-transparent p-0  redHatMedium text-[14px] md:text-[16px] text-[#000000] leading-[21px]"
                className="redHatSemiBold min-h-fit h-fit px-[15px] py-[10px] bg-[#1859c9] text-white border border-[#DDDDDD] shadow-lg rounded-xl"
                startContent={
                  <Image
                    src={loginImg}
                    alt="login image"
                    className="h-[18px] w-[18px] rounded-none text-white color-[#fff]"
                  />
                }
              >
                Log in
              </Button>
            </Tooltip>
          )}
        </>
      )}
    </nav>
  );
};

export default Header;
