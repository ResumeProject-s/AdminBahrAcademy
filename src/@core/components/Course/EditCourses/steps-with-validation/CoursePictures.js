import { Fragment, useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";

import { Button, Card, Col, Form, Row } from "reactstrap";
import FileUploaderSingle from "../../../FileUploader/FileUploaderSingle";
import { useMyCourseDetailstore } from "../../CourseDetails/CourseDetailProvider";
import UpdatingCourses from "../../../../Services/Api/CourseDetailsAdmin/UpdatingCourses";
import ToastSuccess from "../../../../Services/Api/common/react-hot-toasts/ToastSuccess";

const CoursePictures = ({ stepper, showAndSetter }) => {
  const [MainImages, setMainImages] = useState([]);
  const { dataForUpdate, setDataForUpadate, rerenderState, setRerenderState } =
    useMyCourseDetailstore();

  const { settingsShow, Showing } = showAndSetter;
  useEffect(() => {
    setDataForUpadate({ ...dataForUpdate, Image: MainImages[0] });
  }, [MainImages]);

  const upDateCourse = async () => {
    const res = await UpdatingCourses(dataForUpdate);
    if (res.success) {
      ToastSuccess("دوره ی مورد نظر با موفقبت آپدیت شده است.");
      setRerenderState(!rerenderState);
      settingsShow(!Showing);
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">تصاویر</h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          upDateCourse();
        }}
      >
        <Row>
          <Col className="d-flex justify-content-center align-content-center  align-items-center mb-1 gap-2">
            <img
              src={dataForUpdate.Image}
              style={{ width: "250px", height: "auto" }}
              alt="dkvb "
            />
            <p>تصویر کنونی دوره</p>
          </Col>
        </Row>
        <FileUploaderSingle
          files={MainImages}
          setFiles={setMainImages}
          text={"تصور دوره"}
        />
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
          <Button type="submit" color="success" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              تایید اطلاعات
            </span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default CoursePictures;
