import axios from "axios";

export const submitFeedback = async (data) => {
  let resp = null;
  try {
    resp = await axios.post(
      "http://54.162.133.116:5001/submit_feedback",
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
      "http://54.162.133.116:5001/api/create_audit_record",
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
      `http://54.162.133.116:5001/api/update_audit_record/${id}`
    );
  } catch (error) {
    resp = error.message;
  }
  return resp;
};
