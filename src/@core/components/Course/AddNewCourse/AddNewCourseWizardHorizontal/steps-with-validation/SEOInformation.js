// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";
import { useMyCourseObj } from "../../AddNewCourseProvider";
import {
  getItem,
  setItem,
} from "../../../../../Services/Api/common/storage.services";

const SEOInformation = ({ stepper }) => {
  const { courseDataObj, setCourseDataObj } = useMyCourseObj();
  const [initData, setInitData] = useState();

  useEffect(() => {
    if (getItem("seoInfo")) {
      const basicItems = JSON.parse(getItem("seoInfo"));
      setInitData(basicItems);
    }
  }, []);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0 f-bold">اطلاعات سئو</h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setCourseDataObj({
            ...courseDataObj,
            GoogleSchema: e.target.GoogleSchema.value,
            GoogleTitle: e.target.GoogleTitle.value,
          });
          setItem(
            "seoInfo",
            JSON.stringify({
              GoogleSchema: e.target.GoogleSchema.value,
              GoogleTitle: e.target.GoogleTitle.value,
            })
          );
          stepper.next();
        }}
      >
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="GoogleSchema">
              Google Schema
            </Label>
            <Input
              id="GoogleSchema"
              name="GoogleSchema"
              placeholder="Google Schema..."
              value={initData ? initData.GoogleSchema : ""}
              onChange={(e) => {
                setInitData({ ...initData, GoogleSchema: e.target.value });
              }}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="GoogleTitle">
              GoogleTitle
            </Label>
            <Input
              id="GoogleTitle"
              name="GoogleTitle"
              placeholder="Google Title"
              value={initData ? initData.GoogleTitle : ""}
              onChange={(e) => {
                setInitData({ ...initData, GoogleTitle: e.target.value });
              }}
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              مرحله قبل
            </span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              مرحله بعد س
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default SEOInformation;
