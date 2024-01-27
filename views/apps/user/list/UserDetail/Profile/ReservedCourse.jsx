// ** Custom Components
import Avatar from "@components/avatar";
import { left } from "@popperjs/core";

// ** Third Party Components
import classnames from "classnames";
import { UserPlus } from "react-feather";
import { TiTick } from "react-icons/ti";

// ** Reactstrap Imports
import { Card, CardBody, Button } from "reactstrap";

const ReservedCourse = ({ data }) => {
  const renderSuggestion = () => {
    return data.coursesReseves.map((course, index) => {
      return (
        <div
          key={index}
          className={classnames("d-flex  align-items-center relative", {
            "mt-2": index === 0,
            "mt-1": index !== 0,
          })}
        >
          <div className="profile-user-info mt-1">
            <h6 className="mb-0">{course.courseName}</h6>
          </div>
          <div style={{ position: "absolute", left: "0", padding: "1px" }}>
            <TiTick size={25} color="green" />
          </div>
        </div>
      );
    });
  };

  return (
    <Card>
      <CardBody>
        <h5>دوره های رزرو شده</h5>
        {renderSuggestion()}
      </CardBody>
    </Card>
  );
};

export default ReservedCourse;
