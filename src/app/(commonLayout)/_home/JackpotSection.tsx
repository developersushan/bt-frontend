/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GameCard } from "@/components/shared/GameCard";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function JackpotSection({ data }: { data: any }) {
  const jackpotAmount = [
    "৳",
    "4",
    "8",
    "7",
    ",",
    "9",
    "0",
    "3",
    ",",
    "1",
    "4",
    "4",
  ];
  return (
    <div className="w-full my-6">
      <div className="relative flex flex-col md:flex-row items-center bg-[#002B26] h-auto md:h-44 rounded-lg">
        {/* 🔴 Left Side: Fixed Jackpot Banner */}
        <div className="relative w-full md:w-105 lg:w-115 h-36 md:h-full bg-linear-to-r from-[#001D1A] to-[#003832] flex flex-col justify-between p-4 shrink-0 z-10 border-b md:border-b-0 md:border-r border-teal-500/20 rounded-l-lg">
          {/* Airplane Background / Image */}
          <div className="absolute left-2 top-2 w-32 md:w-44 h-auto pointer-events-none z-0">
            {/* <Image
              src="/images/airplane.png"
              alt="Jackpot Airplane"
              width={180}
              height={120}
              className="object-contain"
            /> */}
          </div>

          {/* Jackpot Title */}
          <div className="self-end z-10 mr-4">
            <h2 className="text-2xl md:text-4xl font-black italic tracking-wide text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Jackpot
            </h2>
          </div>

          {/* Jackpot Digit Counters */}
          <div className="flex items-center gap-1 z-10 mt-auto overflow-x-auto pb-1 max-w-full">
            {jackpotAmount.map((char, index) => (
              <div
                key={index}
                className={`flex items-center justify-center font-bold text-sm md:text-lg rounded shadow-md ${
                  char === "৳"
                    ? "w-6 h-7 md:w-8 md:h-9 bg-white text-black font-extrabold"
                    : char === ","
                      ? "w-3 h-7 md:w-4 md:h-9 text-amber-400 text-xl font-black bg-transparent"
                      : "w-5 h-7 md:w-7 md:h-9 bg-white text-slate-900 border-b-2 border-slate-300"
                }`}
              >
                {char}
              </div>
            ))}
          </div>
        </div>

        {/* 🟢 Right Side: React Fast Marquee Slider */}
        <Marquee
          speed={40}
          pauseOnHover={true}
          gradient={false}
          className="w-full h-full flex items-center"
        >
          {data?.games?.map((game: any) => (
            <div key={game.id} className="w-30 shrink-0 mx-1.5">
              <GameCard game={game} />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
