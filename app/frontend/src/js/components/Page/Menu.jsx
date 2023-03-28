import React from "react";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const { children } = props;
  return <div className="menu">{children}</div>;
};

Menu.Title = (props) => {
  const { children } = props;
  return (
    <div className="h5" {...props}>
      {children}
    </div>
  );
};

Menu.List = (props) => {
  const { children } = props;
  return (
    <ul className="page-menu list-unstyled" {...props}>
      {children}
    </ul>
  );
};

Menu.Item = (props) => {
  const { to, children } = props;
  return (
    <li className="page-item">
      <Link {...props}>{children}</Link>
    </li>
  );
};

export default Menu;
