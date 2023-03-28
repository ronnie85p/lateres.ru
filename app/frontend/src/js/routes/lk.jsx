import React, { useEffect, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigation,
  useLocation,
  useHref,
} from "react-router-dom";

import Context from "@js/contexts/context";
import Profile from "@js/components/Page/Profile";
import { sendRequest } from "@js/components/Request";

const Index = (props) => {
  const context = useContext(Context);

  return <>Index</>;
};

export default Index;
