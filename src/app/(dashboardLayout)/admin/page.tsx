import Dashboard from "@/components/modules/admin/Dashboard";
import { ChartLine } from "@/components/modules/admin/LineChart";
import { ChartPie } from "@/components/modules/admin/PieChart";

const AdminPage = () => {
  return (
    <div>
      <Dashboard />
      <div className="grid grid-cols-2 gap-4 mt-6">
        <ChartLine />
        <ChartPie />
      </div>
    </div>
  );
};

export default AdminPage;
