import React, { useContext } from "react";
import { AppContext } from "../App";
import { isMobile } from "react-device-detect";
import Sidebar from "./Sidebar";

const MyStory = () => {
  const context = useContext(AppContext);
  const { isOpenSidebar } = context;
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
        <div>Hello world</div>
      </div>
    </div>
  );
};

export default MyStory;
