// ** React Imports
import { Fragment } from "react";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight } from "react-feather";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Reactstrap Imports
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import { useAddUserStore } from "../AddUsersProvider";

const defaultValues = {
  gmail: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

const AccountDetails = ({ stepper }) => {
  const SignupSchema = yup.object().shape({
    username: yup.string().required(),
  });

  // ** Hooks

  const { UsersValue, setUsersValue } = useAddUserStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      stepper.next();
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0 f-bold">اطلاعات اولیه کاربر </h5>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setUsersValue({
            ...UsersValue,
            lastName: e.target.lastName.value,
            firstName: e.target.firstName.value,
            phoneNumber: e.target.phoneNumber.value,
            gmail: e.target.email.value,
          });
          stepper.next();
        }}
      >
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="username">
              نام کاربر{" "}
            </Label>

            <Input
              name="firstName"
              placeholder="مثال : معین"
              invalid={errors.username && true}
            />

            {errors.username && (
              <FormFeedback>{errors.username.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`email`}>
              نام خانوادگی
            </Label>

            <Input
              name="lastName"
              type="text"
              placeholder="مثال : محسن زاده گنجی"
              invalid={errors.username && true}
            />

            {errors.username && (
              <FormFeedback>{errors.username.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <div className="form-password-toggle col-md-6 mb-1">
            <Label className="form-label" for="password">
              شماره تماس
            </Label>

            <Input
              name="phoneNumber"
              placeholder="مثال : 09900521873"
              invalid={errors.password && true}
            />

            {errors.password && (
              <FormFeedback>{errors.password.message}</FormFeedback>
            )}
          </div>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`email`}>
              ایمیل{" "}
            </Label>

            <Input
              name="email"
              type="email"
              placeholder="مثال :john.doe@email.com "
              invalid={errors.email && true}
            />

            {errors.email && (
              <FormFeedback>{errors.email.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
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

export default AccountDetails;
