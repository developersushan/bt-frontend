import { BannerCarousel } from "./_home/BannerCarousel";
import TopBannerHeader from "./_home/TopBannerHeader";

const CommonPage = () => {
  return (
    <div className="container">
      <TopBannerHeader />
      <BannerCarousel />
    </div>
  );
};

export default CommonPage;
