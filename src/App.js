import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Results from "./components/Results";
import History from "./components/History";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { sendLoginData } from "./components/services";

export const AppContext = createContext();
function App() {
  const [currentPage, setCurrentPage] = useState("");
  const [enteredPrompt, setEnteredPrompt] = useState("");
  const [chatResponse, setChatResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [signerData, setSignerData] = useState({});
  const [checkLogin, setCheckLogin] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [screenMargin, setScreenMargin] = useState({
    header: "60px",
    footer: "65px",
  });
  const [activeFaq, setActiveFaq] = useState("");
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [isOpenFaqAccordion, setIsOpenFaqAccordion] = useState(false);
  const [isOpenChatAccordion, setIsOpenChatAccordion] = useState(true);
  const [questionPrompt, setQuestionPrompt] = useState("");
  const [loginPayload, setLoginPayload] = useState({});

  useEffect(() => {
    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    if (footer && header) {
      setScreenMargin({
        header: `${header.offsetHeight + 10}px`,
        footer: `${footer.offsetHeight + 10}px`,
      });
    }
  }, []);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  useEffect(() => {
    if (
      (chatResponse.length === 2 || checkLogin) &&
      Object.keys(signerData).length < 1
    ) {
      setCheckLogin(false);
      onOpen();
    }
  }, [chatResponse, checkLogin]);

  useEffect(() => {
    let {
      id,
      email,
      verified_email,
      name,
      given_name,
      family_name,
      picture,
      locale,
    } = signerData;
    let { deviceType, operatingSystem, browser, geolocation } = loginPayload;
    let loginObj = {
      user_id: id,
      email: email,
      email_verified: true,
      full_name: name,
      given_name: given_name,
      family_name: family_name,
      profile_picture_url: picture,
      locale: locale,
      login_method: "Google OAuth",
      device_type: deviceType,
      operating_system: operatingSystem,
      browser: browser,
      // ip_address: "900.118.2.1",
      geolocation: geolocation,
      // number_of_logins: 1,
      // failed_login_attempts: "",
      referral_source: "Direct",
    };
    const sendLoginDataObj = async () => {
      await sendLoginData(loginObj);
    };
    sendLoginDataObj();
  }, [loginPayload]);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        enteredPrompt,
        setEnteredPrompt,
        chatResponse,
        setChatResponse,
        loading,
        setLoading,
        signerData,
        setSignerData,
        checkLogin,
        setCheckLogin,
        screenMargin,
        setScreenMargin,
        chatHistory,
        setChatHistory,
        activeFaq,
        setActiveFaq,
        isOpenSidebar,
        setIsOpenSidebar,
        isOpenFaqAccordion,
        setIsOpenFaqAccordion,
        isOpenChatAccordion,
        setIsOpenChatAccordion,
        questionPrompt,
        setQuestionPrompt,
        loginPayload,
        setLoginPayload,
      }}
    >
      <div className="flex flex-col min-h-screen relative bg-[#f3f3f385]">
        <Router>
          <Modal
            placement="center"
            backdrop="blur"
            size="2xl"
            hideCloseButton
            className="w-[90%] sm:w-fit rounded-[30px]"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            classNames={{
              backdrop: ["z-[150]"],
              wrapper: ["z-[150]", "modalStyle"],
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalBody className="p-0">
                    <Login
                      onClose={onClose}
                      fromHomePage={true}
                      className={"rounded-[30px]"}
                    />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
          <Header
            className={`bg-[#F8F8F8] py-4 px-5 sm:px-10 lg:px-20 fixed w-full top-0 z-50`}
          />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <HomePage
                  className={`flex-1 overflow-y-auto px-5 sm:px-10 lg:px-20 pt-[42px] pb-[82px] bg-[#F8F8F8]`}
                />
              }
            />
            <Route
              path="/login"
              exact
              element={
                <Login className="flex-1 overflow-y-auto my-20 px-5 sm:px-10 lg:px-20" />
              }
            />
            <Route path="/results" exact element={<Results />} />
            <Route path="/history" exact element={<History />} />
          </Routes>

          <Footer className="bg-[#EFEFEF] py-4 px-5 sm:px-10 lg:px-20 fixed w-full bottom-0 z-[55]" />
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
