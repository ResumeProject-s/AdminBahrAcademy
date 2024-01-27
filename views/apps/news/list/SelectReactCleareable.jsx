import Select from "react-select";
import { Col, Label } from "reactstrap";
import { selectThemeColors } from "@utils";

const SelectReactCleareable = ({
  optList,
  setData,
  selectReactCleareableClassName,
}) => {
  return (
    <Col className="mb-1" lg="6" md="6" sm="12">
      <Select
        theme={selectThemeColors}
        className={`${selectReactCleareableClassName} react-select`}
        classNamePrefix="select"
        name="clear"
        options={optList}
        onChange={setData}
        placeholder="انتخاب کنید"
        isClearable
      />
    </Col>
  );
};

export { SelectReactCleareable };
