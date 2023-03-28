import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";

import Container from "./Container";

const Profile = (props) => {
  const { children } = props;

  return (
    <>
      <Container>
        <Row>{children}</Row>
      </Container>
    </>
  );
};

const Menu = (props) => {
  const { children, items } = props;

  return (
    <>
      <Col md={3}>
        <Avatar className="mb-4" />

        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Link to={item.uri} title={item.menutitle}>
                {item.menutitle}
              </Link>
            </li>
          ))}
        </ul>

        {children}
      </Col>
    </>
  );
};

const Content = (props) => {
  const { children } = props;

  return (
    <>
      <Col md={9}>
        <Outlet />
      </Col>
    </>
  );
};

const Title = (props) => {
  const { children, subtext } = props;

  return (
    <>
      <h1 className="h4 m-0" style={{ fontWeight: 500 }}>
        {children}
      </h1>
      {subtext ? (
        <>
          <div className="text-muted">{subtext}</div>
        </>
      ) : (
        <></>
      )}
      <hr className="mt-2 mb-1x" />
    </>
  );
};

const Avatar = (props) => {
  const { className } = props;

  return (
    <>
      <div className={"profile-avatar " + className}>
        <Card style={{ border: "1px solid #ededed" }}>
          <Card.Body className="d-flex">
            <Image
              src={"/assets/imgs/user/user-ava.jpg"}
              roundedCircle
              width={100}
            />

            <div className="flex-fill">
              <p className="fw-bolder text-center">Ronnie Kaufman</p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

const PanelActions = (props) => {
  const { children } = props;

  return (
    <>
      <Row className="mb-2" {...props}>
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

Profile.Menu = Menu;
Profile.Content = Content;
Profile.Title = Title;
Profile.PanelAction = PanelAction;
Profile.PanelActions = PanelActions;

export default Profile;
