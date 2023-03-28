import React, { useEffect, createContext } from "react";

import RawHTML from "../RawHTML";
import { useRequest, Suspense } from "../Http/Request";
import Aside from "./Lk/Aside";

import Context from "@js/contexts/context.jsx";

export default (props) => {
  const request = useRequest({
    params: {
      action: "web/profile/menu/getList",
    },
  });

  return (
    <>
      <Suspense
        request={request}
        LoadingComponent={() => <>Loading...</>}
        ErrorComponent={({ error }) => <>{error.message}</>}
      >
        {({ response }) => (
          <Aside>
            <Aside.Menu items={response.results} />

            <Aside.Content title={resource.longtitle}>
              <RawHTML>{resource.content}</RawHTML>
            </Aside.Content>
          </Aside>
        )}
      </Suspense>
    </>
  );
};
