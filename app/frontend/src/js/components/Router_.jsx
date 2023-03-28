import React from "react";
import { ucfirst } from "@js/funcs/utils";

export function Router_(props) {
  const url = new URL(location.href);

  const paths = [];
  for (let _path of url.pathname.split("/")) {
    _path = _path.trim();
    if (_path) {
      if (_path.indexOf("-") !== -1) {
        let ___path = [];
        for (let __path of _path.split("-")) {
          __path = __path.trim();
          if (__path) {
            ___path.push(ucfirst(__path.toLowerCase()));
          }
        }

        _path = ___path.join("");
      } else {
        _path = _path.toLowerCase();
      }

      paths.push(ucfirst(_path));
    }
  }

  const route = paths.join("/");
  var Component;

  try {
    console.log("route", route);
    // Component = require(`./Route/${route}`).default;
  } catch (e) {}

  return Component ? <Component {...props} /> : "No component";
}

export function RouteComponent(props) {
  const { path } = props;

  var _path = path ? path : "/index";
  var Component = null;

  try {
    Component = require(`@js/routes${_path}`).default;
  } catch (e) {
    throw new Error("Not found");
  }

  return <Component {...props} />;
}
