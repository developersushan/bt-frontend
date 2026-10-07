import { Loader2 } from "lucide-react";

interface LoadingProps {
  message?: string;
}

const LoadingState = ({ message = "Fetching data..." }: LoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 w-full gap-4">
      <div className="relative flex items-center justify-center">
        {/* Outer pulse effect */}
        <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping duration-1000" />
        <Loader2
          className="animate-spin text-red-600 relative z-10"
          size={48}
        />
      </div>
      <p className="text-zinc-400 font-medium animate-pulse tracking-wide italic">
        {message}
      </p>
    </div>
  );
};

export default LoadingState;