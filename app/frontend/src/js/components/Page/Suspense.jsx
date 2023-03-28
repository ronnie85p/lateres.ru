import React from "react";
import { useResource } from "@js/components/Resource";

const useSuspense = (props) => {
  const { loader, fallback } = props;
  const [resource, setResource] = React.useState();

  const runLoader = () => {
    const promise = typeof loader === "function" ? loader() : loader;
    setResource(useResource(promise));
  };

  return {
    fallback,
    resource,
    runLoader,
  };
};

const Suspense = (props) => {
  const { children, suspense, fallback } = props;

  React.useLayoutEffect(() => {
    suspense.runLoader();
  }, []);

  return (
    <React.Suspense fallback={fallback}>
      {suspense.resource ? children : <></>}
    </React.Suspense>
  );
};

export { useSuspense, Suspense };
