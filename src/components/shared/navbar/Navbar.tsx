/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthButtons from "./AuthButtons";
import {
  NavigationMenuDemo,
  ProfileModal,
} from "../../modules/dashboard/ProfileMain";
import LoadingState from "../Loading";
import { useGames } from "@/lib/useGames";
import { IGame } from "@/types/game.types";
import { NavbarActionButtons } from "./NavbarActionButtons";
import { CATEGORY_ICONS, navItems } from "./navData";
import { useModalStore, useProfileStore } from "@/lib/useModalStore";
import Image from "next/image";

export default function Navbar({ userData }: any) {
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

  const { isLoading, gamesByGroup, formatCategoryTitle } = useGames();

  if (isLoading) {
    return <LoadingState message="Games loading..." />;
  }

  return (
    <div className="relative">
      <ProfileModal />
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
          {userData?.user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <NavigationMenuDemo userData={userData} />
              <NavbarActionButtons buttonClassName="md:block hidden" />
            </div>
          ) : (
            <AuthButtons />
          )}
        </div>
      </header>

      {/* XL Screen: Custom Fixed Sidebar (Outside Click ) */}
      {isXlDevice ? (
        isMenuOpen && (
          <aside className="fixed top-16 left-0 z-40 w-60 h-[calc(100vh-64px)] bg-[#00352F] border-r border-white/10 shadow-2xl">
            <DropdownMenu
              categories={Object.entries(gamesByGroup)
                .filter(([, games]) => (games as IGame[]).length > 0)
                .map(([categoryKey]) => ({
                  categoryKey,
                  categoryTitle: formatCategoryTitle(categoryKey),
                }))}
              userData={userData}
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
              categories={Object.entries(gamesByGroup)
                .filter(([, games]) => (games as IGame[]).length > 0)
                .map(([categoryKey]) => ({
                  categoryKey,
                  categoryTitle: formatCategoryTitle(categoryKey),
                }))}
              userData={userData}
            />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

const DropdownMenu = ({
  categories,
  userData,
}: {
  categories: { categoryKey: string; categoryTitle: string }[];
  userData: any;
}) => {
  const router = useRouter();
  const { openProfileTab } = useProfileStore();
  const { setActiveModal } = useModalStore();

  return (
    <ScrollArea className="h-full w-full">
      <div className="grid grid-cols-2 gap-2 p-3">
        <div className="flex flex-col gap-2">
          {categories.map(({ categoryKey, categoryTitle }) => (
            <button
              key={categoryKey}
              type="button"
              onClick={() => {
                router.push(`/${encodeURIComponent(categoryKey)}`);
              }}
              className="flex flex-col items-center justify-center h-22 p-2 rounded-lg bg-[#003840] hover:bg-[#004d58] border border-teal-500/30 hover:border-teal-400 "
            >
              <span
                className="text-2xl mb-1.5 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                {CATEGORY_ICONS[
                  categoryKey.toLowerCase().replace(/[-\s]+/g, "_")
                ] ?? "🎮"}
              </span>
              <span className=" text-[10px] sm:text-xs font-bold tracking-wide text-gray-200 group-hover:text-teal-foreground transition-colors leading-tight">
                {categoryTitle.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
        {/* <div className="flex flex-col gap-2">
          {categories.map(({ categoryKey, categoryTitle }) => {
            const normalizedKey = categoryKey
              .toLowerCase()
              .replace(/[-\s]+/g, "_");

            const image = CATEGORY_IMAGES[normalizedKey]?.image;
            console.log({
              categoryKey,
              image: CATEGORY_IMAGES[normalizedKey]?.image,
            });
            return (
              <button
                key={categoryKey}
                type="button"
                onClick={() =>
                  router.push(`/${encodeURIComponent(categoryKey)}`)
                }
                className="flex flex-col gap-1 items-center justify-center h-22 p-2 rounded-lg bg-[#003840] hover:bg-[#004d58] border border-teal-500/30 hover:border-teal-400"
              >
                {image && (
              <svg width="40px" height="40px" viewBox="0 0 73 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>fundamentals/css/specificity</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="fundamentals/css/specificity" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect id="mask" stroke="#9B1011" stroke-width="2" fill="#FFFFFF" fill-rule="nonzero" x="1" y="1" width="71" height="71" rx="14"> </rect> <g id="Group-2" transform="translate(15.000000, 13.000000)" fill-rule="nonzero"> <g id="Group" transform="translate(0.000000, 2.000000)" stroke="#FF9882"> <circle id="Oval-2" fill="#FF9882" cx="22" cy="22" r="4"> </circle> <circle id="Oval-2" stroke-width="6" cx="22" cy="22" r="12"> </circle> <circle id="Oval-2" stroke-width="6" cx="22" cy="22" r="22"> </circle> </g> <g id="target" transform="translate(20.000000, 0.000000)"> <path d="M26.9575195,25.4825897 C26.7476355,28.9460224 25.9440822,31.8525722 24.4520566,35.0184096 L20.9139662,34.1019573 L19.8646466,30.533563 L1.50160327,25.6008682 C0.557225645,25.3909449 0.0325156178,24.4463906 0.347341634,23.5018363 C0.557225645,22.557282 1.50160327,22.0324738 2.4459809,22.3473588 L20.7040822,27.2800535 L23.4322731,24.6563139 L26.9575195,25.4825897 Z" id="Shape" fill="#334A5E" opacity="0.2"> </path> <path d="M17.2160909,8.78381918 C16.5740989,8.14182772 15.3970284,8.14182772 14.754934,8.78381918 L0.737307905,22.8015374 C0.0953159696,23.4435289 0.0953159696,24.6205986 0.737307905,25.2626924 C1.37929984,25.9046839 2.5563704,25.9046839 3.19846474,25.2626924 L17.2161933,11.2449742 C17.8581852,10.6029827 17.8581852,9.42591305 17.2160909,8.78381918 Z" id="Shape" fill="#40596B"> </path> <polygon id="Path-2" fill="#42C3FF" points="14.0695287 11.7809704 19.5878851 13.0488605 25.5863921 7.34524349 19.8279604 5.9577577 18.6999199 0 13 6.22435623"> </polygon> </g> </g> </g> </g></svg>
                )}

                <span className="text-center text-[10px] font-bold leading-tight tracking-wide text-gray-200 transition-colors group-hover:text-teal-300 sm:text-xs">
                  {String(categoryTitle).toUpperCase()}
                </span>
              </button>
            );
          })}
        </div> */}
        <div className="flex flex-col gap-2">
          {navItems.map(({ label, href, image }) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                const normalizedLabel = label.toLowerCase();

                const profileTabs: Record<string, string> = {
                  reward: "reward-center",
                  mission: "reward-center",
                  "invite friends": "invite-friends",
                };

                const tab = profileTabs[normalizedLabel];

                if (tab) {
                  if (userData?.user) {
                    openProfileTab(tab);
                  } else {
                    setActiveModal("login");
                  }
                  return;
                }

                if (href) {
                  router.push(href);
                }
              }}
              className="flex flex-col items-center justify-center h-22 p-2 rounded-lg bg-[#003840] hover:bg-[#004d58] border border-teal-500/30 hover:border-teal-400"
            >
              <Image
                src={image}
                alt={String(image)}
                width={40}
                height={40}
                unoptimized
                className="mb-1.5 size-10 object-contain transition-transform group-hover:scale-110"
              />
              
              <span className="text-[10px] sm:text-xs font-bold tracking-wide text-gray-200 group-hover:text-teal-foreground transition-colors leading-tight">
                {label.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};
