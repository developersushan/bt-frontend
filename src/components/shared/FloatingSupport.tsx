import Link from "next/link";
import {
  FaWhatsapp,
  FaFacebookF,
  FaTelegramPlane,
  FaHeadset,
} from "react-icons/fa";

export const FloatingSupport = () => {
  const className =
    "absolute bottom-0 w-full bg-yellow-400 text-[8px] font-bold text-black text-center py-px truncate";
  return (
    <div className="fixed right-3 sm:top-1/2 top-[68%] sm:-translate-y-1/2 translate-y-[-68%] z-50 flex flex-col space-y-3">
      <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="sm:size-12 size-9 bg-[#25D366] hover:scale-110 transition-transform duration-300 text-white rounded-full flex items-center justify-center shadow-lg"
        title="WhatsApp"
      >
        <FaWhatsapp className="sm:size-7 size-6" />
      </Link>

      <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="relative sm:size-12 size-9 bg-[#1877F2] hover:scale-110 transition-transform duration-300 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-400 overflow-hidden"
        title="Facebook"
      >
        <FaFacebookF className="sm:size-5 size-4" />
        <span className={className}>বোনাস</span>
      </Link>

      <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="relative sm:size-12 size-9 bg-[#24A1DE] hover:scale-110 transition-transform duration-300 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-400 overflow-hidden"
        title="Telegram"
      >
        <FaTelegramPlane className="sm:size-5 size-4 -ml-0.5 sm:-mt-1 -mt-1.5" />
        <span className={className}>বোনাস</span>
      </Link>

      <Link
        href="#"
        className="sm:size-12 size-9 bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-110 transition-transform duration-300 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-400"
        title="Live Support"
      >
        <FaHeadset className="sm:size-6 size-5" />
      </Link>
    </div>
  );
};

export default FloatingSupport;
