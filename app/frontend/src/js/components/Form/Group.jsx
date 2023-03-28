import React from "react";
import Form from "react-bootstrap/Form";

const Group = (props) => {
  const { children } = props;

  return (
    <>
      <Form.Group className="form-group" {...props}>
        {children}
      </Form.Group>
    </>
  );
};

export default Group;
