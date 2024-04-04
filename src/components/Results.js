import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import AnswerComponent from "./AnswerComponent";
import { Button, Divider, useDisclosure } from "@nextui-org/react";
import ChatInput from "./ChatInput";
import Login from "./Login";
import Sidebar from "./Sidebar";
import loadingLogo from "../images/logo-without-name.svg";
import { isMobile, isTablet, isIPad13, isAndroid } from "react-device-detect";
import Feedback from "./Feedback";
import { BsClipboard2 } from "react-icons/bs";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { WhatsappShareButton } from "react-share";
// import whatsappIcon from "../images/whatsapp-icon.png";

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
    chatHistory,
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
      (chatResponse.length === 2 || chatHistory.length === 2 || checkLogin) &&
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
  const [textCopied, setTextCopied] = useState("");
  const baseUrl = window.location.origin;

  const handleTextCopy = (id) => {
    setTextCopied(id);
    setTimeout(() => {
      setTextCopied("");
    }, 5000);
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
                className="redHatBold text-[16px] md:text-[22px] flex items-center"
              >
                {item.question}

                <CopyToClipboard
                  text={`${baseUrl}/results/${item.id}`}
                  onCopy={() => handleTextCopy(item.id)}
                >
                  <button
                    // onClick={() => handleCopyClick(item.id)}
                    className="cursor-pointer relative"
                  >
                    <BsClipboard2 className="scale-1 hover:scale-[0.9] h-[20px] w-[20px]" />
                    <span className="text-sm redHatRegular absolute top-[150%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg py-1 px-2">
                      {item.id === textCopied && "copied!"}
                    </span>
                  </button>
                </CopyToClipboard>
                {/* <WhatsappShareButton
                  url={`${baseUrl}/results/${item.id}`}
                >
                  <img
                    src={whatsappIcon}
                    alt="prach logo"
                  />
                </WhatsappShareButton> */}
              </div>
              <div className="flex items-center mb-3">
                <span className="mr-2">
                  <img
                    src={loadingLogo}
                    alt="loader prach logo"
                    className="w-[18px] md:w-[29px] h-[16px] md:h-[23px]"
                  />
                </span>
                <div className="w-48 flex justify-between">
                  <span className="redHatMedium text-[14px] md:text-[16px] leading-[21px] text-[#6F6F6F]">
                    Answer:
                  </span>
                </div>
              </div>
              <div
                data-container="answer"
                className={`redHatRegular text-black text-[14px] md:text-[18px] leading-[18px] md:leading-[26px]`}
              >
                <AnswerComponent answer={item.answer} obj={item} />
              </div>
              <Divider className="mb-4 mt-[80px]" />
            </div>
          );
        })}
        {loading && (
          <div id="loader" className="flex flex-col gap-2 h-[80vh] mt-[20px]">
            <span className="redHatBold text-[16px] md:text-[22px]">
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
          className={`fixed z-[100] bottom-[5%] md:bottom-[4%] ${
            isMobile || isTablet || isIPad13 || isAndroid
              ? "w-[94%]"
              : "w-[60%]"
          } ${
            isOpenSidebar && (!isMobile || !isTablet || !isIPad13 || !isAndroid)
              ? "left-[467px]"
              : "left-[3%]"
          }`}
        />
      </div>
    </div>
  );
};

export default Results;
