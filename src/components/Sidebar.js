// Sidebar.js
import React, { useState } from "react";
import sidebarIcon from "../images/sidebar-arrow.svg";
import logo from "../images/logo.svg";
import rightArrowBold from "../images/right-arrow-bold.svg";
import { Divider } from "@nextui-org/react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed h-full bg-[#FFFFFF] shadow-lg text-black transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } left-0 top-0 z-[51] w-[350px] p-[23px]`}
    >
      <button
        className={`bg-[#464646] h-[20px] w-[23px] rounded-tl-2xl rounded-bl-2xl flex items-center justify-center absolute right-0 top-[50%] sidebarBtn ${
          !isOpen && "rotate-180 right-[-28px]"
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
        <span className="flex outline outline-1">
          <img src={logo} alt="Prach Logo" width="58px" height="59px" />
          <span className="flex flex-col">
            <span className="flex flex-row">
              <span>Login to get more answers</span>
              <img src={rightArrowBold} alt="login arrow" />
            </span>
          </span>
        </span>
        <Divider className="mt-[16px] bg-[#D5D5D5]" />
      </div>
    </div>
  );
};

export default Sidebar;
