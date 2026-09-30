"use client";

import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";

// Game Provider List
const gameProviders = [
  "JILI",
  "PG SOFT",
  "SPRIBE",
  "PLAYTECH",
  "BNG",
  "LIVE22",
  "JDB",
  "FA CHAI",
  "5G GAMES",
  "AMEBA",
  "NETENT",
  "RED TIGER",
  "BAISON",
  "GEMINI",
  "MEGA",
  "FTG",
];

const navLinks = [
  "Hot Games",
  "Favorites",
  "Slots",
  "Live",
  "Poker",
  "Fish",
  "Sports",
  "E-Sports",
  "Lottery",
];

const socialImages = [
  { image: "/images/social-media/facebook.png", link: "#" },
  { image: "/images/social-media/whatsapp.png", link: "#" },
  { image: "/images/social-media/telegram.png", link: "#" },
  { image: "/images/social-media/symbol-vector.jpg", link: "#" },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#003A3A] text-slate-300 pt-10 pb-8 mt-12">
      <div className="container px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column 1: Help Center */}
          <div className="md:col-span-3">
            <h3 className="text-[#ffb703] font-bold text-lg mb-4">
              Help Center
            </h3>
            {/* dynamic or additional help items can be mapped here */}
          </div>

          {/* Left Column 2: Game Center Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-[#ffb703] font-bold text-lg mb-4">
              Game center
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {navLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="hover:text-[#00ffc4] transition-colors duration-200"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Platform Intro, Action Buttons & Providers */}
          <div className="md:col-span-6 space-y-5">
            {/* Top Info Header with Logo & Bio */}
            <div className="flex gap-4 items-start">
              <div className="shrink-0 p-1.5 bg-[#053733] border border-[#ffb703]/40 rounded-xl shadow-md">
                <div className="w-16 h-16 rounded-lg bg-[#00ffc4]/10 flex items-center justify-center border border-[#00ffc4]/30 font-extrabold text-[#00ffc4] text-xl">
                  CW
                </div>
              </div>
              <p className="text-xs text-slate-300/90 leading-relaxed">
                Our Website is an innovative online sportsbook and casino.
                Offering a wide variety of sports and betting markets with high
                odds, we make sure to bring you the best online experience ever!
                Enjoy thousands of pre-match and live sporting events and win
                big while supporting your favourites!
              </p>
            </div>

            {/* Action Bar (PARTNER, Live Chat, Social Icons) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Partner Button */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {/* Partner Button */}
                <button
                  type="button"
                  className="px-6 py-2 bg-[#004d46] hover:bg-[#005c54] text-[#00ffc4] font-bold text-sm tracking-wide rounded-md border border-[#00ffc4]/30 shadow-md transition-all cursor-pointer"
                >
                  PARTNER
                </button>

                {/* Live Chat Button */}
                <button
                  type="button"
                  className="flex items-center gap-2 px-5 py-2 bg-[#004d46] hover:bg-[#005c54] text-[#00ffc4] font-bold text-sm rounded-md border border-[#00ffc4]/30 shadow-md transition-all cursor-pointer"
                >
                  <div className="p-1 bg-[#ffb703] rounded-full text-white">
                    <MessageCircleMore className="size-3.5 fill-current" />
                  </div>
                  <span>Live Chat</span>
                </button>
              </div>

              {/* Social & Age Restriction Icons */}
              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                {socialImages.map((social, index) => (
                  <Link key={index} href={social.link}>
                    <Image
                      src={social.image}
                      alt="social image"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Border Divider */}
            <div className="border-t border-[#0e5c55]/60 my-4" />

            {/* Game Providers Logo Badges */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 pt-1">
              {gameProviders.map((provider) => (
                <div
                  key={provider}
                  className="h-7 bg-[#001c1a] border border-[#0e5c55]/40 rounded flex items-center justify-center px-1 text-[9px] font-extrabold text-slate-400 tracking-tighter hover:text-[#00ffc4] hover:border-[#00ffc4]/40 transition-all cursor-pointer select-none text-center truncate"
                >
                  {provider}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
