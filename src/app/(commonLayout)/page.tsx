import { BannerCarousel } from "./_home/BannerCarousel";
import { BottomBannerHeader } from "./_home/BottomBannerHeader";
import TopBannerHeader from "./_home/TopBannerHeader";
import AllCategory from "./_home/AllCategory";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllGames } from "@/services/games.service";
import { getUserInfo } from "@/services/auth.service";
import { UserProvider } from "@/providers/UserProvider";
import AnnouncementModal from "./_home/AnnouncementModal";

const CommonHomePage = async () => {
  const userInfo = await getUserInfo();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["games"],
    queryFn: () => getAllGames(),
  });

  return (
    <div className="container mt-8">
      <AnnouncementModal />
      <TopBannerHeader />
      <BannerCarousel />
      <BottomBannerHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserProvider userInfo={userInfo}>
          <AllCategory />
        </UserProvider>
      </HydrationBoundary>
    </div>
  );
};

export default CommonHomePage;
