import React, { useEffect, useState } from "react";
import { sendRequest } from "../Request";
import Catalog from "./Catalog";

const Context = React.createContext(null);

const pushHistory = (url) => {
  window.history.pushState({}, "", url);
};

const getContent = async (action, route, context) => {
  context.setResponse({ state: "pending" });
  //   context.response = { state: "pending" };
  const response = await sendRequest(action, { uri: route });
  response.route = route;
  //   context.response = response;
  //   console.log("response", context.response);
  context.setResponse(response);
};

export function Link(props) {
  const context = React.useContext(Context);
  const { to, children, Component } = props;

  context.Component = Component;

  const _props = props;

  const handleClick = async (event) => {
    event.preventDefault();

    const url = new URL(event.currentTarget.href);
    pushHistory(url);
    getContent("web/resource/get", url.pathname, context);
  };

  return (
    <a {..._props} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

var loaded = false;

export function Route(props) {
  const { children } = props;
  const [response, setResponse] = useState(null);
  const context = {
    response,
    setResponse,
  };

  const state = false;

  useEffect(() => {
    const url = new URL(window.location.href);
    // console.log("effect");
    if (!loaded) {
      getContent("web/resource/get", url.pathname, context);
      loaded = true;
    }
  }, [loaded]);

  return (
    <>
      <Context.Provider value={context}>{children}</Context.Provider>
    </>
  );
}

export function Outlet() {
  const { response, Component } = React.useContext(Context);

  if (response?.state === "pending") {
    return <p>Pending...</p>;
  }

  if (response?.data?.success) {
    return <Catalog {...response} />;
    return typeof Component === "function" ? (
      <Component {...response} />
    ) : (
      <RouteComponent path={response.route} response={response?.data} />
    );
  }

  return <></>;
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
