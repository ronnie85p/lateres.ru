import React from "react";
import Form from "react-bootstrap/Form";

export default (props) => {
  const { children, height } = props;

  return (
    <Form.Control {...props} style={{ height, ...props.style }} as="textarea">
      {children}
    </Form.Control>
  );
};
