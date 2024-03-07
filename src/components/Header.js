import { Button, Image } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import loginImg from "../images/login.svg";
import newKnowledge from "../images/new-knowledge.svg";
import { cn } from "../utils/cn";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const Header = ({ className }) => {
  const context = useContext(AppContext);
  const { currentPage, signerData, setChatHistory, setSignerData } = context;
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const logOut = () => {
    googleLogout();
    setChatHistory([]);
    setSignerData([]);
    navigate(`/`);
  };

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
          className="bg-transparent p-0 text-[12px]"
          startContent={<span>&larr;</span>}
        >
          Discover the world of Autism
        </Button>
      ) : (
        <>
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
          {Object.keys(signerData).length > 0 && signerData?.verified_email ? (
            <span className="flex justify-center items-center gap-1">
              <span className="rounded-full h-[30px] w-[30px] flex justify-center items-center bg-[#0066DB] text-white">
                {/* {getInitials(signerData?.name) || "kt"} */}
                {signerData?.picture ? (
                  <img
                    style={{
                      borderRadius: "50%",
                      height: "30px",
                      width: "30px",
                    }}
                    src={signerData?.picture}
                    alt="user"
                  />
                ) : (
                  "G"
                )}
              </span>
              <span className="text-sm font-bold">{signerData.name}</span>
              <Button
                isIconOnly
                className="rounded-full min-w-[10px] w-[30px] h-[30px]"
                // color="primary"
                onClick={logOut}
              >
                &rarr;
              </Button>
            </span>
          ) : (
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
