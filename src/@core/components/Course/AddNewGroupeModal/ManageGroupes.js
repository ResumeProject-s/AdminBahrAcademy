// ** React Imports
import { Fragment, useState } from "react";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import GroupeTable from "./GroupeTable/GroupeTable";
import AddModalGroupForm from "./AddModalGroupForm/AddModalGroupForm";

const ManageGroupes = () => {
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="nav-vertical">
      <Nav tabs className="nav-left">
        <NavItem>
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            لیست گروه ها
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            افزودن گروه جدید
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <GroupeTable />
        </TabPane>
        <TabPane tabId="2">
          <AddModalGroupForm />
        </TabPane>
      </TabContent>
    </div>
  );
};
export default ManageGroupes;
