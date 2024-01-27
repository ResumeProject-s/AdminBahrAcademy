// ** Reactstrap Imports
import { useSearchParams } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Card,
  Label,
  Input,
  Button,
  CardBody,
} from "reactstrap";
import AddNewGroupe from "../../../../Services/Api/CourseDetailsAdmin/AddNewGroupe";
import ToastSuccess from "../../../../Services/Api/common/react-hot-toasts/ToastSuccess";
import ToastError from "../../../../Services/Api/common/react-hot-toasts/ToastError";

const AddModalGroupForm = () => {
  const [paramas] = useSearchParams();
  const cId = paramas.get("CourseId");
  const submitHandler = async (e) => {
    e.preventDefault();
    const smapleObj = {
      GroupName: e.target.groupeName.value,
      CourseId: cId,
      GroupCapacity: e.target.groupeCapacity.value,
    };
    const res = await AddNewGroupe(smapleObj);
    if (res.success) {
      ToastSuccess("افزودن گروه با موفقیت انجام شد.");
    } else {
      ToastError(res.message);
    }
  };
  return (
    <div style={{ width: "400px" }}>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col sm="12" className="mb-1">
            <Label className="form-label" for="groupeName">
              نام گروه
            </Label>
            <Input type="text" name="groupeName" id="groupeName" />
          </Col>
          <Col sm="12" className="mb-1">
            <Label className="form-label" for="groupeCapacity">
              ظرفیت گروه
            </Label>
            <Input type="number" name="groupeCapacity" id="groupeCapacity" />
          </Col>
          <Col sm="12">
            <div className="d-flex">
              <Button className="me-1" color="primary" type="submit">
                افزودن گروه جدید
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
      <div style={{ marginTop: "30px", fontSize: "13px" }}>
        دقت گروه برای دوره ایی که در آن می باشید ایجاد خواهد شد**
      </div>
    </div>
  );
};
export default AddModalGroupForm;
