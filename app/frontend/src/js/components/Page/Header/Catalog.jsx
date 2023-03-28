import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";

export default (props) => {
  const { config } = useContext(Context);

  return (
    <Dropdown className="catalog">
      <Dropdown.Toggle className="dropdown-toggle">
        <Icon name="list" /> Категории
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {config.categories?.map((item) => (
          <Dropdown.Item
            as={Link}
            key={item.id}
            to={item.uri}
            title={item.pagetitle}
          >
            {item.pagetitle}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
