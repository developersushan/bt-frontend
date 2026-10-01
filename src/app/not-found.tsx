import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#031c13] text-white flex flex-col items-center justify-center p-4 text-center">
      {/* Glow Effect Background Box */}
      <div className="relative flex flex-col items-center max-w-md w-full bg-[#062b1e] border border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl backdrop-blur-md">
        {/* Glowing 404 Text */}
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-red-500 via-amber-400 to-teal-foreground drop-shadow-md tracking-wider">
          404
        </h1>

        {/* Status Message */}
        <h2 className="text-xl sm:text-2xl font-bold mt-4 text-gray-100">
          Page Not Found
        </h2>

        <p className="text-xs sm:text-sm text-gray-400 mt-2 leading-relaxed">
          Oops! The gaming page or category you are looking for does not exist
          or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full mt-8">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-black bg-linear-to-r from-amber-400 to-orange-500 rounded-lg shadow-md hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Home width={18} height={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
