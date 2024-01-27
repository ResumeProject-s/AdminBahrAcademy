// // ** React Imports
import { useEffect, useState } from "react";
import { Row, Col, Alert } from "reactstrap";
import "@styles/react/apps/app-users.scss";
import UserTabs from "./Tabs";
import UserInfoCard from "./UserInfoCard";
import { useSearchParams } from "react-router-dom";
import GetCourseDetailsAdmin from "./../../../Services/Api/CourseDetailsAdmin/GetCourseDetailsAdmin";
import { useMyCourseDetailstore } from "./CourseDetailProvider";
import GetReservedCourses from "../../../Services/Api/CourseDetailsAdmin/GetReservedCourses";
import GetCourseDetailsUsers from "../../../Services/Api/CourseDetailsAdmin/GetCourseDetailsUsers";

const CourseDetails = () => {
  const [active, setActive] = useState("3");

  const [paramas] = useSearchParams();
  const courseId = paramas.get("CourseId");

  const {
    courseDetails,
    setCourseDetails,
    reserved,
    setReserved,
    refresh,
    courseDetailsUser,
    setCourseDetailsUser,
    rerenderState,
    setRerenderState,
  } = useMyCourseDetailstore();

  const getUsersData = async () => {
    const res = await GetCourseDetailsAdmin(courseId);
    setCourseDetails(res);
  };
  const getUsersData2 = async () => {
    const res2 = await GetCourseDetailsUsers(courseId);
    setCourseDetailsUser(res2);
  };

  useEffect(() => {
    getUsersData();
    getUsersData2();
  }, [rerenderState]);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-view">
      {courseDetails ? (
        <Row>
          <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <UserInfoCard selectedUser={courseDetails} />
          </Col>
          <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs
              active={active}
              data={courseDetails}
              toggleTab={toggleTab}
            />
          </Col>
        </Row>
      ) : (
        "داده ایی برای نمایش وجود ندارد"
      )}
    </div>
  );
};
export default CourseDetails;
