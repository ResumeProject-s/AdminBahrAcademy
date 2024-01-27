// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import classnames from "classnames";
import { UserPlus } from "react-feather";

// ** Reactstrap Imports
import { Card, CardBody, Button } from "reactstrap";

const ProfileUsersCourse = ({ data }) => {
  const renderSuggestion = () => {
    return data.courses.map((course, index) => {
      return (
        <div
          key={index}
          className={classnames(
            "d-flex justify-content-start align-items-center",
            {
              "mt-2": index === 0,
              "mt-1": index !== 0,
            }
          )}
        >
          <Avatar
            className="me-75"
            img={course.tumbImageAddress}
            imgHeight="35"
            imgWidth="35"
          />
          <div className="profile-user-info">
            <h6 className="mb-0">{course.title}</h6>
            {/* <small className="text-muted">{course.describe}</small> */}
          </div>
        </div>
      );
    });
  };

  return (
    <Card>
      <CardBody>
        <h5>دوره های کاربر</h5>
        {renderSuggestion()}
      </CardBody>
    </Card>
  );
};

export default ProfileUsersCourse;
