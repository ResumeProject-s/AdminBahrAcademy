import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Row,
  Col,
} from "reactstrap";
import DataApi from "../@core/Services/Api/DashboardAPI/DataApi";
import StatsCard from "../@core/components/ui-elements/cards/statistics/StatsCard";
import { useState } from "react";
import Earnings from "../@core/components/ui-elements/cards/analytics/Earnings";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { useContext } from "react";
import GoalOverview from "../@core/components/ui-elements/cards/analytics/GoalOverview";
import CardMedal from "../@core/components/ui-elements/cards/advance/CardMedal";

const Dashboard = () => {
  const { colors } = useContext(ThemeColors);
  const [DATA, setDATA] = useState();
  const Data = async () => {
    const res = await DataApi();
    setDATA(res);
  };
  if (DATA) {
    console.log(DATA.allUser);
  }

  useEffect(() => {
    Data();
  }, []);
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard
            cols={{ xl: "3", sm: "6" }}
            statistics={DATA ? DATA : []}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="4" md="4" xs="6" style={{ height: "100px" }}>
          <Earnings
            success={colors.success.main}
            statistics={DATA ? DATA : []}
          />
        </Col>
        <Col lg="8" md="8" xs="12">
          <GoalOverview
            success={colors.success.main}
            statistics={DATA ? DATA : []}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
