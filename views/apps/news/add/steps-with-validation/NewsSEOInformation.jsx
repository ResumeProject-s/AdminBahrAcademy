// ** React Imports
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";
import { useSetAddNewsObj } from "../../../../../src/utility/context/News/AddNews";

const NewsSEOInformation = ({ stepper }) => {
  const { addNewsDataObj, setAddNewsDataObj } = useSetAddNewsObj();

  console.log(addNewsDataObj);

  return (
    <Fragment>
      <div className="content-header">
        <h5 style={{ fontSize: "20px" }} className="mb-0 f-bold">
          اطلاعات سئو
        </h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setAddNewsDataObj({
            ...addNewsDataObj,
            GoogleTitle: e.target.newsGoogleTitle.value,
            GoogleDescribe: e.target.newsGoogleDescribe.value,
          });
          stepper.next();
        }}
      >
        <Row>
          <Col md="6" className="mb-1">
            <Label
              style={{ fontSize: "15px" }}
              className="form-label"
              for="newsGoogleTitle"
            >
              عنوان خبر در گوگل{" "}
            </Label>
            <Input
              id="newsGoogleTitle"
              name="newsGoogleTitle"
              placeholder="مثال: اپل در ساختن هوش مصنوعی"
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" className="mb-1">
            <Label
              style={{ fontSize: "15px" }}
              className="form-label"
              for="newsGoogleDescribe"
            >
              توضیحات کامل خبر در گوگل
            </Label>
            <Input
              name="newsGoogleDescribe"
              type="textarea"
              id="newsGoogleDescribe"
              rows="6"
              placeholder="مثال:"
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
              مرحله بعد
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

export default NewsSEOInformation;
