// ** React Imports
import { useState } from "react";

// ** Third Party Components
import classnames from "classnames";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Label,
} from "reactstrap";

const TextareaCounter = ({ name, text, ...rest }) => {
  const [value, setValue] = useState("");

  return (
    <Card
      style={{
        background: "inherit",
        boxShadow: "none",
      }}
    >
      <CardBody
        style={{
          width: "100%",
          padding: "0",
          background: "inherit",
          boxShadow: "none",
        }}
      >
        <Label className="form-label" htmlFor={name}>
          {text}
        </Label>
        <Input
          lg="12"
          name={name}
          value={value}
          type="textarea"
          id={name}
          style={{ minHeight: "100px", background: "inherit" }}
          onChange={(e) => setValue(e.target.value)}
          className={classnames({ "text-danger": value.length > 300 })}
          max={300}
          {...rest}
        />
        <span
          className={classnames("textarea-counter-value float-end", {
            "bg-danger": value.length > 300,
          })}
        >
          {`${value.length}/300`}
        </span>
      </CardBody>
    </Card>
  );
};
export default TextareaCounter;
