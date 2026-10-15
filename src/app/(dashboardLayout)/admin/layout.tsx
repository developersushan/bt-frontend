import AdminSidebar from "@/components/modules/admin/AdminSidebar";
import Header from "@/components/modules/admin/Header";
import { UserProvider } from "@/providers/UserProvider";
import { getUserInfo } from "@/services/auth.service";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const userInfo = await getUserInfo();
  return (
    <div className="h-screen bg-[#0B1120] text-gray-300 font-sans flex flex-col overflow-hidden">
      <UserProvider userInfo={userInfo}>
        <Header />
      </UserProvider>

      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 h-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
