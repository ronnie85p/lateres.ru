import React from "react";
import { useRequest, Suspense } from "@js/components/Http/Request";
import Loading from "@js/components/Loading";

export default (props) => {
  const { children = () => <></>, params } = props;
  const request = useRequest({
    params,
  });

  const Component = children;

  return (
    <>
      <Suspense
        request={request}
        LoadingComponent={() => <Loading />}
        ErrorComponent={({ error }) => <>{error.message}</>}
      >
        <Component {...request} />
      </Suspense>
    </>
  );
};
