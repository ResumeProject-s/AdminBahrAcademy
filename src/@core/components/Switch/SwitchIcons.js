// ** Icons Imports
import { Check, CloudLightning, X } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Input,
  Label,
} from "reactstrap";

// const CustomLabel = ({ htmlFor }) => {
//   return (
//     <Label className="form-check-label" htmlFor={htmlFor}>
//       <span className="switch-icon-left">
//         <Check size={14} />
//       </span>
//       <span className="switch-icon-right">
//         <X size={14} />
//       </span>
//     </Label>
//   );
// };

const SwitchIcons = ({ name, isToggle, setIsToggle, switchText }) => {
  return (
    <Card>
      <CardBody>
        <div className="demo-inline-spacing">
          <div className="d-flex flex-column">
            <div
              style={{ width: "300px" }}
              className="form-switch form-check-primary d-flex "
            >
              <p>{switchText}</p>
              <Input
                style={{ width: "50px", marginRight: "20px" }}
                type="switch"
                checked={isToggle === true ? true : false}
                onChange={(e) => setIsToggle(!isToggle)}
                id={name}
                name={name}
              />
              {/* <CustomLabel htmlFor="icon-primary" /> */}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default SwitchIcons;
