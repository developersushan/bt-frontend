import Marquee from "react-fast-marquee";
import { Megaphone } from "lucide-react";

const TopBannerHeader = () => {
  return (
    <div className="relative flex items-center mb-6 overflow-hidden rounded-full bg-[#002C35] sm:h-9 h-7 border border-[#0e5c55] select-none">
      {/* Fixed Left Megaphone Icon */}
      <div className="absolute left-0 z-20 flex items-center justify-center h-full pl-3 pr-2 bg-[#002C35] pointer-events-none">
        <Megaphone className="size-4.5 text-amber-400 fill-amber-400/20 -rotate-12 shrink-0" />
      </div>

      {/* Marquee with Scrollbar Hidden */}
      <Marquee
        speed={40}
        gradient={false}
        pauseOnHover={true}
        className="text-[#B88843] text-xs sm:text-sm font-medium leading-none overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
      >
        <span className="pl-12 pr-4 flex items-center gap-2">
          🎉🎉🎉 নতুন বছরের স্বপ্নের পরিকল্পনা আনুষ্ঠানিকভাবে চালু হয়েছে! এখনই
          যোগ দিন, ১০০% ওয়েলকাম বোনাস পান এবং প্রতিদিন জিতে নিন আকর্ষণীয় মেগা
          পুরস্কার! 🚀🔥💰
        </span>
      </Marquee>
    </div>
  );
};

export default TopBannerHeader;
