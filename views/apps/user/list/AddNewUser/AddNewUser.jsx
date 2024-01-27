import { Button, Col, Row } from "reactstrap";
import WizardHorizontal from "./AddNewUserWizardHorizontal/AddNewUserWizardHorizontal";
// import WizardHorizontal from "./AddNewCourseWizardHorizontal/AddNewCourseWizardHorizontal";

const AddNewUser = () => {
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

export default AddNewUser;
