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
        <div className="relative group flex items-center md:gap-2.5 gap-1 md:px-3.5 px-2.5 h-10 rounded-full bg-[#03201d] border border-teal-500/40 shadow-[0_0_15px_rgba(0,128,128,0.25)] hover:border-teal-400 transition-all">
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
      onClick={onClick}
      className="
    flex h-9 w-full items-center justify-center gap-1.5
    rounded-md
    bg-[#017e77]
    px-4
    text-xs font-bold uppercase tracking-wide text-white
    transition-colors duration-200
    hover:bg-[#e9b50a]
    active:bg-[#046e66]
    sm:text-sm
    md:h-10
  "
    >
      <span className="flex size-5 items-center justify-center rounded bg-white/15">
        {icon}
      </span>

      <span>{children}</span>
    </button>
  );
}

//  <button
//   type="button"
//   onClick={onClick}
//   className="
//     flex h-9 w-full items-center justify-center gap-1.5
//     rounded-md border border-[#f6d365]/50
//     bg-linear-to-r from-[#f59e0b] via-[#facc15] to-[#eab308]
//     px-4 text-xs font-bold uppercase tracking-wide text-[#241500]
//     shadow-md shadow-yellow-500/20
//     transition-all duration-200
//     hover:-translate-y-0.5 hover:brightness-110
//     active:translate-y-0
//     sm:text-sm md:h-10
//   "
// >
//   <span className="flex size-5 items-center justify-center rounded bg-black/10">
//     {icon}
//   </span>

//   <span>{children}</span>
// </button>
{
  /* <button
  type="button"
  onClick={onClick}
  className="
    flex h-9 w-full items-center justify-center gap-1.5
    rounded-md
    bg-linear-to-r from-[#7c3aed] to-[#a855f7]
    px-4
    text-xs font-bold uppercase tracking-wide text-white
    shadow-md shadow-purple-500/25
    transition-all duration-200
    hover:brightness-110
    active:scale-[0.98]
    sm:text-sm md:h-10
  "
>
  <span className="flex size-5 items-center justify-center rounded bg-white/15">
    {icon}
  </span>

  <span>{children}</span>
</button> */
}

//  <button
//   type="button"
//   onClick={onClick}
//   className="
//     flex h-9 w-full items-center justify-center gap-1.5
//     rounded-md border border-[#f6d365]/50
//     bg-linear-to-r from-[#f59e0b] via-[#facc15] to-[#eab308]
//     px-4 text-xs font-bold uppercase tracking-wide text-[#241500]
//     shadow-md shadow-yellow-500/20
//     transition-all duration-200
//     hover:-translate-y-0.5 hover:brightness-110
//     active:translate-y-0
//     sm:text-sm md:h-10
//   "
// >
//   <span className="flex size-5 items-center justify-center rounded bg-black/10">
//     {icon}
//   </span>

//   <span>{children}</span>
// </button>
