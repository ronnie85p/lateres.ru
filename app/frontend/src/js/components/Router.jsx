import React from "react";

const RouterContext = React.createContext({
  routers: {},
});

const pushHistory = (url, title = "") => {
  window.history.pushState({}, "", url);
  if (title) {
    document.title = title;
  }
};

const getRoute = (path, routes) => {
  return routes?.filter((r) => {
    let routePath = r.path.replace("*", ".*");
    let pattern = new RegExp(`^${routePath}`);

    return pattern.test(path);
  })[0];
};

const navigate = async (router, url) => {
  if (!(url instanceof URL)) {
    url = new URL(url);
  }

  const route = getRoute(url.pathname + url.search, router.routes);
  if (typeof route === "undefined") {
    throw new Error("Not found");
  }

  router.setCurrentRoute({ ...route, url });
};

const Link = (props) => {
  const { to, children, title, onClick } = props;
  const context = React.useContext(RouterContext);
  const router = context.routers["main"];

  const handleClick = async (event) => {
    event.preventDefault();

    const url = new URL(event.currentTarget.href);
    navigate(router, url);
    pushHistory(url, title);

    onClick && onClick(event);
  };

  return (
    <>
      <a {...props} href={to} onClick={handleClick}>
        {children}
      </a>
    </>
  );
};

const Router_ = (props) => {
  const { children, id, routes } = props;
  const [loading, setLoading] = React.useState(false);
  const [currentRoute, setCurrentRoute] = React.useState(false);
  const context = React.useContext(RouterContext);

  const router = {
    routes,
    setLoading,
    loading,
    currentRoute,
    setCurrentRoute,
  };

  context.routers[id || 0] = router;

  React.useEffect(() => {
    navigate(router, new URL(window.location.href));
  }, []);

  return (
    <>
      <RouterContext.Provider value={{ ...context }}>
        {children}
      </RouterContext.Provider>
    </>
  );
};

const Outlet = (props) => {
  const [loading, setLoading] = React.useState(false);
  const context = React.useContext(RouterContext);
  const router = context.routers["main"];
  const route = router.currentRoute;

  const loader = async () => {
    setLoading(true);
    route.loaderData = await route.loader();

    setLoading(false);
  };

  React.useEffect(() => {
    if (route.loader) {
      loader();
    }
  }, [route]);

  if (loading && route.fallbackElement) {
    const FallbackElement = route.fallbackElement;
    return <FallbackElement {...route} />;
  }

  if (!loading && route.element) {
    const Component = route.element;
    return <Component {...route} />;
  }

  return <></>;
};

const useLoaderData = () => {
  const context = React.useContext(RouterContext);
  const router = context.routers["main"];
  const route = router.currentRoute;

  return route.loaderData || {};
};

const useRouter = () => {
  const context = React.useContext(RouterContext);
  const router = context.routers["main"];

  return router;
};

export { Link, Router_, Outlet, navigate, useLoaderData, useRouter };
