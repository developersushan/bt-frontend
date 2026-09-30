import React from "react";
import { cn } from "@/lib/utils";

function MainHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="main-header"
      className={cn(
        "flex items-center justify-between gap-2 py-3 px-1 select-none w-full",
        className,
      )}
      {...props}
    />
  );
}

function TitleHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="title-header"
      className={cn(
        "text-teal-foreground font-black text-lg sm:text-xl tracking-wider uppercase leading-none",
        className,
      )}
      {...props}
    />
  );
}

export { MainHeader, TitleHeader };
