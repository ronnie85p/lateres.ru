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

const Lk = (props) => {
  const context = useContext(Context);

  const items = [
    {
      id: 1,
      uri: "lk/profile",
      menutitle: "Профиль",
    },
    {
      id: 2,
      uri: "lk/orders",
      menutitle: "Мои заказы",
    },
    {
      id: 3,
      uri: "lk/addresses",
      menutitle: "Мои адреса",
    },
    {
      id: 4,
      uri: "lk/companies",
      menutitle: "Мои компании",
    },
    {
      id: 5,
      uri: "lk/contacts",
      menutitle: "Мои контакты",
    },
  ];

  const url = new URL(document.location.href);
  const path = url.pathname.replace(/^\//, "");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root items={items} />,
      errorElement: (error) => <>{error.message}</>,
      children: [
        ...getRoutes(items),
        // getRoute("lk/profile/passport"),
        {
          path: "lk",
          index: true,
          element: <>Index</>,
        },
        {
          path: "*",
          element: getElement(() => getLocationPath()),
          loader: getLoader(({ request }) => getLocationPath(request.url)),
        },
      ],
    },
  ]);

  return (
    <>
      <Profile>
        <RouterProvider router={router} />
      </Profile>
    </>
  );
};

const Root = (props) => {
  const { items } = props;

  return (
    <>
      <Profile.Menu items={items} />
      <Profile.Content>
        <Outlet />
      </Profile.Content>
    </>
  );
};

const getLocationPath = (href = window.location.href) => {
  const url = new URL(href);

  return url.pathname.replace(/^\//, "");
};

const getElement = (path) => {
  const Element = React.lazy(() => {
    path = typeof path === "function" ? path() : path;
    console.log("[getElement][path]", path);
    return import(`@js/routes/${path}`);
  });

  return (
    <React.Suspense>
      <Element />
    </React.Suspense>
  );
};

const getLoader = (path) => {
  return async function (props) {
    try {
      path = typeof path === "function" ? path(props) : path;
      console.log("[getLoader]", { path });
      let module = require(`@js/loaders/${path}`);

      return await module.default(props);
    } catch (e) {
      console.log("e", e);
      return new Response({
        statusText: e.message,
      });
    }
  };
};

const getRoute = (path, element, loader) => {
  return {
    path,
    element: element || getElement(path),
    loader: loader || getLoader(path),
  };
};

const getRoutes = (items) => {
  let routes = [];
  for (let i in items) {
    let item = items[i];
    let route = getRoute(`${item.uri}`);

    routes.push(route);
  }

  console.log("routes", routes);

  return routes;
};

export default Lk;
