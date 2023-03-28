import React, { useEffect } from "react";

export default (props) => {
  const {
    request,
    LoadingComponent = (props) => <></>,
    ErrorComponent = (props) => <></>,
    AbortComponent = (props) => <></>,
    ItemComponent = (props) => <></>,
    EmptyComponent = (props) => <></>,
    PaginationComponent = (props) => <></>,
  } = props;

  useEffect(() => {
    request.send();
  }, []);

  if (request.state) {
    switch (request.state) {
      case "sending":
        return <LoadingComponent {...request} />;
      case "error":
        return <ErrorComponent {...request} />;
      case "abort":
        return <AbortComponent {...request} />;
    }

    const { results = [], pagination = {} } = request.response;

    if (results?.length) {
      let ResultsComponent = results?.map((item) => (
        <ItemComponent key={item.id} {...item} />
      ));

      return ResultsComponent;
    }

    return <EmptyComponent {...request} />;
  }

  return <></>;
};
