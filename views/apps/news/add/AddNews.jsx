import React from "react";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import WizardHorizontal from "./AddNewsWizardHorizontal";

const AddNews = () => {
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

export { AddNews };
