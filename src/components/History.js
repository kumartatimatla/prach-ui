import React, { useContext } from "react";
import { AppContext } from "../App";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const context = useContext(AppContext);
  const { chatHistory, setChatResponse } = context;
  const navigate = useNavigate();

  const handleLinkClick = (data) => {
    setChatResponse([data]);
    navigate("/results");
  };
  return (
    <div className={``}>
      <h3 className="font-bold text-xl mb-3">Chat History</h3>
      {chatHistory.map((item) => {
        return (
          <div className="">
            <Button
              key={item.id}
              onClick={() => handleLinkClick(item)}
              className="bg-transparent cursor-pointer font-semibold h-fit p-0 m-1"
            >
              <span className="font-bold text-xl">•</span> {item.question}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default History;
