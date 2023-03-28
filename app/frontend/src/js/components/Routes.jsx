import React, { useState } from "react";

const getRoute = (path, index = false) => {
  const routePath = getPath(path);

  return {
    path: path,
    index: index,
    element: <RouteElement path={routePath} />,
    loader: async (props) => {
      const result = await getLoader({ ...props, path: routePath });
      return result;
    },
  };
};

const getRoutes = (paths) => {
  let routes = [];

  for (let idx in paths) {
    let path = paths[idx];
    routes.push(getRoute(path, idx == 0));
  }

  return routes;
};

const getPath = (path) => {
  return path.replace(/^\//, "").replace(/\/$/, "");
};

const RouteElement = (props) => {
  const { path } = props;
  const Element = React.lazy(() => {
    return import(`@js/routes/${path}`);
  });

  return (
    <React.Suspense>
      <Element {...props} />
    </React.Suspense>
  );
};

const getLoader = async (props) => {
  try {
    const { path } = props;
    const module = require(`@js/loaders/${path}`);

    return await module.default(props);
  } catch (e) {
    return new Response({
      statusText: e.message,
    });
  }
};

export { getLoader, getRoute, getRoutes, RouteElement };
