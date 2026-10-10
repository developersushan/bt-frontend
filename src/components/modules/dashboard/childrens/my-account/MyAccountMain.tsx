"use client"
import { SecurityScoreCard } from "./SecurityScoreCard";
import { SecuritySettings } from "./SecuritySettings";
import { UserProfileCard } from "./UserProfileCard";

export default function MyAccountContent() {
  return (
    <div className="h-full bg-slate-100/60 p-4 sm:p-6 w-full flex justify-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
