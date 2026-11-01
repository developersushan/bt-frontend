/* eslint-disable @typescript-eslint/no-explicit-any */
import FloatingSupport from "@/components/shared/FloatingSupport";
import { Footer } from "@/components/shared/footer/Footer";
import BottomNavbar from "@/components/shared/navbar/MobileBottomNavbar";
import Navbar from "@/components/shared/navbar/Navbar";
import { getUserInfo } from "@/services/auth.service";
import { UserProvider } from "@/providers/UserProvider";
import { FeaturedGamesModalTrigger } from "./_home/FeaturedGamesModalTrigger";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const userData: any = await getUserInfo();
  return (
    <div>
      <div className="h-16">
        <Navbar userData={userData} />
      </div>
      <UserProvider userInfo={userData?.user}>{children}</UserProvider>
      <FloatingSupport />
      <Footer />
      <FeaturedGamesModalTrigger isLoggedIn={Boolean(userData?.user)} />
      <BottomNavbar />
    </div>
  );
};

export default CommonLayout;
