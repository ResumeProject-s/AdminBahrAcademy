// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import { Label, Row, Col, Button, Form, Input, FormFeedback } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useAddUserStore } from "../AddUsersProvider";
import { AddUser } from "../../../../../../../src/@core/Services/Api/common/AddUser/AddUser";
import { SuccessSwal } from "../../../../../../../src/@core/Services/Api/common/SuccsesSweetAlert";
import { ErrorSwal } from "../../../../../../../src/@core/Services/Api/common/ErrorSwertAlert";

const defaultValues = {
  password: "",
  ConfirmPassword: "",
  role: "Student",
};

const PersonalInfo = ({ stepper }) => {
  const sendValue = async () => {
    const res = await AddUser(UsersValue);
    if (res.success) {
      SuccessSwal(res.message);
    } else ErrorSwal(res.errors);
  };

  // ** Hooks

  const { UsersValue, setUsersValue } = useAddUserStore();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      stepper.next();
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
            message: `Please enter a valid ${key}`,
          });
        }
      }
    }
  };

  const roleOptions = [
    { value: "Student", label: "دانشجو" },
    { value: "Teacher", label: "استاد" },
    { value: "Nothing", label: "هیچکدام" },
    { value: "Both", label: "هردو" },
  ];

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0"> اطلاعات تکمیلی</h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setUsersValue({
            ...UsersValue,
            password: e.target.password.value,
            isStudent: e.target.role.value == "Student" ? true : false,
            isTeacher: e.target.role.value == "Teacher" ? true : false,
          });
          stepper.next();
          sendValue();
        }}
      >
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="firstName">
              رمز عبور
            </Label>

            <Input
              invalid={errors.firstName && true}
              type="password"
              name="password"
            />

            {errors.password && (
              <FormFeedback>{errors.password.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="lastName">
              تکرار رمز عبور
            </Label>

            <Input
              invalid={errors.lastName && true}
              type="password"
              name="ConfirmPassword"
            />

            {errors.password && (
              <FormFeedback>{errors.password.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="role">
              نقش
            </Label>
            <Select
              theme={selectThemeColors}
              isClearable={false}
              id={`role`}
              className="react-select"
              classNamePrefix="select"
              options={roleOptions}
              defaultValue={roleOptions[2]}
              name="role"
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
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">ثبت</span>
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

export default PersonalInfo;
