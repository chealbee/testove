import AddNewUser from "./addNewUser/AddNewUser";
import UserList from "./userList/UserList";
import UserListPagination from "./userList/UserListPagination";

const UserListPage = () => {
  return (
    <>
      <AddNewUser />
      <UserList />
      <UserListPagination />
    </>
  );
};

export default UserListPage;
