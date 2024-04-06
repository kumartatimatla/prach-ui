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

const Login = ({ className, onClose, fromHomePage }) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const {
    setCurrentPage,
    setSignerData,
    currentPage,
    signerData,
    loginPayload,
    setLoginPayload,
  } = context;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const page = queryParams.get("page");

  useEffect(() => {
    if (page) {
      setCurrentPage("login");
    }
  }, []);

  useEffect(() => {
    if (Object.keys(signerData).length > 0) {
      navigate("/");
    }
  }, [signerData]);

  // Function to get the operating system
  function getOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      return "Android";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    } else if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    } else if (/windows/i.test(userAgent)) {
      return "Windows";
    } else if (/macintosh|mac os x/i.test(userAgent)) {
      return "Mac OS";
    } else if (/linux/i.test(userAgent)) {
      return "Linux";
    } else {
      return "Unknown";
    }
  }

  function getBrowser() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/OPR/i.test(userAgent)) {
      return "Opera";
    } else if (/Chrome/i.test(userAgent)) {
      return "Chrome";
    } else if (/Firefox/i.test(userAgent)) {
      return "Firefox";
    } else if (/Safari/i.test(userAgent)) {
      return "Safari";
    } else if (/Edge/i.test(userAgent)) {
      return "Edge";
    } else if (/MSIE/i.test(userAgent)) {
      return "IE";
    } else {
      return "Unknown";
    }
  }

  const getAdditionalLoginData = async () => {
    const deviceType =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
        ? "Mobile"
        : "Desktop";
    const operatingSystem = getOperatingSystem();
    const browser = getBrowser();

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      const geolocation = { latitude, longitude };
      setLoginPayload({ deviceType, operatingSystem, browser, geolocation });
      return { deviceType, operatingSystem, browser, geolocation };
    } catch (error) {
      console.error("Error getting geolocation:", error);
      return { deviceType, operatingSystem, browser, geolocation: null };
    }
  };

  const HandleWhatsappLink = () => {
    window.open("https://chat.whatsapp.com/LHn5MBkfqPqJ8WSVUgst3v", "_blank");
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
    onSuccess: async (codeResponse) => {
      await axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          setSignerData(res.data);
          await getAdditionalLoginData();
          if (fromHomePage) {
            onClose();
          }
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
              <img
                src={logo}
                alt="Prach Logo"
                className="w-[60px] h-[60px] md:h-[99px] md:w-[98px]"
              />
            </div>
            <span className="redHatBold text-[16px] md:text-[20px] text-[#000000] text-center mt-[15px] md:mt-[26px] mb-[15px] md:mb-[26px]">
              {/* Bridging connections and empowering autistic journeys */}
              Neurodiverse Companion
            </span>
            <span className="text-[20px] md:text-[22px] redHatBold text-[#212121] mb-[10px] mt-[10px]">
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
            onClick={handleWp}
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
