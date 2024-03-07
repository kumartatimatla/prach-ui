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
import thumbsUpOutlined from "../images/thumbs_up_outline.png";
import thumbsUpFilled from "../images/thumbs_up_filled.png";
import thumbsDownOutlined from "../images/thumbs_down_outline.png";
import thumbsDownFilled from "../images/thumbs_down_filled.png";
import Feedback from "./Feedback";
import Sidebar from "./Sidebar";

const Results = () => {
  const context = useContext(AppContext);
  const {
    chatResponse,
    loading,
    setCurrentPage,
    checkLogin,
    setCheckLogin,
    signerData,
  } = context;
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    setCurrentPage("results");
  }, [setCurrentPage]);

  useEffect(() => {
    if (chatResponse.length > 0 && !loading) {
      let resp = chatResponse[chatResponse.length - 1];
      const div = document.getElementById(resp.id);
      div.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatResponse]);

  useEffect(() => {
    if (loading) {
      const div = document.getElementById("skeleton-loader");
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
    <div className="px-8 my-20">
      <Sidebar />
      <Modal
        backdrop="blur"
        size="2xl"
        hideCloseButton
        className="w-fit"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: ["z-[150]"],
          wrapper: ["z-[150]"],
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-0">
                <Login onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      {chatResponse.map((item, i) => {
        return (
          <div key={i}>
            <div
              id={item.id}
              className="my-3 text-lg sm:text-2xl md:text-3xl text-black"
            >
              {item.question}
            </div>
            <div className="flex items-center mb-3">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div className="w-48 flex justify-between">
                <span className="text-lg text-gray-500 font-medium ">
                  Answer
                </span>
              </div>
            </div>
            <div data-container="answer" className="text-base font-normal">
              <AnswerComponent answer={item.answer} obj={item} />
            </div>
            <Divider className="mb-4 mt-12" />
          </div>
        );
      })}
      {loading && (
        <div className="h-[90vh] my-[20px]">
          <Skeleton id="skeleton-loader" className={`h-[8%] my-4 rounded-md`} />
          <div className="flex items-center mb-3">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="text-lg font-medium">Answer</span>
          </div>
          <Skeleton
            // id="skeleton-loader"
            className={`h-[30%] my-4 rounded-md`}
          />
        </div>
      )}
      <ChatInput className="fixed z-[100] bottom-[10%] w-[90%]" />
    </div>
  );
};

export default Results;
