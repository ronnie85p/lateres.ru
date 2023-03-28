import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
  useNavigation,
  useLocation,
} from "react-router-dom";

import Context from "./contexts/context";
import LazyElement from "./components/LazyElement";
import { getRoutes, RouteElement } from "./components/Routes";
import { sendRequest } from "./components/Request";
import { getLoader } from "./components/Routes";
import Preloader from "./components/Preloader";

const Root = () => import("@js/components/Routes/Root");
const ContactsRoot = () => import("@js/components/Routes/Root/Contacts");
const FactoryRoot = () => import("@js/components/Routes/Root/Factory");
const CatalogRoot = () => import("@js/components/Routes/Root/Catalog");
const ProductRoot = () => import("@js/components/Routes/Root/Product");
const ProfileRoot = () => import("@js/components/Routes/Root/Profile");
const SettingsRoot = () => import("@js/components/Routes/Root/Settings");

const rootRoutes = getRoutes([
  "/services",
  "/login",
  "/register",
  "/cart",
  "/ordering",
]);
const contactsRoutes = getRoutes([
  "/contacts/address",
  "/contacts/support",
  "/contacts/collaboration",
  "/contacts/wholesales",
  "/contacts/office",
  "/contacts/press",
]);

const factoryRoutes = getRoutes([
  "/factory/certs",
  "/factory/custom",
  "/factory/colors",
  "/factory/anypay",
  "/factory/delivery",
  "/factory/research",
  "/factory/return",
]);

const profileRoutes = getRoutes([
  "/lk/profile",
  "/lk/orders",
  "/lk/order",
  "/lk/order/success",
  "/lk/addresses",
  "/lk/address/edit",
  "/lk/address/new",
  "/lk/contacts",
  "/lk/favorites",
]);

const settingsRoutes = getRoutes([
  "/lk/settings/login",
  "/lk/settings/sessions",
  "/lk/settings/password",
]);

const catalogRoutes = getRoutes(["*"]);

const noMatchRoute = {
  path: "*",
  element: <>Not found</>,
};

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return <>Error</>;
};

const App = (props) => {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: getConfig,
      element: <LazyElement from={Root} />,
      errorElement: <ErrorPage />,
      children: [
        ...rootRoutes,
        // {
        //   path: "catalog/*",
        //   element: <CatalogElement />,
        //   loader: getCatalogLoader,
        // },
        {
          path: "catalog/",
          element: <LazyElement from={CatalogRoot} />,
          loader: async (props) => {
            const result = await getLoader({ ...props, path: "catalog" });
            return result;
          },
          children: [
            {
              path: "*",
              element: <RouteElement path="catalog/category" />,
            },
            noMatchRoute,
          ],
        },
        {
          path: "factory/",
          element: <LazyElement from={FactoryRoot} />,
          children: [...factoryRoutes, noMatchRoute],
        },
        {
          path: "contacts/",
          element: <LazyElement from={ContactsRoot} />,
          children: [...contactsRoutes, noMatchRoute],
        },
        {
          path: "lk/",
          element: <LazyElement from={ProfileRoot} />,
          children: [...profileRoutes, noMatchRoute],
        },
        {
          path: "lk/settings/",
          loader: async (props) =>
            await getLoader({ ...props, path: "lk/settings" }),
          element: <LazyElement from={SettingsRoot} />,
          children: [...settingsRoutes, noMatchRoute],
        },
      ],
    },
  ]);

  return (
    <Context.Provider value={{ config: { categories: [] } }}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
};

const getConfig = async () => {
  const { object } = await sendRequest("web/config/get");
  return object || {};
};

const CatalogElement = () => {
  const location = useLocation();
  console.log("location", location);
  const from = /\/$/.test(location.pathname) ? CatalogRoot : ProductRoot;

  return <LazyElement from={from} />;
};

const getCatalogLoader = (props) => {
  const { request } = props;
  const url = new URL(request.url);
  const path = /\/$/.test(url.pathname) ? "catalog" : "product";

  return getLoader({ ...props, path });
};

export default App;
