// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import Chart from "react-apexcharts";
import { HelpCircle } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

const GoalOverview = ({ success, statistics }) => {
  // ** State
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   axios.get('/card/card-analytics/goal-overview').then(res => setData(res.data))
  //   return () => setData(null)
  // }, [])

  const options = {
      chart: {
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          blur: 3,
          left: 1,
          top: 1,
          opacity: 0.1,
        },
      },
      colors: ["#51e5a8"],
      plotOptions: {
        radialBar: {
          offsetY: 10,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: "77%",
          },
          track: {
            background: "#ebe9f1",
            strokeWidth: "50%",
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              color: "#5e5873",
              fontFamily: "Montserrat",
              fontSize: "2.86rem",
              fontWeight: "600",
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: [success],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      grid: {
        padding: {
          bottom: 30,
        },
      },
    },
    series = [Math.round(statistics.reserveAcceptPercent)];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">رزرو ها</CardTitle>
        <HelpCircle size={18} className="text-muted cursor-pointer" />
      </CardHeader>
      <CardBody className="p-0">
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={245}
        />
      </CardBody>
      <Row className="border-top text-center mx-0">
        <Col xs="6" className="border-end py-1">
          <CardText className="text-muted mb-0">تایید شده</CardText>
          <h3 className="fw-bolder mb-0">
            {statistics
              ? Math.round(statistics.reserveAcceptPercent) + "%"
              : "no"}
          </h3>
        </Col>
        <Col xs="6" className="py-1">
          <CardText className="text-muted mb-0">درحال انتظار</CardText>
          <h3 className="fw-bolder mb-0">
            {statistics
              ? Math.round(statistics.reserveNotAcceptPercent) + "%"
              : "no"}
          </h3>
        </Col>
      </Row>
    </Card>
  );
};
export default GoalOverview;
