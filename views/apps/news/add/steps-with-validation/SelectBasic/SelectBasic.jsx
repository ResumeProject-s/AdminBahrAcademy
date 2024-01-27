import Select from "react-select";
import { Col, Label } from "reactstrap";
import { selectThemeColors } from "@utils";

const SelectBasic = ({ opt, changeHandler, text, name }) => {
  return (
    <Col>
      <Label style={{ fontSize: "15px" }} className={name}>
        {text}
      </Label>
      <Select
        id={name}
        name={name}
        theme={selectThemeColors}
        className="react-select"
        classNamePrefix="select"
        // defaultValue={opt[0]}
        options={opt}
        isClearable={false}
        onChange={changeHandler}
      />
    </Col>
  );
};

export default SelectBasic;
