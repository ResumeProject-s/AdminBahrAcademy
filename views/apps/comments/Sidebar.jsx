// ** React Imports
import { Link, useParams } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Mail, Send, Edit2, Star, Info, Trash } from "react-feather";

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem, Badge } from "reactstrap";

const Sidebar = () => {
  return (
    <div
      className={classnames("sidebar-left", {
        show: false,
      })}
    >
      <div className="sidebar">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            <div className="form-group-compose text-center compose-btn">
              <Button className="compose-email" color="primary">
                Compose
              </Button>
            </div>
            <PerfectScrollbar
              className="sidebar-menu-list"
              options={{ wheelPropagation: false }}
            >
              <ListGroup tag="div" className="list-group-messages">
                <ListGroupItem tag={Link} to="/Comments/Recieved">
                  <Mail size={18} className="me-75" />
                  <span className="align-middle">کامنت های دریافت شده</span>
                </ListGroupItem>
              </ListGroup>
              <h6 className="section-label mt-3 mb-1 px-2">لیبل ها</h6>
              <ListGroup tag="div" className="list-group-labels">
                <ListGroupItem tag={Link} to={`/Comments/Recieved/Accept`}>
                  <span className="bullet bullet-sm bullet-success me-1"></span>
                  کامنت های تایید شده{" "}
                </ListGroupItem>
                <ListGroupItem tag={Link} to={`/Comments/Recieved/UnAccept`}>
                  <span className="bullet bullet-sm bullet-danger me-1"></span>
                  کامنت های تایید نشده
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
