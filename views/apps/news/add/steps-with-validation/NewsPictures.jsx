import { Fragment, useState } from "react";
import { ArrowLeft } from "react-feather";

import { Button, Form } from "reactstrap";

import { useSetAddNewsObj } from "../../../../../src/utility/context/News/AddNews";
import FileUploaderSingle from "./../../../../../src/@core/components/FileUploader/FileUploaderSingle";
import SwitchIcons from "../../../../../src/@core/components/Switch/SwitchIcons";
import { AddNewsFormData } from "../../../../../src/utility/FormData/AddNewsFormData";
import { AdminAddNewsApi } from "../../../../../src/services/api/news/adminAddNewsApi";
import SuccessSweetAlertFunction from "../../../../../src/utility/SweetAlertFuncs/SuccessSweetAlertFunction";
import ErrorSweetAlertFunction from "../../../../../src/utility/SweetAlertFuncs/ErrorSweetAlertFunction";
import { useNavigate } from "react-router-dom";

const NewsPictures = ({ stepper }) => {
  const navigate = useNavigate();

  const [MainImages, setMainImages] = useState([]);

  const [isToggleSlider, setIsToggleSlider] = useState(false);

  //   const { courseDataObj, setCourseDataObj, courseId, setCOurseId } =
  //     useMyCourseObj();

  const { addNewsDataObj, setAddNewsDataObj, newsId, setNewsId } =
    useSetAddNewsObj();

  //   const newData = async () => {
  //     const res = await AddNewCourse(courseDataObj);
  //     if (res.success) {
  //       setCOurseId(res.id);
  //       stepper.next();
  //     } else {
  //       alert("خطا رخ داده");
  //     }
  //   };

  const AddNewsFunc = async () => {
    try {
      const formData = AddNewsFormData(addNewsDataObj);

      //   console.log(formData);

      const result = await AdminAddNewsApi(formData);

      if (result.success === true) {
        setNewsId(result.id);
        SuccessSweetAlertFunction("موفق!", result.message);

        setTimeout(() => {
          navigate(`/NewsList`);
        }, 1000);
      } else if (result.success === false) {
        ErrorSweetAlertFunction("ناموفق!", result.message);
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 style={{ fontSize: "20px" }} className="mb-0">
          تصاویر
        </h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setAddNewsDataObj({
            ...addNewsDataObj,
            Image: MainImages[0],
            IsSlider: isToggleSlider,
          });

          AddNewsFunc();
        }}
      >
        <FileUploaderSingle
          files={MainImages}
          setFiles={setMainImages}
          text={"تصویر خبر"}
        />
        <SwitchIcons
          name="newsIsSlider"
          isToggle={isToggleSlider}
          setIsToggle={setIsToggleSlider}
          switchText="نمایش اسلایدر:"
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
              تایید و ساختن خبر جدید
            </span>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default NewsPictures;
