import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PanelActions = (props) => {
  const { children } = props;

  return (
    <>
      <Row className="mb-4" {...props}>
        {children}
      </Row>
    </>
  );
};

const PanelAction = (props) => {
  const { children } = props;

  return (
    <>
      <Col {...props}>{children}</Col>
    </>
  );
};

export { PanelActions, PanelAction };
