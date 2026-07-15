import { create } from "zustand";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface ChatState {
  messages: Message[];
  input: string;

  setInput: (value: string) => void;
  sendMessage: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],

  input: "",

  setInput: (value) => set({ input: value }),

  sendMessage: () => {
    const input = get().input;

    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    const aiMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content:
        "This is a demo AI response. Tomorrow we connect FastAPI + RAG.",
    };

    set((state) => ({
      messages: [...state.messages, newMessage, aiMessage],
      input: "",
    }));
  },
}));