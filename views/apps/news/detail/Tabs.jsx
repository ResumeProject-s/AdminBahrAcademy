import { Fragment } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import UserProjectsList from "./UserProjectsList";
import { BiComment } from "react-icons/bi";
import { TbShoppingCartStar } from "react-icons/tb";
import { GrDocumentTime } from "react-icons/gr";
import TableOfSchedules from "./TableOfSchedules";
import TableOfReserved from "./TableOfReserved";
import { useNewsDetailStore } from "../../../../src/utility/context/News/NewsDetail";
import { FileText } from "react-feather";

const UserTabs = ({ active, toggleTab, data }) => {
  const { reserved, setReserved } = useNewsDetailStore();
  console.log(reserved);
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <FileText className="font-medium-3 me-50" />
            <span className="fw-bold">متن اخبار و مقالات</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <BiComment className="font-medium-2" />
            <span className="fw-bold">کامنت های اخبار و مقالات</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <UserProjectsList />
        </TabPane>
        <TabPane tabId="3">
          <TableOfSchedules data={data.describe} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
