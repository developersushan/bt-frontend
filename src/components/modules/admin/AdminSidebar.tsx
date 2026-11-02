"use client";

import { handleLogout } from "@/helpers/handleLogout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
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
  HiPhotograph,
} from "react-icons/hi";

// ───────────── Types ─────────────
interface ChildItem {
  name: string;
  slug: string;
  icon: ReactNode;
}

// Slug সহ সরাসরি link
interface LinkItem {
  name: string;
  slug: string;
  icon: ReactNode;
  children?: never;
}

// Children সহ dropdown parent (slug নেই)
interface GroupItem {
  name: string;
  icon: ReactNode;
  children: ChildItem[];
  slug?: never;
}

type MenuItem = LinkItem | GroupItem;

type OpenMenus = Record<string, boolean>;

// ───────────── Menu data (component এর বাইরে, তাই প্রতি render এ নতুন তৈরি হয় না) ─────────────
const MENU_ITEMS: MenuItem[] = [
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
    icon: <HiOutlineCog />,
    children: [
      {
        name: "BannerCarousel",
        slug: "/admin/settings/banner-page",
        icon: <HiPhotograph />,
      },
    ],
  },
];

// ───────────── Helpers ─────────────
const matchesPath = (pathname: string, slug: string): boolean =>
  pathname === slug || pathname.startsWith(slug + "/");

const isGroup = (item: MenuItem): item is GroupItem =>
  Array.isArray(item.children);

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [openMenus, setOpenMenus] = useState<OpenMenus>({});

  // URL পরিবর্তনে active child থাকলে parent auto-open
  useEffect(() => {
    const newOpen: OpenMenus = {};

    MENU_ITEMS.forEach((item) => {
      if (isGroup(item)) {
        const hasActiveChild = item.children.some((child) =>
          matchesPath(pathname, child.slug),
        );
        if (hasActiveChild) newOpen[item.name] = true;
      }
    });

    setOpenMenus((prev) => ({ ...prev, ...newOpen }));
  }, [pathname]);

  const toggleMenu = (name: string): void => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isParentActive = (item: MenuItem): boolean =>
    isGroup(item)
      ? item.children.some((child) => matchesPath(pathname, child.slug))
      : pathname === item.slug;

  const parentClass = (active: boolean): string =>
    active
      ? "bg-[#1F2937] text-white border-l-4 border-yellow-500"
      : "text-gray-300 hover:bg-[#1F2937] hover:text-white";

  return (
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
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white"
          aria-label="Close sidebar"
        >
          <HiX size={24} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
        {MENU_ITEMS.map((item) => {
          const active = isParentActive(item);
          const baseClass =
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";

          if (isGroup(item)) {
            const isOpen = !!openMenus[item.name];

            return (
              <div key={item.name}>
                <button
                  type="button"
                  onClick={() => toggleMenu(item.name)}
                  aria-expanded={isOpen}
                  className={`${baseClass} w-full ${parentClass(active)}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium text-sm flex-1 text-left">
                    {item.name}
                  </span>
                  <HiChevronDown
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                </button>

                {isOpen && (
                  <div className="mt-1 ml-4 pl-4 border-l border-gray-700 space-y-1">
                    {item.children.map((child) => {
                      const childActive = pathname === child.slug;

                      return (
                        <Link
                          key={child.slug}
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
          }

          return (
            <Link
              key={item.slug}
              href={item.slug}
              className={`${baseClass} ${parentClass(active)}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          type="button"
          onClick={() => handleLogout()}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <HiOutlineLogout className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
