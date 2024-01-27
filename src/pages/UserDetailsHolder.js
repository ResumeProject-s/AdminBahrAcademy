import UserDetails from "../../views/apps/user/list/UserDetail";
import UserDetailProvider from "../../views/apps/user/list/UserDetail/UserDetailProvider";

const UserDetailsHolder = () => {
  return (
    <UserDetailProvider>
      <UserDetails />
    </UserDetailProvider>
  );
};

export default UserDetailsHolder;
