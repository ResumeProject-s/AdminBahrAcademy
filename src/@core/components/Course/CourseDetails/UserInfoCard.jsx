// ** React Imports
import { useState, Fragment } from "react";
import { Card, CardBody, Button, Badge } from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@styles/react/libs/react-select/_react-select.scss";

const roleColors = {
  مقدماتی: "light-info",
  متوسط: "light-danger",
  پیشرفته: "light-warning",
};

const MySwal = withReactContent(Swal);

import SampleImage from "./../../../../assets/images/sampleImage.png";
import { FaHeart } from "react-icons/fa";
import { BiSolidComment } from "react-icons/bi";
import { ThreeNumberSpiliter } from "../../../Services/Api/common/ThreeNumberSpiliter";
import { makeDatePersian } from "../../../Services/Api/common/MakeDatePersian";
import { EditModal } from "../EditCourses/EditModal";
import GroupeModal from "../AddNewGroupeModal/GroupeModal";

const UserInfoCard = ({ selectedUser }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const renderUserImg = () => {
    const imgLogic = selectedUser && selectedUser.imageAddress;

    return (
      <img
        height="150"
        width="150"
        alt="user-avatar"
        src={
          selectedUser.imageAddress ? selectedUser.imageAddress : SampleImage
        }
        className="img-fluid rounded mt-3 mb-2"
      />
    );
  };
  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
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
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <FaHeart className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedUser.courseCommentTotal}</h4>
                <small> کامنت </small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <BiSolidComment className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedUser.courseLikeTotal}</h4>
                <small>لایک</small>
              </div>
            </div>
          </div>
          <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="f-semibold  me-25"> هزینه ی دوره:</span>
                <span className="f-bold font16 m-start-2">
                  {ThreeNumberSpiliter(selectedUser.cost)}
                </span>
              </li>
              <li className="mb-75">
                <span className="f-semibold  me-25">استاد دوره:</span>
                <span>{selectedUser.teacherName}</span>
              </li>
              <li className="mb-75">
                <span className="f-semibold me-25"> نوع دوره :</span>
                <span>{selectedUser.courseTypeName}</span>
              </li>
              <li className="mb-75">
                <span className="f-semibold me-25">دسته بندی:</span>
                {selectedUser.courseTeches.map((items, index) => {
                  return (
                    <Badge
                      className="fw-normal"
                      key={index}
                      color={"light-primary"}
                    >
                      {items}
                    </Badge>
                  );
                })}
              </li>
              <li className="mb-75">
                <span className="f-semibold me-25"> تاریخ شروع :</span>
                <span>{makeDatePersian(selectedUser.startTime)}</span>
              </li>
              <li className="mb-75">
                <span className="f-semibold me-25"> تاریخ پایان :</span>
                <span>{makeDatePersian(selectedUser.endTime)}</span>
              </li>
            </ul>
          </div>

          <div className="d-flex justify-content-center pt-2 gap-1">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش
            </Button>
            <Button color="primary" onClick={() => setShow2(true)}>
              مدیریت گروه
            </Button>

            {/* <Button
              className="ms-1"
              color="danger"
              outline
              onClick={handleSuspendedClick}
            >
              غیر فعال کردن دوره
            </Button> */}
          </div>
        </CardBody>
      </Card>
      <EditModal data={selectedUser} Showing={show} settingsShow={setShow} />
      <GroupeModal Showing={show2} settingsShow={setShow2} />
    </Fragment>
  );
};

export default UserInfoCard;
