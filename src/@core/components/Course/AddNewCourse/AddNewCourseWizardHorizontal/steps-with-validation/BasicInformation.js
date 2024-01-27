// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Form, Label, Input, Row, Col, Button } from "reactstrap";
import SelectBasic from "../../../../SelectBasic/SelectBasic";
import TextareaCounter from "../../../../TextareaCounter/TextareaCounter";
import { useMyCourseObj } from "../../AddNewCourseProvider";
import { useMyCourseSettings } from "../../../CourseCommonDataProvider";
import {
  getItem,
  setItem,
} from "../../../../../Services/Api/common/storage.services";

const BasicInformation = ({ stepper }) => {
  const { courseTypeList, Level, Status, ClassRoom, Teacher, Terms, TechList } =
    useMyCourseSettings();
  const { courseDataObj, setCourseDataObj, courseId, setCOurseId } =
    useMyCourseObj();
  const [initData, setInitData] = useState();

  useEffect(() => {
    if (getItem("basicItems")) {
      const basicItems = JSON.parse(getItem("basicItems"));
      setInitData(basicItems);
    }
  }, []);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0 f-bold">اطلاعات اولیه دوره </h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setCourseDataObj({
            ...courseDataObj,
            Title: e.target.courseTitle.value,
            Describe: e.target.mainDescriptions.value,
            MiniDescribe: e.target.miniDescribe.value,
            Cost: Number(e.target.courseCost.value),
            CourseTypeId: Number(e.target.courseType.value),
            TeacherId: Number(e.target.courseTeacher.value),
          });
          setItem(
            "basicItems",
            JSON.stringify({
              ...courseDataObj,
              Title: e.target.courseTitle.value,
              Describe: e.target.mainDescriptions.value,
              MiniDescribe: e.target.miniDescribe.value,
              Cost: Number(e.target.courseCost.value),
              CourseTypeId: Number(e.target.courseType.value),
              TeacherId: Number(e.target.courseTeacher.value),
            })
          );
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
              value={initData ? initData.Title : ""}
              onChange={(e) => {
                setInitData({ ...initData, Title: e.target.value });
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
              value={initData ? initData.Cost : ""}
              onChange={(e) => {
                setInitData({ ...initData, Cost: e.target.value });
              }}
            />
          </Col>
        </Row>
        <Row>
          <SelectBasic
            name={"courseType"}
            opt={courseTypeList}
            text={"نوع دوره"}
            defaultVal={
              courseTypeList.filter(
                (items) => items.value === initData?.CourseTypeId
              )[0]
            }
            changeHandler={(e) => {
              setInitData({ ...initData, CourseTypeId: e.value });
            }}
          />
          <SelectBasic
            name={"courseTeacher"}
            opt={Teacher}
            text={"استاد دوره"}
            defaultVal={
              Teacher.filter((items) => items.value === initData?.TeacherId)[0]
            }
            changeHandler={(e) => {
              setInitData({ ...initData, TeacherId: e.value });
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
              value={initData ? initData.MiniDescribe : ""}
              onChange={(e) => {
                setInitData({ ...initData, MiniDescribe: e.target.value });
              }}
            />
          </Col>
        </Row>
        <Row>
          <TextareaCounter
            value={initData ? initData.Describe : ""}
            onChange={(e) => {
              setInitData({ ...initData, Describe: e.target.value });
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
