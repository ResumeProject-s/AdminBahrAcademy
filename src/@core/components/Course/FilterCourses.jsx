import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
} from "reactstrap";
import { selectThemeColors } from "@utils";

export function FilterCourses() {
  const courseType = [
    { value: "آنلاین", label: "آنلاین" },
    { value: "آفلاین", label: "آفلاین" },
  ];

  return (
    <Row>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>فیلتر کردن داده ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className="mb-1" lg="4" md="6" sm="12">
              <Label className="form-label">نوع دوره</Label>
              <Select
                selectThemeColors={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                defaultValue={courseType[0]}
                options={courseType}
                isClearable={false}
              />
            </Col>

            <Col className="mb-1" lg="4" md="6" sm="12">
              <Label className="form-label">vv </Label>
              <Select
                selectThemeColors={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                defaultValue={courseType[0]}
                options={courseType}
                isClearable={false}
              />
            </Col>

            <Col className="mb-1" lg="4" md="6" sm="12">
              <Label className="form-label">ssc </Label>
              <Select
                selectThemeColors={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                defaultValue={courseType[0]}
                options={courseType}
                isClearable={false}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Row>
  );
}
