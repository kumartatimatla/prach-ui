import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import AnswerComponent from "./AnswerComponent";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import ChatInput from "./ChatInput";
import Login from "./Login";
import Sidebar from "./Sidebar";
import loadingLogo from "../images/logo-without-name.svg";
import { isMobile } from "react-device-detect";
import Feedback from "./Feedback";

const Results = () => {
  const context = useContext(AppContext);
  const {
    chatResponse,
    loading,
    setCurrentPage,
    checkLogin,
    setCheckLogin,
    signerData,
    isOpenSidebar,
    questionPrompt,
    setIsOpenSidebar,
  } = context;
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    setCurrentPage("results");
  }, [setCurrentPage]);

  useEffect(() => {
    if (isMobile) {
      setIsOpenSidebar(false);
    }
  }, []);

  useEffect(() => {
    if (chatResponse.length > 0 && !loading) {
      let resp = chatResponse[chatResponse.length - 1];
      const div = document.getElementById(resp.id);
      div.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatResponse]);

  useEffect(() => {
    if (loading) {
      const div = document.getElementById("loader");
      div.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  useEffect(() => {
    if (
      (chatResponse.length === 2 || checkLogin) &&
      Object.keys(signerData).length < 1
    ) {
      setCheckLogin(false);
      onOpen();
    }
  }, [chatResponse, checkLogin]);

  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);

  const handleUpVoteClick = () => {
    setUpVote(!upVote);
    setDownVote(false);
  };

  const handleDownVoteClick = () => {
    setDownVote(!downVote);
    setUpVote(false);
  };

  const handleFeedbackModal = () => {};
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div
      className={`${!isOpenSidebar ? "flex items-center justify-center" : ""}`}
    >
      <div
        className={`my-20 ${
          isOpenSidebar && !isMobile
            ? "ml-[467px] pr-[250px] transition-margin duration-300"
            : "ml-0 transition-margin duration-400  w-[85%]"
        } relative `}
      >
        <Sidebar />

        {/* <div className="redHatMedium text-[16px] leading-[21px] text-[#6F6F6F]">
          Discover the world of Autism
        </div> */}
        {chatResponse.map((item, i) => {
          return (
            <div key={i}>
              <div
                id={item.id}
                className="redHatBold text-[22px] md:text-[32px]"
              >
                {item.question}
              </div>
              <div className="flex items-center mb-3">
                <span className="mr-2">
                  <img src={loadingLogo} alt="loader prach logo" />
                </span>
                <div className="w-48 flex justify-between">
                  <span className="redHatMedium text-[16px] leading-[21px] text-[#6F6F6F]">
                    Answer:
                  </span>
                </div>
              </div>
              <div
                data-container="answer"
                className={`redHatMedium text-black text-[14px] md:text-[18px] leading-[18px] md:leading-[26px]`}
              >
                <AnswerComponent answer={item.answer} obj={item} />
              </div>
              <Divider className="mb-4 mt-[80px]" />
            </div>
          );
        })}
        {loading && (
          <div id="loader" className="flex flex-col gap-2 h-[80vh]">
            <span className="redHatBold text-[22px] md:text-[32px]">
              {questionPrompt}
            </span>
            <div className="flex items-center redHatMedium text-[#6F6F6F] text-[16px] leading-[21px] gap-3">
              <img src={loadingLogo} alt="loader prach logo" />
              <span>Prach is getting answer</span>
              <div className="loader">
                <div className={`circle circle1`}></div>
                <div className={`circle circle2`}></div>
                <div className={`circle circle3`}></div>
                <div className={`circle circle4`}></div>
              </div>
            </div>
          </div>
        )}
        <ChatInput
          className={`fixed z-[100] bottom-[10%] ${
            isMobile ? "w-[94%]" : "w-[60%]"
          } ${isOpenSidebar && !isMobile ? "left-[467px]" : "left-[3%]"}`}
        />
      </div>
    </div>
  );
};

export default Results;
