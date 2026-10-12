/* eslint-disable @typescript-eslint/no-explicit-any */
import { Footer } from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import { getUserInfo } from "@/services/auth.service";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const userData: any = await getUserInfo();
  return (
    <div>
      <Navbar userData={userData} />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
