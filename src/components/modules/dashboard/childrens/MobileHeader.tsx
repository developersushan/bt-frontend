"use client";

import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";

interface Props {
  title: string;
  rightContent?: ReactNode;
  isContent?: boolean;
  className?: string;
}

const MobileHeader = ({
  title,
  rightContent,
  isContent = false,
  className,
}: Props) => {
  return (
    <header className="block bg-primary-cyan px-5 py-3 text-amber-400 md:hidden">
      <div
        className={`${className} grid grid-cols-[1fr_auto_1fr] items-center`}
      >
        <DialogClose className="justify-self-start">
          <button type="button" aria-label="Close">
            <ChevronLeft className="size-6" />
          </button>
        </DialogClose>

        <h1 className="text-center text-lg font-bold">{title}</h1>

        <div className="justify-self-end">
          {isContent ? rightContent : null}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
