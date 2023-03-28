import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "./Container";

const Aside = (props) => {
  const { children, className } = props;

  return (
    <>
      <div {...props} className={"dashboard-aside " + (className || "")}>
        <Container
          className="d-flex align-items-stretch"
          style={{ minHeight: "100vh" }}
        >
          <Row className="flex-fill">{children}</Row>
        </Container>
      </div>
    </>
  );
};

const Menu = (props) => {
  const { children, className } = props;

  return (
    <>
      <Col
        md={2}
        {...props}
        className={"dashboard-aside-menu " + (className || "")}
      >
        <div className="mt-1x mb-1x">{children}</div>
      </Col>
    </>
  );
};

const Content = (props) => {
  const { children, className } = props;

  return (
    <>
      <Col
        {...props}
        className={"dashboard-aside-content bg-white " + (className || "")}
      >
        <div className="mt-1x mb-1x">{children}</div>
      </Col>
    </>
  );
};

Aside.Menu = Menu;
Aside.Content = Content;

export default Aside;
