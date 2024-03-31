import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import { AppContext } from "../App";
import { isMobile } from "react-device-detect";

const ResultDetail = () => {
  const { id } = useParams();
  const context = useContext(AppContext);
  const { isOpenSidebar } = context;
  console.log(id);
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
        {id}
      </div>
    </div>
  );
};

export default ResultDetail;
