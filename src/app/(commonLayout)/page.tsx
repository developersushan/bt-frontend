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

const CommonHomePage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["games"],
    queryFn: () => getAllGames(),
  });

  return (
    <div className="container mt-22">
      <TopBannerHeader />
      <BannerCarousel />
      <BottomBannerHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllCategory />
      </HydrationBoundary>
    </div>
  );
};

export default CommonHomePage;
