"use client";

import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 border-b border-white/10 bg-[#111827]/70 backdrop-blur-xl flex items-center justify-between px-6">
      
      {/* Search */}
      <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-[350px]">
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search chats..."
          className="bg-transparent outline-none border-none ml-3 w-full text-sm text-white"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        <button className="bg-violet-600 hover:bg-violet-700 transition px-5 py-2 rounded-xl font-medium">
          Upgrade Pro
        </button>

        <button className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition">
          <Bell size={18} />
        </button>

        <div className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600" />
      </div>
    </header>
  );
}