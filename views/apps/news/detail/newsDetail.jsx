// // ** React Imports
import { useEffect, useState } from "react";
import { Row, Col, Alert } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import UserTabs from "./Tabs";
import NewsInfoCard from "./NewsInfoCard";
import { useParams, useSearchParams } from "react-router-dom";
import { useNewsDetailStore } from "../../../../src/utility/context/News/NewsDetail";
import { AdminGetNewsWithIdApi } from "../../../../src/services/api/news/adminGetNewsWithIdApi";

const NewsDetail = () => {
  const [active, setActive] = useState("3");

  const newsId = useParams().id;

  const {
    newsDetails,
    setNewsDetails,
    newsComments,
    setNewsComments,
    reserved,
    setReserved,
  } = useNewsDetailStore();

  const GetNewsDetailWithIdFunc = async () => {
    try {
      const result = await AdminGetNewsWithIdApi(newsId);

      console.log(result);

      setNewsDetails(result.detailsNewsDto);
      setNewsComments(result.commentDtos);
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    GetNewsDetailWithIdFunc();
  }, []);

  // const getUsersData = async () => {
  //   const res = await GetCourseDetailsAdmin(courseId);
  //   setCourseDetails(res);
  // };
  // const getReserved = async () => {
  //   const res = await GetReservedCourses(courseId);
  //   setReserved(res);
  // };
  // useEffect(() => {
  //   getUsersData();
  //   getReserved();
  // }, []);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-view">
      {newsDetails ? (
        <Row>
          <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <NewsInfoCard selectedUser={newsDetails} />
          </Col>
          <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs
              active={active}
              data={newsDetails}
              toggleTab={toggleTab}
            />
          </Col>
        </Row>
      ) : (
        <h2 className="mt-2 text-center text-secondary">
          داده ایی برای نمایش وجود ندارد
        </h2>
      )}
    </div>
  );
};
export default NewsDetail;
// : (
//   <Alert color="danger">
//     <h4 className="alert-heading">User not found</h4>
//     <div className="alert-body">
//       User with id: {id} doesn't exist. Check list of all Users:{" "}
//       <Link to="/apps/user/list">Users List</Link>
//     </div>
//   </Alert>
// );
{
  /* <PlanCard /> */
}
