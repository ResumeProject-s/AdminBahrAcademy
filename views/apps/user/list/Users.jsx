import { User, UserCheck, UserPlus, UserX } from "react-feather";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import UsersList from "./Table";
import { useMyUserListAdmin } from "./UserProvider";
import DataApi from "../../../../src/@core/Services/Api/DashboardAPI/DataApi";
import { useEffect, useState } from "react";

const Users = () => {
  const { allUser } = useMyUserListAdmin();
  console.log(allUser);

  const [DATA, setDATA] = useState();
  const Data = async () => {
    const res = await DataApi();
    setDATA(res);
  };

  useEffect(() => {
    Data();
  }, []);

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="تعداد کاربران"
            icon={<User size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {DATA ? DATA.allUser : "none"}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="تعداد تکمیل پروفایل"
            icon={<UserPlus size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {DATA ? DATA.inCompeletUserCount : "none"}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="کاربران فعال"
            icon={<UserCheck size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {DATA ? DATA.allUser - DATA.deactiveUsers : "none"}
              </h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="کاربران غیرفعال"
            icon={<UserX size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">
                {DATA ? DATA.deactiveUsers : "none"}
              </h3>
            }
          />
        </Col>
      </Row>
      <UsersList />
    </div>
  );
};

export default Users;
