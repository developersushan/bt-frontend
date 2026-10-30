"use client";

import { handleLogout } from "@/helpers/handleLogout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  HiOutlineTicket,
  HiX,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineCreditCard,
  HiOutlineCog,
  HiOutlineLogout,
  HiChevronDown,
  HiOutlineUserAdd,
  HiOutlineShieldCheck,
  HiOutlineUsers,
} from "react-icons/hi";
import type { ReactNode } from "react";

// ───────────── Types ─────────────
interface ChildItem {
  name: string;
  slug: string;
  icon: ReactNode;
}

interface MenuItem {
  name: string;
  slug?: string; // parent with children হলে slug নেই
  icon: ReactNode;
  children?: ChildItem[];
}

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  // Sidebar menu items
  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      slug: "/admin",
      icon: <HiOutlineHome />,
    },
    {
      name: "User Management",
      icon: <HiOutlineUserGroup />,
      children: [
        {
          name: "All Users",
          slug: "/admin/user-management",
          icon: <HiOutlineUsers />,
        },
        {
          name: "Add User",
          slug: "/admin/user-management/create",
          icon: <HiOutlineUserAdd />,
        },
        {
          name: "User Roles",
          slug: "/admin/user-management/roles",
          icon: <HiOutlineShieldCheck />,
        },
      ],
    },
    {
      name: "Bet History",
      slug: "/admin/bet-history",
      icon: <HiOutlineTicket />,
    },
    {
      name: "Transactions",
      slug: "/admin/transactions",
      icon: <HiOutlineCreditCard />,
    },
    {
      name: "Settings",
      slug: "/admin/settings",
      icon: <HiOutlineCog />,
    },
  ];

  // URL পরিবর্তনে parent auto-open
  useEffect(() => {
    const newOpen: Record<string, boolean> = {};

    menuItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) =>
            pathname === child.slug || pathname.startsWith(child.slug + "/"),
        );
        if (hasActiveChild) newOpen[item.name] = true;
      }
    });

    setOpenMenus((prev) => ({ ...prev, ...newOpen }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const toggleMenu = (name: string): void => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (slug: string): boolean => pathname === slug;

  const isParentActive = (item: MenuItem): boolean => {
    if (item.slug) return pathname === item.slug;
    if (item.children) {
      return item.children.some(
        (child) =>
          pathname === child.slug || pathname.startsWith(child.slug + "/"),
      );
    }
    return false;
  };

  return (
    <div>
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 w-64 h-full
          bg-[#111827] border-r border-gray-800 
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
        `}
      >
        {/* Logo */}
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

        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => {
            const active = isParentActive(item);
            const hasChildren = !!item.children;
            const isOpen = openMenus[item.name];

            return (
              <div key={index}>
                {hasChildren ? (
                  // Parent with dropdown
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full
                      ${
                        active
                          ? "bg-[#1F2937] text-white border-l-4 border-yellow-500"
                          : "text-gray-300 hover:bg-[#1F2937] hover:text-white"
                      }
                    `}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-sm flex-1 text-left">
                      {item.name}
                    </span>
                    <HiChevronDown
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      size={16}
                    />
                  </button>
                ) : (
                  // Single link
                  <Link
                    href={item.slug}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${
                        active
                          ? "bg-[#1F2937] text-white border-l-4 border-yellow-500"
                          : "text-gray-300 hover:bg-[#1F2937] hover:text-white"
                      }
                    `}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </Link>
                )}

                {/* Children */}
                {hasChildren && isOpen && (
                  <div className="mt-1 ml-4 pl-4 border-l border-gray-700 space-y-1">
                    {item.children.map((child, cIndex) => {
                      const childActive = isActive(child.slug);

                      return (
                        <Link
                          key={cIndex}
                          href={child.slug}
                          className={`
                            flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors
                            ${
                              childActive
                                ? "bg-yellow-500/10 text-yellow-400 font-semibold"
                                : "text-gray-400 hover:bg-[#1F2937] hover:text-white"
                            }
                          `}
                        >
                          <span className="text-base">{child.icon}</span>
                          <span>{child.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => handleLogout()}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <HiOutlineLogout className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;
