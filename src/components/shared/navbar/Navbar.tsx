"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AuthButtons from "./AuthButtons";

interface CategoryItem {
  id: number;
  name: string;
  icon: React.ReactNode;
}

// Fake Data for API integration later
const fakeCategories: CategoryItem[] = [
  { id: 1, name: "HOT GAMES", icon: "🔥" },
  { id: 2, name: "INVITE FRIENDS", icon: "👨‍👩‍👧‍👦" },
  { id: 3, name: "FAVORITES", icon: "⭐" },
  { id: 4, name: "PROMOTION", icon: "🎁" },
  { id: 5, name: "SLOTS", icon: "🎰" },
  { id: 6, name: "REWARD CENTER", icon: "🏅" },
  { id: 7, name: "LIVE", icon: "🎲" },
  { id: 8, name: "MANUAL REBATE", icon: "🪙" },
  { id: 9, name: "POKER", icon: "🃏" },
  { id: 10, name: "VIP", icon: "👑" },
  { id: 11, name: "FISH", icon: "🐟" },
  { id: 12, name: "MISSION", icon: "🎯" },
  { id: 13, name: "SPORTS", icon: "⚽" },
  { id: 14, name: "ENGLISH", icon: "🌐" },
  { id: 15, name: "E-SPORTS", icon: "🎮" },
  { id: 16, name: "APP DOWNLOAD", icon: "📲" },
  { id: 17, name: "LOTTERY", icon: "🎟️" },
  { id: 18, name: "CUSTOMER SERVICE", icon: "🎧" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="relative">
      <header className="fixed top-0 z-50 w-full bg-[#00352F] border-b border-white/10 shadow-lg backdrop-blur-md">
        <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left Side: Menu Icon & Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none transition-colors cursor-pointer"
            >
              {isMenuOpen ? (
                <X width={20} height={20} />
              ) : (
                <Menu width={20} height={20} />
              )}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="text-xl sm:text-2xl font-black tracking-wide flex items-center"
            >
              <span className="text-red-500">CK44</span>
              <span className="text-white ml-1">wintk</span>
            </Link>
          </div>

          {/* Right Side: Auth Buttons */}
          <AuthButtons />
        </div>
      </header>

      {/* Sidebar Dropdown Menu */}
      {isMenuOpen && (
        <div className="fixed top-16 left-0 z-40 w-60 h-[calc(100vh-64px)] bg-primary-cyan border-r border-white/10 shadow-2xl overflow-y-auto">
          <DropdownMenu categories={fakeCategories} />
        </div>
      )}
    </div>
  );
}

const DropdownMenu = ({ categories }: { categories: CategoryItem[] }) => {
  return (
    <ScrollArea className="h-full w-full">
      <div className="p-3 grid grid-cols-2 gap-2">
        {categories.map((item: CategoryItem) => (
          <Link
            key={item.id}
            href="#"
            className="flex flex-col items-center justify-center h-22 p-2 rounded-lg bg-[#003840] hover:bg-[#004d58] border border-teal-foreground/30 hover:hover:border-teal-foreground transition-all text-center group cursor-pointer"
          >
            {/* Icon / Image Placeholder */}
            <span className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">
              {item.icon}
            </span>

            {/* Menu Name */}
            <span className="text-[10px] sm:text-xs font-bold tracking-wide text-gray-200 group-hover:text-[#00ffaa] transition-colors leading-tight">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </ScrollArea>
  );
};
