import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Aside = (props) => {
  const { children } = props;

  return <Row className="aside">{children}</Row>;
};

Aside.Menu = (props) => {
  const { children } = props;

  return (
    <Col className="aside-menu" md={3}>
      {children}
    </Col>
  );
};

Aside.Content = (props) => {
  const { children } = props;

  return (
    <Col className="aside-content" md={9}>
      {children}
    </Col>
  );
};

export default Aside;
