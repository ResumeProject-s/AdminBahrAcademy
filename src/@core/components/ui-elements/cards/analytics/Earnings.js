// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from "reactstrap";

const Earnings = ({ success, statistics }) => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: { show: false },
    comparedResult: [-3, 8],
    labels: ["غیرفعال", "کاربران فعال"],
    stroke: { width: 0 },
    colors: ["#28c76f66", "#28c76f33", success],
    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20,
      },
    },
    plotOptions: {
      pie: {
        startAngle: -10,
        donut: {
          labels: {
            show: true,
            name: {
              offsetY: 15,
            },
            value: {
              offsetY: -15,
              formatter(val) {
                return `${parseInt(val)} %`;
              },
            },
            total: {
              show: true,
              offsetY: 15,
              label: "کاربران فعال",
              formatter() {
                return statistics ? statistics.activeUserPercent : "no";
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 1325,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 120,
          },
        },
      },
      {
        breakpoint: 1065,
        options: {
          chart: {
            height: 100,
          },
        },
      },
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 120,
          },
        },
      },
    ],
  };

  return (
    <Card className="earnings-card">
      <CardBody>
        <Row>
          <Col xs="6">
            <CardTitle className="mb-1">کاربران</CardTitle>
            <div className="font-small-2">کاربران فعال</div>
            <h5 className="mb-1">
              {statistics ? statistics.activeUserPercent : "no"} %
            </h5>
            <CardText className="text-muted font-small-2">
              <span className="fw-bolder">
                {statistics ? statistics.interActiveUserPercent : "no"} %
              </span>
              <span>کاربران غیرفعال</span>
            </CardText>
          </Col>
          <Col xs="6">
            <Chart
              options={options}
              series={[53, 16, 31]}
              type="donut"
              height={120}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Earnings;
