"use client";
import { useState } from "react";
import {
  HiOutlineMenuAlt3,
  HiOutlineSearch,
  HiOutlineBell,
} from "react-icons/hi";
export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
      {/* TOP HEADER */}
      <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-[#111827] border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <HiOutlineMenuAlt3 size={24} />
          </button>
          <h1 className="text-xl font-semibold text-white">
            Dashboard Overview
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-[#1F2937] rounded-lg px-3 py-1.5 border border-gray-700 focus-within:border-yellow-500 transition-colors">
            <HiOutlineSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-white px-2 w-48"
            />
          </div>
          {/* Notification */}
          <button className="relative text-gray-400 hover:text-white">
            <HiOutlineBell size={22} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {/* Admin Profile */}
          <div className="flex items-center gap-2 border-l border-gray-700 pl-4">
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">
              A
            </div>
            <span className="hidden md:block text-sm font-medium text-white">
              Admin
            </span>
          </div>
        </div>
      </header>
    </div>
  );
}
