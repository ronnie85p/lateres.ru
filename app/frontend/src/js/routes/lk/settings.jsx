import React from "react";
import { useLoaderData } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";

const menuItems = [
  {
    id: 1,
    uri: "/lk/settings/password",
    menutitle: "Изменить пароль",
  },
  {
    id: 2,
    uri: "/lk/settings/login",
    menutitle: "Настройки входа",
  },
  {
    id: 3,
    uri: "/lk/settings/logins",
    menutitle: "История посещений",
  },
];

export default () => {
  const context = React.useContext(Context);
  const [resource] = useLoaderData();

  return (
    <Context.Provider value={{ ...context, resource, menuItems }}>
      <Title>
        <Title.Text>{resource.pagetitle}</Title.Text>
      </Title>

      <Content />
    </Context.Provider>
  );
};

const Content = () => {
  const { resource } = React.useContext(Context);

  return (
    <Layer>
      <Row>
        <Col md={4}>
          <Menu />
        </Col>
        <Col></Col>
      </Row>
    </Layer>
  );
};

const Menu = (props) => {
  const { resource, menuItems } = React.useContext(Context);

  return (
    <ul className="list-unstyled">
      {menuItems.map((item) => (
        <MenuItem key={item.id} {...item} />
      ))}
    </ul>
  );
};

const MenuItem = (props) => {
  const { pagetitle } = props;

  return <li>{pagetitle}</li>;
};
