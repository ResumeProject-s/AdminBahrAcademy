import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMyUserDetailstore } from "./UserDetailProvider";
import GetUserDetailAdmin from "../../../../../src/@core/Services/Api/UserDetailAdmin/GetUserDetailAdmin";
import UserCard from "./UserCard";
import { Col, Row } from "reactstrap";
import Profile from "./Profile";
import { GetUsersComment } from "../../../../../src/@core/Services/Api/UserDetailAdmin/GetUsersComment";

const UserDetails = () => {
  const [active, setActive] = useState("1");
  const [com, setCom] = useState();

  const [paramas] = useSearchParams();
  const userId = paramas.get("UserId");

  const { UserDetails, setUserDetails } = useMyUserDetailstore();
  const getUsersData = async () => {
    const res = await GetUserDetailAdmin(userId);
    setUserDetails(res);
    // console.log(res);
  };
  const [count, setCount] = useState(1);

  const getUsersComment = async () => {
    const res = await GetUsersComment(userId, count);
    setCom(res);
    // console.log(res);
  };
  useEffect(() => {
    getUsersData();
    getUsersComment();
  }, [count]);
  return (
    <>
      {UserDetails ? (
        <div id="user-profile">
          <Profile
            selectedUser={UserDetails}
            UsersComment={com}
            UseCount={{ count, setCount }}
          />
        </div>
      ) : (
        "داده ایی برای نمایش وجود ندارد"
      )}
    </>
  );
};
export default UserDetails;
