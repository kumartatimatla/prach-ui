// Sidebar.js
import React, { useContext, useEffect, useState } from "react";
import sidebarIcon from "../images/sidebar-arrow.svg";
import logo from "../images/logo.svg";
import rightArrowBold from "../images/right-arrow-bold.svg";
import {
  Button,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import loginImg from "../images/login-image-guest.svg";
import myAccount from "../images/my-account.svg";
import wpCommunity from "../images/wp-community.svg";
import termsOfUse from "../images/terms-of-use.svg";
import privacyPolicy from "../images/privacy-policy.svg";
import logout from "../images/logout.svg";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import FaqAccordion from "./FaqAccordion";
import newKnowledge from "../images/new-knowledge.svg";
import { isMobile } from "react-device-detect";
import ChatHistoryAccordion from "./ChatHistoryAccordion";
import { googleLogout } from "@react-oauth/google";

const Sidebar = () => {
  const context = useContext(AppContext);
  const {
    signerData,
    isOpenSidebar,
    setIsOpenSidebar,
    chatHistory,
    setIsOpenChatAccordion,
    setIsOpenFaqAccordion,
    setChatHistory,
    setSignerData,
  } = context;
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };
  useEffect(() => {
    if (chatHistory.length > 0) {
      setIsOpenChatAccordion(true);
      setIsOpenFaqAccordion(false);
    } else {
      setIsOpenFaqAccordion(true);
    }
  }, [chatHistory]);
  const logOut = () => {
    googleLogout();
    setChatHistory([]);
    setSignerData([]);
    navigate(`/`);
  };
  return (
    <div
      className={`fixed h-full bg-[#FFFFFF] shadow-lg text-black transition-transform transform ${
        isOpenSidebar ? "translate-x-0" : "-translate-x-full"
      } left-0 top-0 ${isMobile ? "z-[101]" : "z-[51]"} w-[350px] p-[23px]`}
    >
      <button
        className={`bg-[#464646] h-[20px] w-[23px] rounded-tl-2xl rounded-bl-2xl flex items-center justify-center absolute right-0 top-[50%] sidebarBtn ${
          !isOpenSidebar && "rotate-180 right-[-28px]"
        }`}
        onClick={toggleSidebar}
      >
        <img
          src={sidebarIcon}
          alt="sidebar toggle button"
          className="h-[12px] w-[12px]"
        />
      </button>
      <div className="">
        <span className="flex items-center gap-7">
          <img src={logo} alt="Prach Logo" width="58px" height="59px" />
          {Object.keys(signerData).length > 0 && signerData?.verified_email ? (
            <Dropdown
              showArrow
              placement="right-start"
              className=""
              classNames={{
                base: "before:bg-default-200 ",
                content: "shadow-md",
              }}
            >
              <DropdownTrigger>
                <span className="flex flex-col gap-1 px-4 py-1 hover:shadow-lg hover:rounded-[12px]">
                  <span className="redHarRegular font-semibold text-[13px] leading-[19px] text-[#646464]">
                    Good Morning!
                  </span>
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
            <span className="flex flex-col gap-1">
              <span
                className="flex flex-row gap-2 cursor-pointer"
                onClick={() => navigate("/login/?page=login")}
              >
                <span className="redHarRegular font-semibold text-[13px] leading-[19px] text-[#646464]">
                  Login to get more answers
                </span>
                <img src={rightArrowBold} alt="login arrow" />
              </span>
              <span className="flex gap-1 cursor-pointer">
                <span className="w-[20px] h-[20px] bg-[#4A4A4A] rounded-full flex justify-center items-center">
                  <img
                    src={loginImg}
                    alt="login user"
                    className={`bg-[#4A4A4A] w-[13px] h-[13px] rounded-full p-0`}
                  />
                </span>

                <span className="redHatSemiBold text-[#000000] text-[16px] leading-[19px]">
                  Welcome Guest!
                </span>
              </span>
            </span>
          )}
        </span>
        <Divider className="mt-[16px] bg-[#D5D5D5]" />
        <div className="mt-[15px]">
          <FaqAccordion />
        </div>
        {chatHistory.length > 0 && (
          <div>
            <ChatHistoryAccordion />
          </div>
        )}
        <div className="mt-[48px]">
          <span className="text-[12px] leading-[14px] redHatMedium text-[#646464]">
            Start a new knowledge conversation
          </span>
          <Button
            onClick={() => navigate("/")}
            className="bg-white border border-[#DDDDDD] rounded-[8px] w-full p-0 redHatMedium text-[16px] text-[#000000] leading-[21px] mt-[12px] h-[52px]"
            startContent={
              <img
                src={newKnowledge}
                alt="new knowledge"
                className="h-[20px] w-[23px]"
              />
            }
          >
            New Knowledge
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
