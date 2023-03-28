import React from "react";
import Image from "react-bootstrap/Image";

const Item = (props) => {
  const { url, pagetitle } = props;

  return (
    <li>
      <a href={url}>{pagetitle}</a>
    </li>
  );
};

export default (props) => {
  const { items = [] } = props;

  return (
    <>
      <div className="profile-menu">
        <ul className="list-unstyled">
          {items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </ul>
      </div>
    </>
  );
};
