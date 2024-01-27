// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Form, Label, Input, Row, Col, Button } from "reactstrap";
import SelectBasic from "../../../SelectBasic/SelectBasic";
import TextareaCounter from "../../../TextareaCounter/TextareaCounter";
import { useMyCourseSettings } from "../../CourseCommonDataProvider";
import { useMyCourseDetailstore } from "../../CourseDetails/CourseDetailProvider";

const BasicInformation = ({ stepper }) => {
  const { courseTypeList, Teacher } = useMyCourseSettings();
  const { dataForUpdate, setDataForUpadate } = useMyCourseDetailstore();

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0 f-bold">اطلاعات اولیه دوره </h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          stepper.next();
        }}
      >
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="courseTitle">
              عنوان دوره
            </Label>
            <Input
              id="courseTitle"
              name="courseTitle"
              placeholder="مثال : دوره ری اکت"
              value={dataForUpdate.Title}
              onChange={(e) => {
                setDataForUpadate({ ...dataForUpdate, Title: e.target.value });
              }}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="courseCost">
              هزینه دوره
            </Label>
            <Input
              type="number"
              id="courseCost"
              name="courseCost"
              min={0}
              value={dataForUpdate.Cost}
              onChange={(e) => {
                setDataForUpadate({
                  ...dataForUpdate,
                  Cost: Number(e.target.value),
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <SelectBasic
            name={"courseType"}
            opt={courseTypeList}
            text={"نوع دوره"}
            changeHandler={(e) => {
              setDataForUpadate({ ...dataForUpdate, CourseTypeId: e.value });
            }}
            defaultVal={courseTypeList[0]}
          />
          <SelectBasic
            name={"courseTeacher"}
            opt={Teacher}
            defaultVal={Teacher[0]}
            text={"استاد دوره"}
            changeHandler={(e) => {
              setDataForUpadate({ ...dataForUpdate, TeacherId: e.value });
            }}
          />
        </Row>
        <Row>
          <Col lg="12" md="6" className="mb-1">
            <Label className="form-label" for={`miniDescribe`}>
              توضیحات کوچک
            </Label>
            <Input
              type="text"
              id="miniDescribe"
              name="miniDescribe"
              placeholder=""
              value={dataForUpdate.MiniDescribe}
              onChange={(e) => {
                setDataForUpadate({
                  ...dataForUpdate,
                  MiniDescribe: e.target.value,
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <TextareaCounter
            value={dataForUpdate.Describe}
            onChange={(e) => {
              setDataForUpadate({
                ...dataForUpdate,
                Describe: e.target.value,
              });
            }}
            name={"mainDescriptions"}
            text={"توضیحات کامل"}
          />
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">
              مرحله ی قبل
            </span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            // onClick={() => }
          >
            <span className="align-middle d-sm-inline-block d-none">
              مرحله بعد
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
              type="submit"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default BasicInformation;
