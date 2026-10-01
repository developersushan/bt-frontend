"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AuthButtons from "./AuthButtons";
import { useRouter } from "next/navigation";

interface CategoryItem {
  id: number;
  name: string;
  icon: React.ReactNode;
}

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isXlDevice, setIsXlDevice] = useState(false);

  // Check screen size for XL breakpoint (1280px)
  useEffect(() => {
    const checkScreenSize = () => {
      const isXl = window.innerWidth >= 1280;
      setIsXlDevice(isXl);
      setIsMenuOpen(isXl);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="relative">
      <header className="fixed top-0 z-50 w-full bg-[#00352F] border-b border-white/10 shadow-lg backdrop-blur-md">
        <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left Side: Menu Icon & Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
              className="text-white hover:bg-white/10 cursor-pointer"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>

            <Link
              href="/"
              className="text-xl sm:text-2xl font-black tracking-wide flex items-center"
            >
              <span className="text-red-500">Lo</span>
              <span className="text-white ml-1">go</span>
            </Link>
          </div>

          {/* Right Side: Auth Buttons */}
          <AuthButtons />
        </div>
      </header>

      {/* XL Screen: Custom Fixed Sidebar (Outside Click ) */}
      {isXlDevice ? (
        isMenuOpen && (
          <aside className="fixed top-16 left-0 z-40 w-60 h-[calc(100vh-64px)] bg-[#00352F] border-r border-white/10 shadow-2xl">
            <DropdownMenu
              categories={fakeCategories}
              setIsMenuOpen={setIsMenuOpen}
            />
          </aside>
        )
      ) : (
        /* Below XL Screen: Shadcn Sheet Sidebar (Outside Click ) */
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetContent
            side="left"
            className="w-60! p-0 top-16 h-[calc(100vh-64px)] bg-[#00352F] border-r border-white/10 text-white shadow-2xl [&>button]:hidden"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <DropdownMenu
              categories={fakeCategories}
              setIsMenuOpen={setIsMenuOpen}
            />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

const DropdownMenu = ({
  categories,
  setIsMenuOpen,
}: {
  categories: CategoryItem[];
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  return (
    <ScrollArea className="h-full w-full ">
      <div className="p-3 grid grid-cols-2 gap-2">
        {categories.map((item: CategoryItem, index) => {
          const isXl = window.innerWidth >= 1280;
          const className =
            "flex flex-col items-center justify-center h-22 p-2 rounded-lg bg-[#003840] hover:bg-[#004d58] border border-teal-500/30 hover:border-teal-400 transition-all text-center group cursor-pointer";

          const content = (
            <>
              <span className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-wide text-gray-200 group-hover:text-teal-foreground transition-colors leading-tight">
                {item.name}
              </span>
            </>
          );

          if (isXl) {
            return (
              <Link key={index} href={"#"} className={className}>
                {content}
              </Link>
            );
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => (router.push("/"), setIsMenuOpen(false))}
            >
              {content}
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
};
// const DropdownMenu = ({ categories }: { categories: CategoryItem[] }) => {
//   const router = useRouter();
//   return (
//     <ScrollArea className="h-full w-full ">
//       <div className="p-3 grid grid-cols-2 gap-2">
//         {categories.map((item: CategoryItem) => (
//           <Link
//             key={item.id}
//             href="#"
//             className="flex flex-col items-center justify-center h-22 p-2 rounded-lg bg-[#003840] hover:bg-[#004d58] border border-teal-500/30 hover:border-teal-400 transition-all text-center group cursor-pointer"
//           >
//             <span className="text-2xl mb-1.5 group-hover:scale-110 transition-transform">
//               {item.icon}
//             </span>
//             <span className="text-[10px] sm:text-xs font-bold tracking-wide text-gray-200 group-hover:text-teal-foreground transition-colors leading-tight">
//               {item.name}
//             </span>
//           </Link>
//         ))}
//       </div>
//     </ScrollArea>
//   );
// };
