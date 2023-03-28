import React from "react";

import Page from "./components/Page";
// import { Route, Outlet } from "./components/Page/Custom";
import { useRequest, Suspense, sendRequest } from "./components/Request";
import Context from "./contexts/context";
import { Router_, Link, Outlet, useLoaderData } from "./components/Router";
import Preloader from "./components/Preloader";

export default (props) => {
  const request = getConfigRequest();

  return (
    <Suspense
      request={request}
      LoadingComponent={
        <Preloader
          show={true}
          spinner={{ size: "lg" }}
          backdrop={{ position: "fixed" }}
        />
      }
      ErrorComponent={(error) => <div>{error.message}</div>}
    >
      <Context.Provider value={{ config: request.response?.object }}>
        <Router_
          id="main"
          routes={[
            {
              path: "/login",
              loader: getResource,
              element: (props) => {
                const path = props.url.pathname.replace(/\/$/, "");
                const Component = require(`@js/routes${path}`).default;
                return <Component {...props} />;
              },
              fallbackElement: () => (
                <Preloader
                  show={true}
                  spinner={{ size: "lg" }}
                  backdrop={{ position: "fixed" }}
                />
              ),
            },
            {
              path: "/lk*",
              loader: getResource,
              element: (props) => {
                const path = props.url.pathname.replace(/\/$/, "");
                const Component = require(`@js/routes/lk`).default;
                return <Component {...props} />;
              },
              fallbackElement: () => (
                <Preloader
                  show={true}
                  spinner={{ size: "lg" }}
                  backdrop={{ position: "fixed" }}
                />
              ),
            },
            {
              path: "/login/forgot",
              loader: getResource,
              element: (props) => {
                const path = props.url.pathname.replace(/\/$/, "");
                const Component = require(`@js/routes${path}`).default;
                return <Component {...props} />;
              },
              fallbackElement: () => (
                <Preloader
                  show={true}
                  spinner={{ size: "lg" }}
                  backdrop={{ position: "fixed" }}
                />
              ),
            },
            {
              path: "/register",
              loader: getResource,
              element: (props) => {
                const path = props.url.pathname.replace(/\/$/, "");
                const Component = require(`@js/routes${path}`).default;
                return <Component {...props} />;
              },
              fallbackElement: () => (
                <Preloader
                  show={true}
                  spinner={{ size: "lg" }}
                  backdrop={{ position: "fixed" }}
                />
              ),
            },
            {
              path: "/contacts/*",
              loader: getResource,
              element: (props) => {
                const Component =
                  require(`@js/routes${props.url.pathname}`).default;
                return <Component {...props} />;
              },
              fallbackElement: () => (
                <Preloader
                  show={true}
                  spinner={{ size: "lg" }}
                  backdrop={{ position: "fixed" }}
                />
              ),
            },
            {
              path: "/factory/*",
              loader: getResource,
              element: (props) => {
                const Component =
                  require(`@js/routes${props.url.pathname}`).default;
                return <Component {...props} />;
              },
              fallbackElement: () => (
                <Preloader
                  show={true}
                  spinner={{ size: "lg" }}
                  backdrop={{ position: "fixed" }}
                />
              ),
            },
            {
              path: "/catalog/*\\?as=product*",
              loader: getProduct,
              element: (props) => {
                const Component = require(`@js/routes/product`).default;
                return <Component {...props} />;
              },
              fallbackElement: () => (
                <Preloader
                  show={true}
                  spinner={{ size: "lg" }}
                  backdrop={{ position: "fixed" }}
                />
              ),
            },
            {
              path: "/catalog/*",
              loader: getCategory,
              element: (props) => {
                const Component = require(`@js/routes/catalog`).default;
                console.log("component", Component);
                return <Component {...props} />;
              },
              fallbackElement: () => (
                <Preloader
                  show={true}
                  spinner={{ size: "lg" }}
                  backdrop={{ position: "fixed" }}
                />
              ),
            },

            {
              path: "/cart",
              loader: getResource,
              element: (props) => {
                const Component = require(`@js/routes/cart`).default;
                return <Component {...props} />;
              },
              fallbackElement: () => (
                <Preloader
                  show={true}
                  spinner={{ size: "lg" }}
                  backdrop={{ position: "fixed" }}
                />
              ),
            },

            {
              path: "/ordering",
              loader: getResource,
              element: (props) => {
                const Component = require(`@js/routes/ordering`).default;
                return <Component {...props} />;
              },
              fallbackElement: () => (
                <Preloader
                  show={true}
                  spinner={{ size: "lg" }}
                  backdrop={{ position: "fixed" }}
                />
              ),
            },
          ]}
        >
          <Page>
            <Page.TopPanel />
            <Page.Header />

            <Page.Container className="mt-2x mb-2x">
              <Outlet />
            </Page.Container>
          </Page>
        </Router_>
      </Context.Provider>
    </Suspense>
  );
};

const getConfigRequest = () => {
  return useRequest({
    action: "web/config/get",
  });
};

const getCategory = async () => {
  const url = new URL(window.location.href);
  const response = await sendRequest("web/category/get", {
    uri: url.pathname,
  });

  return response;
};

const getResource = async () => {
  const url = new URL(window.location.href);
  const response = await sendRequest("web/resource/get", {
    uri: url.pathname,
  });

  return response.object;
};

const getProduct = async () => {
  const url = new URL(window.location.href);
  const response = await sendRequest("web/product/get", {
    uri: url.pathname,
  });

  return response;
};
