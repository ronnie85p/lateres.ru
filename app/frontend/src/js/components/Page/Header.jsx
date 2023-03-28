import React from "react";
import { Link } from "react-router-dom";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import Container from "./Container";
import Catalog from "./Header/Catalog";
import Logo from "./Header/Logo";
import Search from "./Header/Search";
import Phone from "./Header/Phone";

const Header = (props) => {
  return (
    <>
      <header className="site-header mb-4 bg-white shadow-sm p-2 pt-3 sticky-top">
        <Container className="d-flex justify-content-between_">
          <div className="d-flex align-items-center mr-4">
            <Logo />
          </div>

          <div className="d-flex align-items-center mr-2">
            <Catalog />
          </div>

          <div className="d-flex align-items-center flex-fill mr-4">
            <Search />
          </div>

          <div className="d-flex align-items-center mr-4">
            <Phone />
          </div>

          <ActionLinks>
            <ActionLink to="/lk/favorites" title="Избранное" iconName="heart" />
            <div className="border-end"></div>
            <ActionLink to="/cart" title="Корзина" iconName="cart" />
          </ActionLinks>
        </Container>
      </header>
    </>
  );
};

const ActionLinks = (props) => {
  const { children } = props;
  return <div className="d-flex">{children}</div>;
};

const ActionLink = (props) => {
  const { to, title, iconName } = props;

  return (
    <>
      <Link
        to={to}
        title={title}
        className="d-flex justify-content-center align-items-center position-relative"
        style={{ width: 75 }}
      >
        <Icon size="1.7em" name={iconName} />
      </Link>
    </>
  );
};

export default Header;
