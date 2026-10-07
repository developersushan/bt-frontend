"use client"
import { SecurityScoreCard } from "./SecurityScoreCard";
import { SecuritySettings } from "./SecuritySettings";
import { UserProfileCard } from "./UserProfileCard";

export default function MyAccountContent() {
  return (
    <div className="h-full bg-slate-100/60 p-4 sm:p-6 flex justify-center items-stretch">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Left Component */}
        <UserProfileCard />

        {/* Middle Component */}
        <SecurityScoreCard />

        {/* Right Component */}
        <SecuritySettings />
      </div>
    </div>
  );
}
