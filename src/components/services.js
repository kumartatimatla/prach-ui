import axios from "axios";

export const submitFeedback = async (data) => {
  let resp = null;
  try {
    resp = await axios.post(
      "https://www.prach.org:5001/submit_feedback",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    resp = error.message;
  }
  return resp;
};

export const sendLoginData = async (data) => {
  let resp = null;
  try {
    resp = await axios.post(
      "https://www.prach.org:5001/api/create_audit_record",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    resp = error.message;
  }
  return resp;
};

export const sendLogoutData = async (id) => {
  let resp = null;
  try {
    resp = await axios.post(
      `https://www.prach.org:5001/api/update_audit_record/${id}`
    );
  } catch (error) {
    resp = error.message;
  }
  return resp;
};

export const getIdResult = async (data) => {
  let resp = null;
  try {
    resp = await axios.post(
      "https://www.prach.org:5001/retrieve_response",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    resp = error.message;
  }
  return resp;
};
