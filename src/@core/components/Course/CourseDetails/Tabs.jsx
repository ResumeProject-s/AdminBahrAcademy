import { Fragment, useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import UserProjectsList from "./UserProjectsList";
import { BiComment } from "react-icons/bi";
import { TbShoppingCartStar } from "react-icons/tb";
import { GrDocumentTime } from "react-icons/gr";
import TableOfSchedules from "./TableOfSchedules";
import TableOfReserved from "./TableOfReserved";
import { useMyCourseDetailstore } from "./CourseDetailProvider";
import GetReservedCourses from "../../../Services/Api/CourseDetailsAdmin/GetReservedCourses";
import { useSearchParams } from "react-router-dom";
import GetCourseGroupes from "../../../Services/Api/CourseDetailsAdmin/GetCourseGroupes";

const UserTabs = ({ active, toggleTab, data }) => {
  const { reserved, setReserved, refresh, setRefresh, courseDetails } =
    useMyCourseDetailstore();
  const [paramas] = useSearchParams();
  const courseId = paramas.get("CourseId");
  const [Gid, setGid] = useState();

  const getReserved = async () => {
    const res = await GetReservedCourses(courseId);
    setReserved(res);
  };
  const getGroupeId = async () => {
    const res = await GetCourseGroupes(courseId, courseDetails.teacherId);
    setGid(res[Math.floor(Math.random() * res.length)].groupId);
  };

  useEffect(() => {
    getReserved();
    getGroupeId();
  }, [refresh]);

  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <GrDocumentTime className="font-medium-3 me-50" />
            <span className="fw-bold">زمان بندی برگزاری دوره</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <BiComment className="font-medium-2" />
            <span className="fw-bold">کامنت های دوره</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <TbShoppingCartStar className="font-medium-3 me-50" />
            <span className="fw-bold">کابرانی که این دوره را رزو کردند</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <UserProjectsList />
        </TabPane>
        <TabPane tabId="3">
          <TableOfSchedules data={data.courseSchedules} />
        </TabPane>
        <TabPane tabId="2">
          <TableOfReserved
            data={
              reserved
                ? reserved.map((data) => ({
                    ...data,
                    setRefresh,
                    courseGroupId: Gid,
                  }))
                : []
            }
          />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
