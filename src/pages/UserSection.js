import React from "react";
import Users from "../../views/apps/user/list/Users";
import UserProvider from "../../views/apps/user/list/UserProvider";

const UserSection = () => {
  return (
    <>
      <UserProvider>
        <Users />
      </UserProvider>
    </>
  );
};

export default UserSection;
