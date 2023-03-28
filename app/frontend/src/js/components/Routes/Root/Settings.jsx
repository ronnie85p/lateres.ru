import React from "react";
import { Outlet, useLoaderData, Link, useLocation } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Profile from "@js/components/Page/Profile";
import Container from "@js/components/Page/Container";
import Aside from "@js/components/Page/Aside";
import Menu from "@js/components/Page/Menu";
import Icon from "@js/components/Icon";
import Button from "@js/components/Form/Button";

export default (props) => {
  const context = React.useContext(Context);
  const [data] = useLoaderData();
  const location = useLocation();

  return (
    <Context.Provider value={{ ...context, data }}>
      <Container className="container-profile">
        <Aside>
          <Aside.Menu>
            <Button
              as={Link}
              to="/lk/profile"
              variant="outline-secondary"
              className="mb-4"
            >
              <Icon name="chevron-left" /> Профиль
            </Button>
            <Menu>
              <Menu.Title>Настройки</Menu.Title>
              <Menu.List>
                {data.menu.map((item) => (
                  <Menu.Item
                    key={item.id}
                    to={`/${item.uri}`}
                    className={
                      location.pathname === `/${item.uri}` ? "active" : ""
                    }
                  >
                    {item.pagetitle}
                  </Menu.Item>
                ))}
              </Menu.List>
            </Menu>
          </Aside.Menu>
          <Aside.Content>
            <Outlet />
          </Aside.Content>
        </Aside>
      </Container>
    </Context.Provider>
  );
};
