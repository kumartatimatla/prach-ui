import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const handleSearch = async (ctx, navigate, prompt = "") => {
  const {
    chatResponse,
    setChatResponse,
    enteredPrompt,
    setEnteredPrompt,
    setLoading,
    setCloseModal,
    setCheckLogin,
    signerData,
    chatHistory,
    setChatHistory,
  } = ctx;
  if (chatResponse.length === 2 && Object.keys(signerData).length < 1) {
    setCheckLogin(true);
  } else {
    try {
      setLoading(true);
      let questionPrompt = "";
      if (prompt) {
        questionPrompt = prompt;
      } else if (enteredPrompt) {
        questionPrompt = enteredPrompt;
      }
      navigate("/results");
      const response = await axios.post(
        "http://54.162.133.116:5001/handle_user_prompt",
        {
          prompt: questionPrompt,
          rejectUnauthorized: false,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let result = response.data.result.choices[0].message.content;
      if (result) {
        let outputString = result.replace(/\n/g, "<br/>");
        let mssgObject = {};
        mssgObject.id = uuidv4();
        mssgObject.question = questionPrompt;
        mssgObject.answer = outputString;
        mssgObject.viewed = 1000;
        setChatResponse([...chatResponse, mssgObject]);
        chatHistory.unshift(mssgObject);
        setChatHistory(chatHistory);
        setEnteredPrompt("");
        setLoading(false);
        setCloseModal(true);
        // navigate("/results");
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  }
};
