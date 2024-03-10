import React, { useContext, useEffect } from "react";
import { Card, CardBody, Image, Button, Divider } from "@nextui-org/react";
import { cn } from "../utils/cn";
import logo from "../images/logo.svg";
import whatsappIcon from "../images/whatsapp-icon.png";
import { AppContext } from "../App";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import closeIcon from "../images/close-icon.svg";
import googleIcon from "../images/google-icon.png";
import microsoftIcon from "../images/microsoft-icon.png";

const Login = ({ className, onClose }) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const { setCurrentPage, setSignerData, currentPage } = context;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const page = queryParams.get("page");

  useEffect(() => {
    if (page) {
      setCurrentPage("login");
    }
  }, []);

  const HandleWhatsappLink = () => {
    window.open("https:chat.whatsapp.com/LHn5MBkfqPqJ8WSVUgst3v", "_blank");
  };
  const handleWp = () => {
    window.open(
      "https://whatsapp.com/channel/0029VaN2eFq0bIdh8tUlwX44",
      "_blank"
    );
  };
  const navigateHome = () => {
    navigate("/");
  };
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setSignerData(res.data);
          onClose();
          navigateHome();
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleClose = () => {
    if (currentPage === "login") {
      navigate("/");
    } else {
      onClose();
    }
  };
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-[#F8F8F8]",
        className
      )}
    >
      <Card className="max-w-[550px] max-h-[615px] rounded-[30px]">
        <CardBody>
          <div className="flex flex-col items-center justify-center gap:2 md:gap-4 relative px-[60px]">
            <div className="right-0 absolute top-0">
              <Button
                onClick={handleClose}
                className="min-w-max bg-transparent"
              >
                <img src={closeIcon} alt="close icon" />
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center mt-6">
              <img src={logo} alt="Prach Logo" className="h-[99px] w-[98px]" />
            </div>
            <span className="redHatMedium text-[16px] md:text-[20px] text-[#606060] text-center mt-[15px] md:mt-[26px] mb-[15px] md:mb-[26px]">
              Bridging connections and empowering autistic journeys
            </span>
            <span className="text-[20px] md:text-[24px] redHatBold text-[#212121] mb-[10px] mt-[10px]">
              Log in with
            </span>
            <div className="flex w-full justify-between gap-3">
              <Button
                onClick={login}
                className="bg-white shadow-md w-full max-h-[56px] h-[56px]"
              >
                <img
                  src={googleIcon}
                  alt="google icon"
                  className="w-[24px] h-[24px]"
                />
                <span className="text-[20px] leading-[26px] redHatMedium text-[#212121]">
                  Google
                </span>
              </Button>
              {/* <Button
                className="bg-white shadow-md w-full max-h-[56px] max-w-[209px] h-[56px]"
              >
                <img
                  src={whatsappIcon}
                  alt="microsoft icon"
                  className="w-[30px] h-[30px]"
                />
                <span className="text-[20px] leading-[26px] redHatMedium text-[#212121]">
                  whatsapp
                </span>
              </Button> */}
            </div>
          </div>
          <Divider className="mt-[30px] md:mt-[70px]" />
          <div
            className="flex items-center justify-center gap-2 mt-[20px] mb-[12px] md:mb-[20px] cursor-pointer"
            onClick={HandleWhatsappLink}
          >
            <img
              src={whatsappIcon}
              alt="prach logo"
              className="h-[32px] w-[32px]"
            />
            <span className="text-[14px] md:text-[17px] redHatBold text-[#212121]">
              Join the Prach WhatsApp community
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
