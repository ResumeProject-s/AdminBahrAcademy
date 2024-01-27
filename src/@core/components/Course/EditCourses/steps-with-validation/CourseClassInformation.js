// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Label,
  Row,
  Col,
  Button,
  Form,
  Input,
  FormFeedback,
  ListGroup,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import DatePicker from "react-multi-date-picker";
import { useMyCourseSettings } from "../../CourseCommonDataProvider";
import { useMyCourseDetailstore } from "../../CourseDetails/CourseDetailProvider";

const CourseClassInformation = ({ stepper }) => {
  const { Level, Status, ClassRoom, Terms } = useMyCourseSettings();

  const { dataForUpdate, setDataForUpadate } = useMyCourseDetailstore();

  const start = new Date(dataForUpdate.StartTime);
  const end = new Date(dataForUpdate.EndTime);
  // const [StartDate, setStartDate] = useState(start);
  // const [EndDate, setEndDate] = useState(end);
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0  f-bold">اطلاعات کلاس</h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          stepper.next();
        }}
      >
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="TremId">
              ترم برگزاری دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`TremId`}
              name={`TremId`}
              className="react-select"
              classNamePrefix="select"
              options={Terms}
              defaultVal={Terms[0]}
              onChange={(e) => {
                setDataForUpadate({
                  ...dataForUpdate,
                  TremId: Number(e.value),
                });
              }}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="ClassId">
              شماره ی کلاس
            </Label>
            <Select
              isClearable={false}
              theme={selectThemeColors}
              id={`ClassId`}
              name="ClassId"
              options={ClassRoom}
              defaultValue={ClassRoom[0]}
              className="react-select"
              classNamePrefix="select"
              onChange={(e) => {
                setDataForUpadate({
                  ...dataForUpdate,
                  ClassId: Number(e.value),
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" htmlFor="Capacity">
              ظرفیت
            </Label>
            <Input
              type="number"
              id="Capacity"
              name="Capacity"
              min={0}
              value={dataForUpdate.Capacity}
              onChange={(e) => {
                setDataForUpadate({
                  ...dataForUpdate,
                  Capacity: Number(e.target.value),
                });
              }}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="SessionNumber">
              تعداد جلسات
            </Label>
            <Input
              type="number"
              id="SessionNumber"
              name="SessionNumber"
              min={0}
              value={dataForUpdate.SessionNumber}
              onChange={(e) => {
                setDataForUpadate({
                  ...dataForUpdate,
                  SessionNumber: Number(e.target.value),
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="CourseLvlId">
              سطح دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`CourseLvlId`}
              name={"CourseLvlId"}
              className="react-select"
              classNamePrefix="select"
              options={Level}
              defaultVal={Level[0]}
              onChange={(e) => {
                setDataForUpadate({ ...dataForUpdate, CourseLvlId: e.value });
              }}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="ShortLink">
              لینک کوتاه
            </Label>
            <Input
              type="text"
              id="ShortLink"
              name="ShortLink"
              min={0}
              value={dataForUpdate.ShortLink}
              onChange={(e) => {
                setDataForUpadate({
                  ...dataForUpdate,
                  ShortLink: e.target.value,
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          {/* StartTime EndTime */}
          <Col md="6" className="mb-1">
            <Label className="form-label" for="courseLevelId">
              تاریخ شروع
            </Label>
            <DatePicker
              style={{ display: "block", width: "100%" }}
              value={start}
              calendar={persian}
              locale={persian_fa}
              onChange={(e) => {
                setDataForUpadate({ ...dataForUpdate, StartDate: e.toDate() });
              }}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="courseLevelId">
              تاریخ پایان
            </Label>
            <DatePicker
              style={{ display: "block", width: "100%" }}
              value={end}
              calendar={persian}
              locale={persian_fa}
              onChange={(e) => {
                setDataForUpadate({ ...dataForUpdate, EndDate: e.toDate() });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="CourseLvlId">
              وضعیت دوره
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`CourseLvlId`}
              name={"CourseLvlId"}
              className="react-select"
              classNamePrefix="select"
              options={Status}
              defaultValue={Status[0]}
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
          <Button color="primary" className="btn-next" type="submit">
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

export default CourseClassInformation;
