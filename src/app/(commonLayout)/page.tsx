import { BannerCarousel } from "./_home/BannerCarousel";
import { GameCategories } from "./_home/GameCategories";
import TopBannerHeader from "./_home/TopBannerHeader";
import AllCategory from "./_home/AllCategory";

const CommonPage = () => {
  return (
    <div className="container mt-22">
      <TopBannerHeader />
      <BannerCarousel />
      <GameCategories />
      <AllCategory />
    </div>
  );
};

export default CommonPage;
