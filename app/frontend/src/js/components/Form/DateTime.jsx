import React from "react";
import Form from "react-bootstrap/Form";

export default (props) => {
  return <Form.Control {...props} type="datetime-local" />;
};
