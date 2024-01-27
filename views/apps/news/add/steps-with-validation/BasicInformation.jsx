// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import SelectBasic from "./SelectBasic/SelectBasic";
// import { useMyCourseObj } from "../../AddNewCourseProvider";
// import { useMyCourseSettings } from "../../../CourseCommonDataProvider";
import { useSetAddNewsObj } from "../../../../../src/utility/context/News/AddNews";
import { AdminGetNewsCategoryApi } from "../../../../../src/services/api/news/adminGetNewsCategoryApi";
import { MakingListForSelect } from "./SelectBasic/MakingListForSelect";
import classnames from "classnames";

const BasicInformation = ({ stepper }) => {
  //   const { courseTypeList, Level, Status, ClassRoom, Teacher, Terms, TechList } =
  //     useMyCourseSettings();
  //   const { courseDataObj, setCourseDataObj, courseId, setCOurseId } =
  //     useMyCourseObj();

  const { addNewsDataObj, setAddNewsDataObj } = useSetAddNewsObj();

  const [allNewsCategories, setAllNewsCategories] = useState();

  const [value, setValue] = useState("");

  const AdminGetNewsCategoryFunc = async () => {
    try {
      const result = await AdminGetNewsCategoryApi();
      if (result) {
        setAllNewsCategories(MakingListForSelect(result, "id", "categoryName"));
      }
    } catch (error) {
      return alert(error.message);
    }
  };

  useEffect(() => {
    AdminGetNewsCategoryFunc();
  }, []);

  return (
    <Fragment>
      <div className="content-header">
        <h5 style={{ fontSize: "20px" }} className="mb-0 f-bold">
          اطلاعات اولیه خبر{" "}
        </h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(value);
          console.log();
          setAddNewsDataObj({
            ...setAddNewsDataObj,
            Title: e.target.newsTitle.value,
            NewsCatregoryId: e.target.newsCatagoryId.value,
            Keyword: e.target.newsKeyword.value,
            MiniDescribe: e.target.miniDescribe.value,
          });
          console.log(e.target.miniDescribe.value);
          stepper.next();
        }}
      >
        <Row>
          <Col md="4" className="mb-1">
            <Label
              style={{ fontSize: "15px" }}
              className="form-label"
              for="newsTitle"
            >
              عنوان خبر
            </Label>
            <Input
              id="newsTitle"
              name="newsTitle"
              placeholder="مثال :اپل هوش مصنوعی می سازد؟ "
            />
          </Col>
          <Col md="4" className="mb-1">
            <Label
              style={{ fontSize: "15px" }}
              className="form-label"
              for="newsKeyword"
            >
              کلمه کلیدی
            </Label>
            <Input
              id="newsKeyword"
              name="newsKeyword"
              placeholder="مثال :هوش مصنوعی اپل "
            />
          </Col>
          <Col md="4" className="mb-1">
            <SelectBasic
              name={"newsCatagoryId"}
              opt={allNewsCategories}
              text={"دسته بندی خبر"}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" className="mb-1">
            <Label
              style={{ fontSize: "15px" }}
              className="form-label"
              for={`miniDescribe`}
            >
              توضیحات مختصر خبر{" "}
            </Label>
            <div className="form-floating mb-0">
              <Input
                name="miniDescribe"
                value={value}
                type="textarea"
                style={{ minHeight: "70px" }}
                onChange={(e) => setValue(e.target.value)}
                className={classnames({ "text-danger": value.length > 200 })}
              />
            </div>
            <span
              className={classnames("textarea-counter-value float-end", {
                "bg-danger": value.length > 200,
              })}
            >
              {`${value.length} / 200`}
            </span>
          </Col>
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
