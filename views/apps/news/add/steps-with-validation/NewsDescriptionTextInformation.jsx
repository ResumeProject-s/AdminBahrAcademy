// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components

import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
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
import { useSetAddNewsObj } from "../../../../../src/utility/context/News/AddNews";

// import { useMyCourseObj } from "../../AddNewCourseProvider";
// import MakingListForSelect from "../../../../../Services/Api/common/MakingListForSelect";
// import { useMyCourseSettings } from "../../../CourseCommonDataProvider";

const NewsDescriptionTextInformation = ({ stepper }) => {
  const [ediorControlledTextValue, setEditorControlledTextValue] = useState();
  const { addNewsDataObj, setAddNewsDataObj } = useSetAddNewsObj();

  return (
    <Fragment>
      <div className="content-header">
        <h5 style={{ fontSize: "20px" }} className="mb-0  f-bold">
          متن خبر
        </h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setAddNewsDataObj({
            ...addNewsDataObj,
            Describe: e.target.newsDescribe.value,
          });

          console.log(addNewsDataObj);
          stepper.next();
        }}
      >
        <Row>
          <Col xs="12" className="mb-1">
            {/* <EditorControlled /> */}
            <Label
              style={{ fontSize: "15px" }}
              className="form-label"
              for="newsDescribe"
            >
              توضیحات کامل خبر{" "}
            </Label>
            <Input
              name="newsDescribe"
              type="textarea"
              id="newsDescribe"
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

export default NewsDescriptionTextInformation;
