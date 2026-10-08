"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HiOutlineTicket,
  HiX,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineCreditCard,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // sidebar menu items
  const menuItems = [
    {
      name: "Dashboard",
      slug: "/admin",
      icon: <HiOutlineHome />,
      active: true,
    },
    {
      name: "User Management",
      slug: "/admin/user-management",
      icon: <HiOutlineUserGroup />,
      active: false,
    },
    {
      name: "Bet History",
      slug: "/admin/bet-history",
      icon: <HiOutlineTicket />,
      active: false,
    },
    {
      name: "Transactions",
      slug: "/admin/transactions",
      icon: <HiOutlineCreditCard />,
      active: false,
    },
    {
      name: "Settings",
      slug: "/admin/settings",
      icon: <HiOutlineCog />,
      active: false,
    },
  ];

  return (
    <div className="">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
  fixed lg:sticky top-0 left-0 z-50 w-64 h-full
  bg-[#111827] border-r border-gray-800 
  transform transition-transform duration-300 ease-in-out
  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <div className="flex items-center gap-2 text-xl font-extrabold tracking-wide">
            <span className="text-[#D17B51]">CK44</span>
            <span className="text-white">|</span>
            <span className="text-white">Admin</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <HiX size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.slug}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.active ? "bg-[#1F2937] text-white border-l-4 border-yellow-500" : "hover:bg-[#1F2937] hover:text-white"}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-400/10 transition-colors">
            <HiOutlineLogout className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;
