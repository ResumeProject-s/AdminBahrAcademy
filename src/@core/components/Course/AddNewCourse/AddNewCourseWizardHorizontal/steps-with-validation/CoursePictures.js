import { Fragment, useState } from "react";
import { ArrowLeft } from "react-feather";

import { Button, Form } from "reactstrap";
import FileUploaderSingle from "../../../../FileUploader/FileUploaderSingle";
import { useMyCourseObj } from "../../AddNewCourseProvider";
import AddNewCourse from "../../../../../Services/Api/Course-Admin/AddNewCourse";
import { removeItem } from "../../../../../Services/Api/common/storage.services";

const CoursePictures = ({ stepper }) => {
  const [MainImages, setMainImages] = useState([]);
  const { courseDataObj, setCourseDataObj, courseId, setCOurseId } =
    useMyCourseObj();
  const newData = async () => {
    const res = await AddNewCourse(courseDataObj);
    if (res.success) {
      setCOurseId(res.id);
      removeItem("seoInfo");
      removeItem("classInfo");
      removeItem("basicItems");
      stepper.next();
    } else {
      alert("خطا رخ داده");
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
          setCourseDataObj({
            ...courseDataObj,
            Image: MainImages[0],
          });
          newData();
        }}
      >
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
              تایید و رفتن به مرحله ی بعد
            </span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default CoursePictures;
