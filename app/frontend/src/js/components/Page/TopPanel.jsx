import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";

import Container from "./Container";
import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import ProfileMenu from "./ProfileMenu";

const TopPanel = (props) => {
  const { config } = useContext(Context);
  const { items } = config?.topPanel || {};

  return (
    <div className="site-top-nav" style={{ background: "#ffd34e" }}>
      <Container className="d-flex py-2">
        <div className="flex-fill d-flex align-items-center">
          <ul className="list-unstyle list-inline m-0">
            {items?.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <Link
                  className="text-decoration-none"
                  style={{ color: "#5c4500" }}
                  to={item.url}
                  title={item.pagetitle}
                >
                  {item.pagetitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* <div className="d-flex align-items-center">
          {config?.user?.isAuth ? (
            <>
              <Dropdown align="end">
                <Dropdown.Toggle size="sm" variant="">
                  <Icon name="person-circle" size="1.2em" /> Профиль
                </Dropdown.Toggle>

                <ProfileMenu />
              </Dropdown>
            </>
          ) : (
            <Link to="/login" className="text-decoration-none" title="Вход">
              <Icon name="box-arrow-in-right" size={"1.4em"} />
            </Link>
          )}
        </div> */}
      </Container>
    </div>
  );
};

export default TopPanel;
