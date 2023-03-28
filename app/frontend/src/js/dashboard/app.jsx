import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Context from "@js/contexts/context";
import LazyElement from "@js/components/LazyElement";
import { getRoutes } from "@js/components/Routes";
import { sendRequest } from "@js/components/Request";

const Root = () => import("@js/dashboard/containers/root");
// const ProductsRoot = () => import("@js/dashboard/containers/products");
// const OrdersRoot = () => import("@js/dashboard/containers/orders");

const rootRoutes = getRoutes([
  //   "/dashboard/profile",
  //   "/dashboard/settings",
  "/dashboard/orders",
  "/dashboard/services",
  "/dashboard/announces",
  "/dashboard/news",
  "/dashboard/reviews",
  "/dashboard/payments",
  "/dashboard/category",
  "/dashboard/category/create",
  "/dashboard/category/edit",
  "/dashboard/categories",
  "/dashboard/fabricator",
  "/dashboard/fabricator/edit",
  "/dashboard/fabricator/create",
  "/dashboard/fabricators",
  "/dashboard/trademark/edit",
  "/dashboard/trademark/create",
  "/dashboard/orders",
  "/dashboard/order",
  "/dashboard/order/edit",
  "/dashboard/order/create",
]);

// const productsRoutes = getRoutes([
//   "/dashboard/balance/products",
//   "/dashboard/balance/stories",
//   "/dashboard/balance/product/create",
//   "/dashboard/balance/product/edit",
// ]);

// const ordersRoutes = getRoutes([
//   "/dashboard/orders/order/create",
//   "/dashboard/orders/order/edit",
//   "/dashboard/orders/list",
// ]);

const noMatchRoute = {
  path: "*",
  element: <>Not found</>,
};

const errorElement = (error) => {
  console.log("error", error);
};

const App = (props) => {
  const router = createBrowserRouter([
    {
      path: "dashboard/",
      loader: getConfig,
      element: <LazyElement from={Root} />,
      errorElement: errorElement,
      children: [...rootRoutes, noMatchRoute],
    },
    // {
    //   path: "dashboard/balance/",
    //   element: <LazyElement from={ProductsRoot} />,
    //   children: [...productsRoutes, noMatchRoute],
    // },
    // {
    //   path: "dashboard/orders/",
    //   element: <LazyElement from={OrdersRoot} />,
    //   children: [...ordersRoutes, noMatchRoute],
    // },
  ]);

  return (
    <Context.Provider value={{ config: { categories: [] } }}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
};

const getConfig = async () => {
  const response = await sendRequest("web/config/get");
  console.log("response", response);
  return response?.object || {};
};

export default App;
