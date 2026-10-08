import AdminSidebar from "@/components/admin/AdminSidebar";
import Header from "@/components/admin/Header";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-[#0B1120] text-gray-300 font-sans flex flex-col overflow-hidden">
      <Header />

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
