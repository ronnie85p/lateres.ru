import React from "react";
import * as icons from "react-bootstrap-icons";
import { ucfirst } from "@js/funcs/utils";

export default (props) => {
  let name = ucfirst(props.name?.toLowerCase());

  if (name.indexOf("-") !== -1) {
    let names = name.split("-");

    name = names[0];
    for (let i = 1; i < names.length; i++) {
      name += ucfirst(names[i]);
    }
  }

  const BootstrapIcon = icons[name];
  return <BootstrapIcon className="mb-1" {...props} />;
};
