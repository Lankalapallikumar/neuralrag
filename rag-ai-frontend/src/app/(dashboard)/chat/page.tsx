"use client";

import { useEffect, useRef, useState } from "react";

import {
  uploadPDF,
  askQuestion,
  getChatHistory,
  getChatMessages,
  createPaymentOrder,
  verifyPayment,
} from "@/lib/api";

type Message = {
  role: string;
  content: string;
};

type Chat = {
  id: number;
  title: string;
};

type User = {
  id: number;
  username: string;
  email: string;
  is_pro: boolean;
};

export default function ChatPage() {

  const [mounted, setMounted] =
    useState(false);

  const [file, setFile] =
    useState<File | null>(null);

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [history, setHistory] =
    useState<Chat[]>([]);

  const [currentChatId, setCurrentChatId] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [user, setUser] =
    useState<User | null>(null);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);


  // HYDRATION
  useEffect(() => {

    setMounted(true);

  }, []);


  // AUTO SCROLL
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({

      behavior: "smooth",

    });

  }, [messages]);


  // LOAD USER
  useEffect(() => {

    if (!mounted)
      return;

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {

      window.location.href =
        "/login";

      return;
    }

    try {

      const parsedUser: User =
        JSON.parse(storedUser);

      setUser(parsedUser);

    } catch (error) {

      console.log(error);

    }

  }, [mounted]);


  // LOAD HISTORY
  const loadHistory = async (
    userId: number
  ) => {

    try {

      const data =
        await getChatHistory(
          userId
        );

      setHistory(data || []);

    } catch (error) {

      console.log(error);

    }
  };


  // LOAD HISTORY AFTER LOGIN
  useEffect(() => {

    if (user?.id) {

      loadHistory(user.id);

    }

  }, [user]);


  // LOAD CHAT
  const loadChat = async (
    chatId: number
  ) => {

    try {

      const data =
        await getChatMessages(chatId);

      setMessages(data || []);

      setCurrentChatId(chatId);

    } catch (error) {

      console.log(error);

    }
  };


  // PAYMENT
  const handlePayment = async () => {

    try {

      const order =
        await createPaymentOrder();

      if (order.error) {

        alert(order.error);

        return;
      }

      const options = {

        key:
          "rzp_test_SuPfiMl421OjIs",

        amount:
          order.amount,

        currency:
          order.currency,

        name:
          "NeuralRAG",

        description:
          "Pro Upgrade",

        order_id:
          order.id,

        handler:
          async function (
            response: any
          ) {

            try {

              const verifyData =
                await verifyPayment({

                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,

                  user_id:
                    user?.id,

                });

              if (
                verifyData.is_pro
              ) {

                const updatedUser = {

                  ...user,

                  is_pro: true,

                } as User;

                setUser(updatedUser);

                localStorage.setItem(

                  "user",

                  JSON.stringify(
                    updatedUser
                  )

                );

                alert(
                  "Pro Activated!"
                );
              }

            } catch (error) {

              console.log(error);

            }
          },

        theme: {

          color:
            "#2563eb",

        },

      };

      const razorpay =
        new (window as any)
        .Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.log(error);

    }
  };


  // UPLOAD
  const handleUpload = async () => {

    if (!file || !user?.id)
      return;

    setLoading(true);

    try {

      const data =
        await uploadPDF(

          file,

          user.id

        );

      setMessages((prev) => [

        ...prev,

        {

          role: "system",

          content:
            `PDF Uploaded: ${data.filename}`,

        },

      ]);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };


  // ASK QUESTION
  const handleAsk = async () => {

    if (
      !question ||
      !user?.id
    ) return;

    const userMessage: Message = {

      role: "user",

      content: question,

    };

    setMessages((prev) => [

      ...prev,

      userMessage,

    ]);

    setLoading(true);

    try {

      const data =
        await askQuestion(

          question,

          currentChatId || undefined,

          user.id

        );

      if (data.error) {

        alert(data.error);

        return;
      }

      // NEW CHAT
      if (!currentChatId) {

        setCurrentChatId(
          data.chat_id
        );

        const newChat: Chat = {

          id: data.chat_id,

          title:
            question.slice(0, 30),

        };

        setHistory((prev) => [

          newChat,

          ...prev,

        ]);
      }

      const aiMessage: Message = {

        role: "assistant",

        content: data.answer,

      };

      setMessages((prev) => [

        ...prev,

        aiMessage,

      ]);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

    setQuestion("");
  };


  if (!mounted) {

    return null;

  }


  return (

    <div className="flex h-screen bg-black text-white">

      {/* SIDEBAR */}
      <div className="w-72 border-r border-zinc-800 p-4 flex flex-col">

        {/* LOGO */}
        <div className="mb-6">

          <h1 className="text-2xl font-bold">

            NeuralRAG

          </h1>

          <p className="text-zinc-400 text-sm">

            AI Workspace

          </p>

        </div>


        {/* NEW CHAT */}
        <button
          onClick={() => {

            setMessages([]);

            setCurrentChatId(null);

          }}
          className="bg-blue-600 hover:bg-blue-700 transition p-3 rounded-xl mb-3"
        >

          + New Chat

        </button>


        {/* PRO */}
        <button
          onClick={handlePayment}
          className="bg-yellow-600 hover:bg-yellow-700 transition p-3 rounded-xl mb-5"
        >

          {user?.is_pro
            ? "Pro Activated"
            : "Upgrade to Pro"}

        </button>


        {/* HISTORY */}
        <div className="text-zinc-400 text-sm font-semibold mb-3">

          Chat History

        </div>

        <div className="flex-1 overflow-y-auto space-y-3">

          {history.length === 0 && (

            <p className="text-zinc-500 text-sm">

              No chats yet

            </p>

          )}

          {history.map((chat) => (

            <div
              key={chat.id}
              onClick={() =>
                loadChat(chat.id)
              }
              className={`p-3 rounded-xl cursor-pointer transition ${
                currentChatId === chat.id
                  ? "bg-blue-700"
                  : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >

              <p className="truncate">

                {chat.title}

              </p>

            </div>

          ))}

        </div>


        {/* PROFILE */}
        <div className="border-t border-zinc-800 pt-4 mt-4">

          <div className="flex items-center justify-between bg-zinc-900 p-3 rounded-xl">

            <div>

              <p className="font-semibold">

                {user?.username}

              </p>

              <p className="text-xs text-zinc-400">

                {user?.is_pro
                  ? "Pro User"
                  : "Free User"}

              </p>

            </div>

            <button
              onClick={() => {

                localStorage.removeItem(
                  "token"
                );

                localStorage.removeItem(
                  "user"
                );

                window.location.href =
                  "/login";

              }}
              className="text-xs bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition"
            >

              Logout

            </button>

          </div>

        </div>

      </div>


      {/* MAIN */}
      <div className="flex-1 flex flex-col p-6">

        {/* HEADER */}
        <div className="mb-6">

          <h1 className="text-3xl font-bold">

            Chat

          </h1>

        </div>


        {/* CHAT */}
        <div className="flex-1 overflow-y-auto border border-zinc-800 rounded-xl p-4 space-y-4">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`p-4 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-blue-600 ml-auto"
                  : msg.role === "assistant"
                  ? "bg-zinc-800"
                  : "bg-green-700"
              }`}
            >

              {msg.content}

            </div>

          ))}

          {loading && (

            <div className="bg-zinc-800 p-4 rounded-xl w-fit">

              Thinking...

            </div>

          )}

          <div ref={messagesEndRef} />

        </div>


        {/* UPLOAD */}
        <div className="mt-4 flex gap-3">

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] || null
              )
            }
            className="bg-zinc-900 p-3 rounded-xl"
          />

          <button
            onClick={handleUpload}
            className="bg-green-600 hover:bg-green-700 transition px-5 rounded-xl"
          >

            Upload

          </button>

        </div>


        {/* ASK */}
        <div className="mt-3 flex gap-3">

          <input
            type="text"
            placeholder="Ask question..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            className="flex-1 bg-zinc-900 p-4 rounded-xl outline-none"
          />

          <button
            onClick={handleAsk}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 rounded-xl"
          >

            Send

          </button>

        </div>

      </div>

    </div>
  );
}