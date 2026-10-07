"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md text-center bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
        {/* Animated Icon Container */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/50 text-rose-500 rounded-2xl flex items-center justify-center shadow-xs">
            <AlertTriangle className="w-8 h-8 stroke-[1.75]" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Something went wrong!
        </h2>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
          An unexpected error occurred while processing your request. Please try
          again or return to the dashboard.
        </p>

        {/* Optional Error Digest */}
        {error?.digest && (
          <div className="mt-3 p-2 bg-slate-100 dark:bg-slate-800/60 rounded-lg inline-block">
            <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              Error ID:{" "}
              <span className="text-slate-600 dark:text-slate-300 font-semibold">
                {error.digest}
              </span>
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <Button
          type="button"
          onClick={() => reset()}
          className="w-full h-10 rounded-xl bg-rose-500 mt-8 hover:bg-rose-600 text-white text-xs font-semibold shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
