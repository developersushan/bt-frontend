import { getPersonalCenterDashboardAction } from "@/services/my-account.service";
import MobileHeader from "../MobileHeader";
import { SecurityScoreCard } from "./SecurityScoreCard";
import { SecuritySettings } from "./SecuritySettings";
import { UserProfileCard } from "./UserProfileCard";
import { useQuery } from "@tanstack/react-query";
import LoadingState from "@/components/shared/Loading";

export default function MyAccountContent() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-personal-center"],
    queryFn: getPersonalCenterDashboardAction,
  });
  if (isLoading) {
    return <LoadingState />;
  }
console.log(data);
  return (
    <div className="min-h-screen md:min-h-0 md:h-145 flex flex-col ">
      <MobileHeader title="My Account" />

      <div className="flex-1 p-4 sm:p-6 w-full flex justify-center">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
          {/* Left Component */}
          <UserProfileCard data={data?.data} />

          {/* Middle Component */}
          <SecurityScoreCard data={data?.data} />

          {/* Right Component */}
          <SecuritySettings />
        </div>
      </div>
    </div>
  );
}
