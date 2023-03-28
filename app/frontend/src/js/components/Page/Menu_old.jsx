import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";

const Menu = (props) => {
  const { menu } = props;
  const location = useLocation();

  const activeClasses = " bg-primary text-white";

  return (
    <Nav className="flex-column">
      {menu.map((item) => (
        <Nav.Link
          key={item.id}
          as={Link}
          to={`/${item.uri}`}
          className={
            "rounded" +
            (`/${item.uri}` === location.pathname ? activeClasses : "")
          }
        >
          {item.pagetitle}
        </Nav.Link>
      ))}
    </Nav>
  );
};

export default Menu;
