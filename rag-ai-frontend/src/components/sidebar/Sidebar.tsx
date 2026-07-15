"use client";

import {
  MessageSquare,
  Archive,
  Settings,
  CreditCard,
  Plus,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#111827]/80 backdrop-blur-xl border-r border-white/10 flex flex-col">
      
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-lg">
          AI
        </div>

        <span className="ml-3 text-xl font-semibold">
          NeuralRAG
        </span>
      </div>

      {/* New Chat */}
      <div className="p-4">
        <button className="w-full flex items-center gap-2 bg-violet-600 hover:bg-violet-700 transition rounded-xl px-4 py-3 font-medium">
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2">

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition">
          <MessageSquare size={18} />
          Chats
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition">
          <Archive size={18} />
          Archived
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition">
          <CreditCard size={18} />
          Billing
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition">
          <Settings size={18} />
          Settings
        </button>

      </nav>

      {/* Bottom User */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600" />

          <div>
            <p className="font-medium">Kumar</p>
            <p className="text-sm text-gray-400">
              Pro Plan
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}