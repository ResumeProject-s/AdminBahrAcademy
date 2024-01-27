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
import { useMyCourseObj } from "../../AddNewCourseProvider";
import MakingListForSelect from "../../../../../Services/Api/common/MakingListForSelect";
import { useMyCourseSettings } from "../../../CourseCommonDataProvider";
import {
  getItem,
  setItem,
} from "../../../../../Services/Api/common/storage.services";

const CourseClassInformation = ({ stepper }) => {
  const initialValue = new Date();
  const { courseDataObj, setCourseDataObj } = useMyCourseObj();
  const { courseTypeList, Level, Status, ClassRoom, Teacher, Terms, TechList } =
    useMyCourseSettings();

  const [initData, setInitData] = useState();
  const [StartDate, setStartDate] = useState(
    initData ? initData.StartTime : initialValue
  );
  const [EndDate, setEndDate] = useState(
    initData ? initData.EndTime : initialValue
  );

  useEffect(() => {
    if (getItem("classInfo")) {
      const classInfo = JSON.parse(getItem("classInfo"));
      setInitData(classInfo);
    }
  }, []);
  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0  f-bold">اطلاعات کلاس</h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setCourseDataObj({
            ...courseDataObj,
            TremId: Number(e.target.TremId.value),
            ClassId: Number(e.target.ClassId.value),
            Capacity: Number(e.target.Capacity.value),
            SessionNumber: e.target.SessionNumber.value,
            CourseLvlId: Number(e.target.CourseLvlId.value),
            ShortLink: e.target.ShortLink.value,
            StartTime: StartDate.toISOString(),
            EndTime: EndDate.toISOString(),
          });
          setItem(
            "classInfo",
            JSON.stringify({
              TremId: Number(e.target.TremId.value),
              ClassId: Number(e.target.ClassId.value),
              Capacity: Number(e.target.Capacity.value),
              SessionNumber: e.target.SessionNumber.value,
              CourseLvlId: Number(e.target.CourseLvlId.value),
              ShortLink: e.target.ShortLink.value,
              StartTime: StartDate.toISOString(),
              EndTime: EndDate.toISOString(),
            })
          );
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
              defaultValue={
                Terms.filter((items) => items.value === initData?.TremId)[0]
              }
              onChange={(e) => {
                setInitData({ ...initData, TremId: e.value });
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
              defaultValue={
                ClassRoom.filter(
                  (items) => items.value === initData?.ClassId
                )[0]
              }
              onChange={(e) => {
                setInitData({ ...initData, ClassId: e.value });
              }}
              className="react-select"
              classNamePrefix="select"
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
              value={initData ? initData.Capacity : ""}
              onChange={(e) => {
                setInitData({ ...initData, Capacity: Number(e.target.value) });
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
              value={initData ? initData.SessionNumber : ""}
              onChange={(e) => {
                setInitData({
                  ...initData,
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
              defaultValue={
                Level.filter(
                  (items) => items.value === initData?.CourseLvlId
                )[0]
              }
              onChange={(e) => {
                setInitData({ ...initData, CourseLvlId: e.value });
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
              value={initData ? initData.ShortLink : ""}
              onChange={(e) => {
                setInitData({
                  ...initData,
                  ShortLink: e.target.value,
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="courseLevelId">
              تاریخ شروع
            </Label>
            <DatePicker
              style={{ display: "block", width: "100%" }}
              value={StartDate}
              calendar={persian}
              locale={persian_fa}
              onChange={(e) => {
                setStartDate(e.toDate());
              }}
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="courseLevelId">
              تاریخ پایان
            </Label>
            <DatePicker
              style={{ display: "block", width: "100%" }}
              value={EndDate}
              calendar={persian}
              locale={persian_fa}
              onChange={(e) => {
                setEndDate(e.toDate());
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
