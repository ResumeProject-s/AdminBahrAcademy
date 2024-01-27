import { Col, Row } from "reactstrap";
import WizardHorizontal from "./AddNewCourseWizardHorizontal/AddNewCourseWizardHorizontal";

const AddNewCourse = () => {
  return (
    <div>
      <Row>
        <Col sm="12">
          <WizardHorizontal />
        </Col>
      </Row>
    </div>
  );
};

export default AddNewCourse;
// AddNewCourseDataNeeded
