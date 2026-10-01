import { BannerCarousel } from "./_home/BannerCarousel";
import { BottomBannerHeader } from "./_home/BottomBannerHeader";
import TopBannerHeader from "./_home/TopBannerHeader";
import AllCategory from "./_home/AllCategory";

const CommonPage = () => {
  return (
    <div className="container mt-22">
      <TopBannerHeader />
      <BannerCarousel />
      <BottomBannerHeader />
      <AllCategory />
    </div>
  );
};

export default CommonPage;
