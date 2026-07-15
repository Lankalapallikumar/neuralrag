import axios from "axios";


// NEXT.JS PROXY API
const API = "/api";



/* LOGIN */
export const loginUser =
async (

  email: string,

  password: string

) => {

  const res =
    await axios.post(

      `${API}/auth/login`,

      {

        email,

        password

      }

    );

  return res.data;
};



/* REGISTER */
export const registerUser =
async (

  username: string,

  email: string,

  password: string

) => {

  const res =
    await axios.post(

      `${API}/auth/register`,

      {

        username,

        email,

        password

      }

    );

  return res.data;
};



/* PDF UPLOAD */
export const uploadPDF =
async (

  file: File,

  userId: number

) => {

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const res =
    await axios.post(

      `${API}/upload/pdf?user_id=${userId}`,

      formData,

      {

        headers: {

          "Content-Type":
            "multipart/form-data",

        },

      }

    );

  return res.data;
};



/* ASK QUESTION */
export const askQuestion =
async (

  question: string,

  chatId?: number,

  userId?: number

) => {

  console.log(
    "ASK API CALLED"
  );

  const res =
    await axios.post(

      `${API}/chat/`,

      {

        question,

        chat_id: chatId,

        user_id: userId

      }

    );

  console.log(
    "API RESPONSE:",
    res.data
  );

  return res.data;
};



/* CHAT HISTORY */
export const getChatHistory =
async (

  userId: number

) => {

  const res =
    await axios.get(

      `${API}/chat/history/${userId}`

    );

  return res.data;
};



/* SINGLE CHAT */
export const getChatMessages =
async (

  chatId: number

) => {

  const res =
    await axios.get(

      `${API}/chat/${chatId}`

    );

  return res.data;
};



/* CREATE PAYMENT ORDER */
export const createPaymentOrder =
async () => {

  const res =
    await axios.post(

      `${API}/payment/create-order`

    );

  return res.data;
};



/* VERIFY PAYMENT */
export const verifyPayment =
async (data: any) => {

  const res =
    await axios.post(

      `${API}/payment/verify-payment`,

      data

    );

  return res.data;
};