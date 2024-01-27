import { Col, Row } from "reactstrap";
import StatsHorizontal from "../widgets/stats/StatsHorizontal";
import { Cpu } from "react-feather";
import { GrCompliance } from "react-icons/gr";
import { selectThemeColors } from "../../../utility/Utils";
import DataApi from "../../Services/Api/DashboardAPI/DataApi";
import { useEffect, useState } from "react";

export function CourseListAnalytics() {
  const [DATA, setDATA] = useState();
  const Data = async () => {
    const res = await DataApi();
    setDATA(res);
  };

  useEffect(() => {
    Data();
  }, []);
  console.log(DATA);

  return (
    <Row>
      <Col lg="3" sm="6">
        <StatsHorizontal
          theme={selectThemeColors}
          className=" rounded"
          icon={<GrCompliance size={21} />}
          color="success"
          stats="86"
          statTitle="دوره های تکمیل شده"
        />
      </Col>
      <Col lg="3" sm="6">
        <StatsHorizontal
          theme={selectThemeColors}
          className=" rounded"
          icon={<Cpu size={21} />}
          color="primary"
          stats={DATA ? DATA.allReserve : "no"}
          statTitle="CPU Usage"
        />
      </Col>
      <Col lg="3" sm="6">
        <StatsHorizontal
          theme={selectThemeColors}
          className=" rounded"
          icon={<Cpu size={21} />}
          color="primary"
          stats={DATA ? DATA.allReserveAccept : "no"}
          statTitle="تعداد رزرو قبول شده"
        />
      </Col>
      <Col lg="3" sm="6">
        <StatsHorizontal
          theme={selectThemeColors}
          className=" rounded"
          icon={<Cpu size={21} />}
          color="primary"
          stats={DATA ? DATA.allReserveNotAccept : "no"}
          statTitle="تعداد رزرو های تایید نشده"
        />
      </Col>
    </Row>
  );
}
