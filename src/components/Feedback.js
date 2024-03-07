import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { AppContext } from "../App";

const Feedback = () => {
  const context = useContext(AppContext);
  const { chatResponse, setChatResponse } = context;

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
    console.log("--", arr2);
    setRatingOutlined(arr2.reverse());
  };

  const handleSubmit = (id) => {
    console.log("id", id);
    chatResponse.forEach((resp) => {
      if (resp.id == id) {
        resp.rating = Number(ratingFilled[ratingFilled.length - 1]);
        resp.feedback = userFeedback;
      }
    });
    setChatResponse(chatResponse);
  };
  console.log("chatResponse", chatResponse);
  const handleUserFeedback = (e) => {
    setUserFeedback(e.target.value);
  };
  const [selectedObject, setSelectedObj] = useState({});
  const openFeedback = (item) => {
    console.log("item", item);
    setSelectedObj(item);
  };
  return (
    <div className="m-5">
      {chatResponse.map((item, i) => {
        return (
          <div key={item.id}>
            <h3 className="font-bold text-xl">{item.question}</h3>
            <div>{item.answer}</div>
            <Button
              className="my-2 px-3 py-1 font-bold text-xs h-fit min-w-fit"
              onPress={onOpen}
              onClick={() => openFeedback(item)}
            >
              Feedback
            </Button>
          </div>
        );
      })}
      <Modal size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader> */}
              <ModalBody>
                <h2 className="text-xl font-bold">Rating:</h2>
                <div className="flex gap-1 cursor-pointer shadow-md py-2 px-4 w-fit">
                  {ratingFilled.map((selectedRating, i) => {
                    return (
                      <span
                        id={`star-${selectedRating}`}
                        onClick={() => handleRating(selectedRating)}
                      >
                        <FaStar />
                      </span>
                    );
                  })}
                  {ratingOutlined.map((undelectedRating, i) => {
                    return (
                      <span
                        id={`star-${undelectedRating}`}
                        onClick={() => handleRating(undelectedRating)}
                      >
                        <FaRegStar />
                      </span>
                    );
                  })}
                </div>
                <h2 className="text-xl font-bold">Feedback:</h2>
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
                  onPress={onClose}
                  onClick={() => handleRating(selectedObject.rating)}
                  className="text-black font-semibold"
                >
                  cancel
                </Button>
                <Button
                  onPress={onClose}
                  onClick={() => handleSubmit(selectedObject.id)}
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
