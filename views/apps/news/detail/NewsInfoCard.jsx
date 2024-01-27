// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X, Heart, Star, Eye } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const roleColors = {
  مقدماتی: "light-info",
  متوسط: "light-danger",
  پیشرفته: "light-warning",
};

const statusColors = {
  active: "light-success",
  pending: "light-warning",
  inactive: "light-secondary",
};

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const countryOptions = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "france", label: "France" },
  { value: "russia", label: "Russia" },
  { value: "canada", label: "Canada" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "dutch", label: "Dutch" },
];

const MySwal = withReactContent(Swal);

import { FaHeart } from "react-icons/fa";
import { BiSolidComment } from "react-icons/bi";
import { GrView } from "react-icons/gr";
import { makeDatePersian } from "../../../../src/utility/makeDatePersian/makeDatePersian";
import { useNavigate, useParams } from "react-router-dom";

const NewsInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const params = useParams().id;

  console.log(params);

  // ** Hook
  // const {
  //   reset,
  //   control,
  //   setError,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     username: selectedUser.username,
  //     lastName: selectedUser.fullName.split(" ")[1],
  //     firstName: selectedUser.fullName.split(" ")[0],
  //   },
  // });

  // ** render user img
  const renderUserImg = () => {
    const imgLogic = selectedUser && selectedUser.currentImageAddress;

    if (selectedUser.currentImageAddress) {
      return (
        <img
          height="150"
          width="150"
          alt="user-avatar"
          src={
            selectedUser.currentImageAddress
              ? selectedUser.currentImageAddress
              : null
          }
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      <Avatar
        initials
        className="me-1"
        color={selectedUser.avatarColor || "light-primary"}
        content={selectedUser.title || "News"}
      />;
    }
  };

  // const onSubmit = (data) => {
  //   if (Object.values(data).every((field) => field.length > 0)) {
  //     setShow(false);
  //   } else {
  //     for (const key in data) {
  //       if (data[key].length === 0) {
  //         setError(key, {
  //           type: "manual",
  //         });
  //       }
  //     }
  //   }
  // };

  // const handleReset = () => {
  //   reset({
  //     username: selectedUser.username,
  //     lastName: selectedUser.fullName.split(" ")[1],
  //     firstName: selectedUser.fullName.split(" ")[0],
  //   });
  // };

  // const handleSuspendedClick = () => {
  //   return MySwal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert user!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, Suspend user!",
  //     customClass: {
  //       confirmButton: "btn btn-primary",
  //       cancelButton: "btn btn-outline-danger ms-1",
  //     },
  //     buttonsStyling: false,
  //   }).then(function (result) {
  //     if (result.value) {
  //       MySwal.fire({
  //         icon: "success",
  //         title: "Suspended!",
  //         text: "User has been suspended.",
  //         customClass: {
  //           confirmButton: "btn btn-success",
  //         },
  //       });
  //     } else if (result.dismiss === MySwal.DismissReason.cancel) {
  //       MySwal.fire({
  //         title: "Cancelled",
  //         text: "Cancelled Suspension :)",
  //         icon: "error",
  //         customClass: {
  //           confirmButton: "btn btn-success",
  //         },
  //       });
  //     }
  //   });
  // };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section ">
            <div className="d-flex align-items-center flex-column ">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{selectedUser.title}</h4>

                  <Badge
                    color={roleColors[selectedUser.courseLevelName]}
                    className="fw-normal f-bold mt-1"
                  >
                    {selectedUser.courseLevelName}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2 ">
              <Badge color="light-primary" className="rounded p-75">
                <Eye className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedUser.currentView}</h4>
                <small> بازدید </small>
              </div>
            </div>
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <FaHeart className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedUser.currentLikeCount}</h4>
                <small> پسندیدن </small>
              </div>
            </div>
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Star className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedUser.currentRate}</h4>
                <small> امتیاز </small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <BiSolidComment className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedUser.commentsCount}</h4>
                <small>کامنت</small>
              </div>
            </div>
          </div>
          <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="f-semibold  me-25"> وضعیت:</span>
                <span className="f-bold font16 m-start-2 text-primary  ">
                  {selectedUser.active === true ? "فعال" : "غیر فعال"}
                </span>
              </li>
              <li className="mb-75">
                <span className="f-semibold  me-25"> نویسنده مقاله:</span>
                <span className="f-bold font16 m-start-2 text-primary  ">
                  {selectedUser.addUserFullName}
                </span>
              </li>
              <li className="mb-75">
                <span className="f-semibold  me-25">تاریخ انتشار :</span>
                <span>{makeDatePersian(selectedUser.insertDate)}</span>
              </li>
              <li className="mb-75">
                <span className="f-semibold  me-25">
                  تاریخ آخرین بروز رسانی :
                </span>
                <span>{makeDatePersian(selectedUser.updateDate)}</span>
              </li>

              <li className="mb-75">
                <span className="f-semibold me-25">دسته بندی:</span>
                {selectedUser.newsCatregoryName}
                {/* {selectedUser.courseTeches.map((items, index) => {
                  return (
                    <Badge
                      className="fw-normal"
                      key={index}
                      color={"light-primary"}
                    >
                      {items}
                    </Badge>
                  );
                })} */}
              </li>
              <li className="mb-75">
                <span className="f-semibold me-25">کلمات کلیدی:</span>
                {selectedUser.keyword}
              </li>
              <li className="mb-75">
                <span className="me-25"> متن کوتاه:</span>
                <span className="text-capitalize">
                  <p className="text-body-tertiary">
                    {" "}
                    {selectedUser.miniDescribe}
                  </p>
                </span>
              </li>
            </ul>
          </div>

          <div className="d-flex justify-content-center pt-2">
            <Button
              color="primary"
              className="w-25"
              onClick={() => navigate(`/EditNews/${params}`)}
            >
              ویرایش
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default NewsInfoCard;
