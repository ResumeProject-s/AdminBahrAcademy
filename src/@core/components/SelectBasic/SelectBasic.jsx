import Select from "react-select";
import { Col, Label } from "reactstrap";
import { selectThemeColors } from "@utils";

const SelectBasic = ({ opt, changeHandler, text, name, defaultVal }) => {
  return (
    <Col>
      <Label className={name}>{text}</Label>
      <Select
        id={name}
        name={name}
        theme={selectThemeColors}
        className="react-select"
        classNamePrefix="select"
        defaultValue={defaultVal}
        options={opt}
        isClearable={false}
        onChange={changeHandler}
      />
    </Col>
  );
};

export default SelectBasic;
