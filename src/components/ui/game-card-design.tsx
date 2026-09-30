"use client";

import React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* 1. GAME CARD CONTAINER (Visual Shell)                                      */
/* -------------------------------------------------------------------------- */

export interface GameCardContainerProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export function GameCardContainer({
  className,
  children,
  ...props
}: GameCardContainerProps) {
  return (
    <div
      data-slot="game-card"
      className={cn(
        "group/game-card relative overflow-hidden rounded-xl bg-[#022421] transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(0,255,196,0.25)] select-none flex flex-col justify-between cursor-pointer aspect-3/4 border border-[#0e5c55]/50 hover:border-teal-foreground/80",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. GAME CARD MEDIA & HOVER OVERLAY                                         */
/* -------------------------------------------------------------------------- */

export interface GameCardMediaProps extends React.ComponentProps<"div"> {
  src: string;
  alt: string;
  children?: React.ReactNode;
}

export function GameCardMedia({
  src,
  alt,
  className,
  children,
  ...props
}: GameCardMediaProps) {
  return (
    <div
      data-slot="game-card-media"
      className={cn("relative w-full h-full overflow-hidden", className)}
      {...props}
    >
      {/* Background Image with Hover Zoom */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover/game-card:scale-110"
        loading="lazy"
      />

      {/* Dark Vignette Overlay on Hover */}
      <div className="absolute inset-0 bg-linear-to-t from-[#022421] via-transparent to-black/20 opacity-60 group-hover/game-card:opacity-90 transition-opacity duration-300" />

      {/* Extra Overlay Content (e.g. Play/Demo Buttons, Badges) */}
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. GAME CARD BADGE (Top Overlay Tags like HOT, NEW, LIVE, TRIAL)          */
/* -------------------------------------------------------------------------- */

export interface GameCardBadgeProps extends React.ComponentProps<"span"> {
  variant?: "hot" | "new" | "live" | "trial" | "default";
}

export function GameCardBadge({
  children,
  variant = "default",
  className,
  ...props
}: GameCardBadgeProps) {
  const variantStyles = {
    hot: "bg-amber-500/90 text-black shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    new: "bg-teal-foreground text-[#022421] shadow-[0_0_8px_rgba(0,255,196,0.6)]",
    live: "bg-rose-600 text-white animate-pulse shadow-[0_0_8px_rgba(225,29,72,0.6)]",
    trial:
      "bg-sky-500 text-slate-950 font-bold shadow-[0_0_8px_rgba(14,165,233,0.6)]",
    default: "bg-[#003833]/80 text-teal-foreground border border-[#0e5c55]",
  };

  return (
    <span
      data-slot="game-card-badge"
      className={cn(
        "absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider backdrop-blur-sm",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. GAME CARD PLAY & FREE TRIAL OVERLAY BUTTONS                            */
/* -------------------------------------------------------------------------- */

export interface GameCardPlayOverlayProps extends React.ComponentProps<"div"> {
  isFreeTrial?: boolean;
  onPlay?: (e: React.MouseEvent) => void;
  onTrial?: (e: React.MouseEvent) => void;
  playLabel?: string;
  trialLabel?: string;
}

export function GameCardPlayOverlay({
  isFreeTrial = false,
  onPlay,
  onTrial,
  playLabel = "PLAY NOW",
  trialLabel = "DEMO",
  className,
  ...props
}: GameCardPlayOverlayProps) {
  return (
    <div
      data-slot="game-card-play-overlay"
      className={cn(
        "absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 opacity-0 group-hover/game-card:opacity-100 transition-all duration-300 bg-black/50 backdrop-blur-[2px] p-2",
        className,
      )}
      {...props}
    >
      {/* Real Play Action */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPlay?.(e);
        }}
        className="w-28 py-1.5 rounded-full bg-teal-foreground hover:bg-[#23ffc8] text-[#022421] font-black text-xs uppercase tracking-wider shadow-[0_0_12px_#00ffc4] transform scale-90 group-hover/game-card:scale-100 transition-all duration-300 cursor-pointer text-center"
      >
        {playLabel}
      </button>

      {/* Free Trial / Demo Action */}
      {isFreeTrial && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onTrial?.(e);
          }}
          className="w-28 py-1 rounded-full bg-[#003833]/90 hover:bg-[#004d46] border border-teal-foreground/60 text-teal-foreground font-bold text-[10px] uppercase tracking-wider transform scale-90 group-hover/game-card:scale-100 transition-all duration-300 cursor-pointer text-center"
        >
          {trialLabel}
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. GAME CARD FOOTER (Title & Provider Info)                               */
/* -------------------------------------------------------------------------- */

export interface GameCardFooterProps extends React.ComponentProps<"div"> {
  title: string;
  provider?: string;
}

export function GameCardFooter({
  title,
  provider,
  className,
  ...props
}: GameCardFooterProps) {
  return (
    <div
      data-slot="game-card-footer"
      className={cn(
        "absolute bottom-0 inset-x-0 p-2.5 z-10 flex flex-col gap-0.5 bg-linear-to-t from-[#022421] via-[#022421]/90 to-transparent",
        className,
      )}
      {...props}
    >
      <h3 className="text-xs sm:text-sm font-bold text-slate-100 truncate group-hover/game-card:text-teal-foreground transition-colors">
        {title}
      </h3>
      {provider && (
        <p className="text-[10px] text-slate-400 font-medium truncate uppercase tracking-wide">
          {provider}
        </p>
      )}
    </div>
  );
}
