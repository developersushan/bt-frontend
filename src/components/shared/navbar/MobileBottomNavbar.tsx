"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Percent, Users, Gift, User } from "lucide-react";

export const BottomNavbar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Promotion", href: "/promotion", icon: Percent },
    { label: "Invite", href: "/invite", icon: Users, isSpecial: true },
    { label: "Reward", href: "/reward", icon: Gift },
    { label: "Member", href: "/member", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#041c1a] border-t border-[#0a2e2b] md:hidden shadow-2xl">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.isSpecial) {
            return (
              <Link
                key={index}
                href={item.href}
                className="flex flex-col items-center -top-3 relative group"
              >
                <div className="size-12 bg-linear-to-tr from-emerald-500 to-green-400 text-black rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40 border-2 border-[#041c1a] transform active:scale-95 transition-transform">
                  <Icon className="size-6" />
                </div>
                <span className="text-[10px] font-medium text-emerald-400 mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive
                  ? "text-yellow-400"
                  : "text-emerald-300/60 hover:text-emerald-100"
              }`}
            >
              <Icon className={`size-5 ${isActive && "scale-110"}`} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavbar;
