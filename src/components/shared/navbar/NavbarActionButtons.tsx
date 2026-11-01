"use client";
import { useProfileStore } from "@/lib/useModalStore";
import { ArrowUpRight, PlusCircle, RefreshCw, Wallet } from "lucide-react";
import { useState } from "react";

interface NavbarActionsProps {
  className?: string;
  buttonClassName?: string;
  balance?: number | string;
  onRefreshBalance?: () => void;
}

export const NavbarActionButtons = ({
  balance = "0",
  onRefreshBalance,
  className,
  buttonClassName,
}: NavbarActionsProps) => {
  const [isRotating, setIsRotating] = useState(false);
  const { setActiveTab, setProfileModalOpen } = useProfileStore();

  const openProfileTab = (tabId: string) => {
    setActiveTab(tabId);
    setProfileModalOpen(true);
  };

  const handleRefresh = () => {
    setIsRotating(true);
    if (onRefreshBalance) onRefreshBalance();
    setTimeout(() => setIsRotating(false), 800);
  };

  return (
    <div className="flex items-center gap-3 ">
      {/* ১. Wallet & Balance Box */}
      <div className={className}>
        <div className="relative group flex items-center md:gap-2.5 gap-1 md:px-3.5 px-2.5 h-10 rounded-md bg-[#03201d] border border-teal-500/40 shadow-[0_0_15px_rgba(0,128,128,0.25)] hover:border-teal-400 transition-all">
          <div className="md:block hidden">
            <div className="flex items-center justify-center size-6 rounded-lg bg-teal-500/15 text-teal-300 border border-teal-500/30">
              <Wallet className="size-3.5" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[8px] uppercase tracking-wider text-teal-400 font-semibold leading-none md:block hidden">
              Balance
            </span>
            <span className="font-extrabold tracking-wide text-xs sm:text-sm text-white leading-tight">
              ৳ {balance}
            </span>
          </div>
          <button
            onClick={handleRefresh}
            type="button"
            className="ml-1 text-teal-400 hover:text-white transition-colors cursor-pointer p-1 rounded-md hover:bg-teal-500/20"
            title="Refresh Balance"
          >
            <RefreshCw
              className={`size-3 ${isRotating ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* ২. Deposit Button (High Contrast #FFCB00 with Rich Glow) */}
      <div className={`${buttonClassName} sm:w-auto w-full`}>
        <div className="flex items-center gap-3">
          <DyncmicButton
            onClick={() => openProfileTab("deposit")}
            icon={<PlusCircle className="size-3.5 stroke-[2.5]" />}
          >
            Deposit
          </DyncmicButton>

          {/* ৩. Withdrawal Button (High Contrast #FFCB00 with Rich Glow) */}
          <DyncmicButton
            onClick={() => openProfileTab("withdrawal")}
            icon={<ArrowUpRight className="size-3.5 stroke-[2.5]" />}
          >
            Withdrawal
          </DyncmicButton>
        </div>
      </div>
    </div>
  );
};

function DyncmicButton({
  onClick,
  children,
  icon,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="group relative flex sm:w-full w-full justify-center items-center gap-1.5 px-4 md:h-10 h-9  rounded-md font-bold text-black bg-linear-to-b from-[#ffe033] via-[#FFCB00] to-[#d4aa00] border-t border-yellow-200 border-b-4  shadow-[0_4px_15px_rgba(255,203,0,0.4)] hover:shadow-[0_6px_20px_rgba(255,203,0,0.7)] hover:-translate-y-0.5 active:translate-y-0.5 active:border-b-2 transition-all duration-150 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-linear-to-r from-transparent via-white/50 to-transparent transition-transform" />

      <span className="flex items-center justify-center size-5 rounded-md bg-black/10 text-black">
        {icon}
      </span>
      <span className="tracking-wide text-xs sm:text-sm md:font-black font-bold uppercase drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
        {children}
      </span>
    </button>
  );
}
