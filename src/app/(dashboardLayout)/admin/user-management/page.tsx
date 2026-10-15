import UserManagement from "@/components/modules/admin/UserManagement";
import { getAllUser } from "@/services/userManagement.service";

export default async function page() {
  const allUsers = await getAllUser();
  return (
    <div>
      <UserManagement allUsers={allUsers} />
    </div>
  );
}
