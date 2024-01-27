// ** React Imports
import { Fragment, useState } from "react";
import { Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";
import { useMyCourseObj } from "../../AddNewCourseProvider";
import Select from "react-select";
import { useMyCourseSettings } from "../../../CourseCommonDataProvider";
import AddNewTechToCourse from "../../../../../Services/Api/Course-Admin/AddNewTechToCourse";
import { useNavigate } from "react-router-dom";
import ToastSuccess from "../../../../../Services/Api/common/react-hot-toasts/ToastSuccess";
import ToastError from "../../../../../Services/Api/common/react-hot-toasts/ToastError";

const SetTech = ({ stepper }) => {
  const { TechList } = useMyCourseSettings();
  // const [isMultipleVal, setIsMultipleVal] = useState(false);
  // const changeHandler = (e) => {
  //   const { checked } = e.target;
  //   if (checked) setIsMultipleVal(true);
  //   else setIsMultipleVal(false);
  // };
  const navigate = useNavigate();
  const { courseId } = useMyCourseObj();
  const addCategory = async (body) => {
    const res = await AddNewTechToCourse(courseId, body);
    console.log(res);
    if (res.success) {
      ToastSuccess(res.message);
      setTimeout(() => {
        navigate(`/CourseDetails?CourseId=${courseId}`);
      }, 1000);
    } else {
      ToastError(res.error[0]);
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0 f-bold"> تعیین دسته بندی</h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const sample = [{ techId: e.target.techlist.value }];
          addCategory(sample);
        }}
      >
        <Col
          lg="8"
          className="d-flex align-items-center align-content-center mb-2"
        >
          <Select
            className="w-75"
            options={TechList}
            // isMulti={isMultipleVal}
            name="techlist"
          />
          {/* <Col style={{ marginRight: "10px", cursor: "pointer" }}>
            <Input
              type="checkbox"
              style={{ cursor: "pointer" }}
              id="isMultiple"
              onChange={changeHandler}
            />
            <Label
              style={{
                fontSize: "16px",
                marginRight: "10px",
                cursor: "pointer",
              }}
              for="isMultiple"
            >
              انتخاب چنتایی
            </Label>
          </Col> */}
        </Col>
        <div className="d-flex justify-content-between ">
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
              اضافه کرده دسته بندی و رفتن به صفحه ی دوره
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

export default SetTech;
