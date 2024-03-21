import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { AppContext } from "../App";
import { submitFeedback } from "./services";

const Feedback = ({ chatObj }) => {
  const context = useContext(AppContext);
  const { chatResponse, setChatResponse, signerData } = context;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ratingOutlined, setRatingOutlined] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
  ]);
  const [ratingFilled, setRatingFilled] = useState([]);
  const [userFeedback, setUserFeedback] = useState("");

  const handleRating = (stars) => {
    let arr = [];
    let arr2 = [];
    for (let i = 1; i <= Number(stars); i++) {
      arr.push(i + "");
    }
    setRatingFilled(arr);
    for (let i = 5; i > Number(stars); i--) {
      arr2.push(i + "");
    }
    setRatingOutlined(arr2.reverse());
  };

  const handleSubmit = async (obj) => {
    chatResponse.forEach((resp) => {
      if (resp.id === obj.id) {
        resp.rating = Number(ratingFilled[ratingFilled.length - 1]);
        resp.feedback = userFeedback;
      }
    });
    setChatResponse(chatResponse);
    const data = {
      id: obj.id,
      userName: signerData?.name || "Anonymous",
      userEmail: signerData?.email || "Anonymous",
      question: obj.question,
      rating: Number(ratingFilled[ratingFilled.length - 1]),
      feedback: userFeedback,
    };
    await submitFeedback(data);
    // onClose();
  };
  const handleCancel = () => {
    onClose();
    setUserFeedback("");
    handleRating(0);
  };
  const handleUserFeedback = (e) => {
    setUserFeedback(e.target.value);
  };
  const [selectedObject, setSelectedObj] = useState({});
  const openFeedback = (item) => {
    setSelectedObj(item);
  };

  return (
    <div className="mt-[10px]">
      <Button
        className="redHatSemiBold min-h-fit h-fit px-[15px] py-[10px] bg-black text-white shadow-md border border-[#DDDDDD]"
        onPress={onOpen}
        onClick={() => openFeedback(chatObj)}
      >
        Feedback
      </Button>
      <Modal
        size="sm"
        placement="center"
        classNames={{
          backdrop: ["z-[150]"],
          wrapper: ["z-[150]", "modalStyle"],
        }}
        className=""
        isOpen={isOpen}
        onClose={handleCancel}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
              <ModalBody>
                <h2 className="text-[18px] redHatBold font-bold">Rating:</h2>
                <div className="flex gap-1 cursor-pointer shadow-md py-2 px-4 w-fit">
                  {ratingFilled.map((selectedRating, i) => {
                    return (
                      <span
                        id={`star-${selectedRating}`}
                        onClick={() => handleRating(selectedRating)}
                      >
                        <FaStar size="30px" color="#000000" />
                      </span>
                    );
                  })}
                  {ratingOutlined.map((undelectedRating, i) => {
                    return (
                      <span
                        id={`star-${undelectedRating}`}
                        onClick={() => handleRating(undelectedRating)}
                      >
                        <FaRegStar size="30px" color="#000000" />
                      </span>
                    );
                  })}
                </div>
                <h2 className="text-[18px] redHatBold ">Feedback:</h2>
                <Textarea
                  // variant="bordered"
                  // labelPlacement="outside"
                  value={userFeedback}
                  onChange={handleUserFeedback}
                  placeholder="Was this answer helpful? Share your feedback..."
                  className="max-w-xs shadow-md"
                  classNames={{
                    inputWrapper: ["bg-white", "rounded-none"],
                    input: ["font-semibold"],
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={handleCancel}
                  className="text-black font-semibold"
                >
                  Cancel
                </Button>
                {console.log("ratingFilled", ratingFilled)}
                <Button
                  isDisabled={
                    Number(ratingFilled[ratingFilled.length - 1]) < 1 ||
                    ratingFilled.length < 1
                  }
                  onPress={onClose}
                  onClick={() => handleSubmit(chatObj)}
                  className="bg-gray-300 font-semibold"
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Feedback;
