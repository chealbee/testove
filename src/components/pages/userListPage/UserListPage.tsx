import AddNewUser from "./addNewUser/AddNewUser";
import UserList from "./userList/UserList";
import { Toaster } from "@/components/ui/toaster";

const UserListPage = () => {
  return (
    <>
      <Toaster />
      <AddNewUser />
      <UserList />
    </>
  );
};

export default UserListPage;
