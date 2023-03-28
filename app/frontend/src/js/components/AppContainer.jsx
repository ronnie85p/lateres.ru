import React from "react";
import { App } from "react-bootstrap-icons";

import Context from "../contexts/context";
import { useRequest, Suspense } from "./Http/Request";
import Loading from "./Loading";

export default (props) => {
  const { children } = props;
  const request = useRequest({
    params: {
      action: "web/config/get",
      referer: window.location.href,
    },
  });

  return (
    <>
      <Suspense
        request={request}
        LoadingComponent={() => <Loading />}
        ErrorComponent={({ error }) => <>{error.message}</>}
      >
        {({ response }) => (
          <Context.Provider
            value={{ ...(global.App?.config || {}), ...response.object }}
          >
            {children}
          </Context.Provider>
        )}
      </Suspense>
    </>
  );
};
