import React from "react";
import Form from "react-bootstrap/Form";

export default (props) => {
  const { children, className, col } = props;

  let _className = className || "";
  _className += col ? ` col-form-label col-${col}` : "";

  return (
    <Form.Label {...props} className={_className}>
      {children}
    </Form.Label>
  );
};
