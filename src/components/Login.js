import React, { useContext, useEffect } from "react";
import { Card, CardBody, Image, Button, Divider } from "@nextui-org/react";
import { cn } from "../utils/cn";
import samplImg from "../images/sample_img.png";
import whatsappIcon from "../images/whatsapp-icon.svg";
import { AppContext } from "../App";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const Login = ({ className, onClose }) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const { setCurrentPage, setSignerData } = context;
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
          navigateHome();
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleClose = () => {};
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Card className="max-w-[400px]">
        <CardBody>
          <div className="flex flex-col items-center justify-center gap-4 relative px-14">
            <div className="right-0 absolute top-0">
              <Button
                onClick={() => onClose()}
                className="min-w-max bg-transparent"
              >
                X
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center mt-3">
              <Image src={samplImg} alt="sample image" className="h-12 w-12" />
              <span className="tracking-widest font-bold">PRACH</span>
            </div>
            <span className="text-sm text-gray-500 text-center">
              Bridging connections and empowering autistic journeys
            </span>
            <span className="font-semibold">Sign in with</span>
            <div className="flex w-full justify-between gap-3">
              <Button onClick={login} className="bg-white shadow-md w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="18px"
                  height="18px"
                  viewBox="0 0 48 48"
                  stroke="#fff"
                  strokeWidth="1.25"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1565C0"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                <span>Google</span>
              </Button>
              <Button className="bg-white shadow-md w-full">
                <Image src={whatsappIcon} width="24px" height="24px" />
                WhatsApp
              </Button>
            </div>
            <span className="text-[10px] text-gray-400 m-5 text-center">
              Bridging connections and empowering autistic journeys
            </span>
          </div>
          <Divider className="mt-10" />
          <div className="flex items-center justify-center gap-2 mt-3">
            <Image src={samplImg} alt="sample image" className="h-5 w-5" />
            <span className="text-[11px] cla">
              Join the Prach{" "}
              <span
                className="text-green-600 cursor-pointer"
                onClick={HandleWhatsappLink}
              >
                WhatsApp
              </span>{" "}
              community
            </span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
