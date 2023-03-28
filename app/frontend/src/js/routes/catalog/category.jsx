import React from "react";

import Context from "@js/contexts/context";
import { useRequest, QueryData } from "@js/components/Request";
import Preloader, { PreloaderParent } from "@js/components/Preloader";
import Product, { Container as Products } from "@js/components/Product/Item";

export default () => {
  const context = React.useContext(Context);

  return (
    <>
      <QueryProducts parent={context.data.resource?.id} />
    </>
  );
};

const QueryProducts = (props) => {
  const { filters, parent } = props;
  const request = useRequest({
    action: "web/product/getList",
    data: { ...filters, parent },
  });

  const Loading = <Preloader position="absolute" show />;

  const ErrorFallback = () => <></>;

  const Output = () => {
    const results = request.response?.results;

    return (
      <Products>
        {results.map((item, index) => (
          <Product key={index} {...item} parentProps={{ className: "mb-4" }} />
        ))}
      </Products>
    );
  };

  return (
    <PreloaderParent style={{ minHeight: 150 }}>
      <QueryData {...{ Loading, request, ErrorFallback }}>
        <Output />
      </QueryData>
    </PreloaderParent>
  );
};
