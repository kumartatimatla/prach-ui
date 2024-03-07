import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Results from "./components/Results";
import History from "./components/History";

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
  console.log("signer data", signerData);

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
      }}
    >
      <div className="flex flex-col min-h-screen relative bg-[#f3f3f385]">
        <Router>
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
