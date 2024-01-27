import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

import StatsHorizontal from "../@core/components/widgets/stats/StatsHorizontal";

import {
  Activity,
  AlertOctagon,
  Briefcase,
  Cpu,
  Dribbble,
  FileText,
  Layout,
  Radio,
  Server,
  TrendingUp,
} from "react-feather";
import { Fragment } from "react";
import NewsListProvider from "../utility/context/News/NewsList";
import NewsList from "./../../views/apps/news/list/newsList";
import { AdminGetNewsCategoryApi } from "../services/api/news/adminGetNewsCategoryApi";

const NewsListHolder = () => {
  const [NewsCatagories, setNewsCatagories] = useState();

  const [NewsCategoriesIcons, setNewsCategoriesIcons] = useState([
    <FileText size={21} />,
    <Radio size={21} />,
    <TrendingUp size={21} />,
    <Dribbble size={21} />,
    <Cpu size={21} />,
    <Activity size={21} />,
    <Activity size={21} />,
    <Activity size={21} />,
    <Layout size={21} />,
    <Radio size={21} />,
    <Briefcase size={21} />,
  ]);

  const [NewsCategoriesColors, setNewsCategoriesColors] = useState([
    "primary",
    "success",
    "warning",
    "danger",
    "primary",
    "success",
    "danger",
    "success",
    "warning",
    "primary",
  ]);

  const AdminGetNewsCategoryFunc = async () => {
    try {
      const result = await AdminGetNewsCategoryApi();
      if (result) {
        setNewsCatagories(result, "id", "categoryName");
        console.log(result);
      }
    } catch (error) {
      return alert(error.message);
    }
  };

  useEffect(() => {
    AdminGetNewsCategoryFunc();
  }, []);

  return (
    <Fragment>
      <div>
        <Row>
          {/* Stats With Icons Horizontal */}
          {NewsCatagories
            ? NewsCatagories.map((item, index) => {
                return (
                  <Col lg="3" sm="6">
                    <StatsHorizontal
                      icon={NewsCategoriesIcons[index]}
                      color={NewsCategoriesColors[index]}
                      stats="86%"
                      statTitle={item.categoryName}
                    />
                  </Col>
                );
              })
            : null}

          {/* <Col lg="3" sm="6">
            <StatsHorizontal
              icon={<FileText size={21} />}
              color="primary"
              stats="86%"
              statTitle="مقالات"
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              icon={<Radio size={21} />}
              color="success"
              stats="1.2gb"
              statTitle="رویداد ها"
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              icon={<Dribbble size={21} />}
              color="warning"
              stats="0.1%"
              statTitle="خبر های ورزشی"
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              icon={<TrendingUp size={21} />}
              color="danger"
              stats="13"
              statTitle="خبر های اقتصادی"
            />
          </Col> */}
          {/* Stats With Icons Horizontal */}
        </Row>{" "}
      </div>

      <div>
        {" "}
        <Row>
          <Col sm="12">
            <NewsListProvider>
              <NewsList />
            </NewsListProvider>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default NewsListHolder;
