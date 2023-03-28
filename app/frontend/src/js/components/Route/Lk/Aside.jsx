import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Menu from "./Aside/Menu";
import Content from "./Aside/Content";
import Avatar from "./Aside/Avatar";

const Aside = (props) => {
  const { children } = props;

  return <Row {...props}>{children}</Row>;
};

Aside.Menu = (props) => {
  const { items, children } = props;

  return (
    <>
      <Col md={3} {...props}>
        <Avatar className="mb-1x" {...props} />

        <Menu items={items} />
      </Col>
    </>
  );
};

Aside.Content = (props) => {
  const { children, title } = props;

  return (
    <>
      <Col md={9}>
        <div className="h4">{title}</div>
        <hr />
        <Content {...props}>{children}</Content>
      </Col>
    </>
  );
};

export default Aside;
