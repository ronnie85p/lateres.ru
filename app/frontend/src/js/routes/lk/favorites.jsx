import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import { useLoaderData } from "react-router-dom";
import Context from "@js/contexts/context";
import Image from "@js/components/Image";
import Button from "@js/components/Form/Button";
import InputCounter from "@js/components/Form/InputCounter";
import Icon from "@js/components/Icon";
import Title from "@js/components/Page/Title";
import { useRequest, QueryData } from "@js/components/Request";
import Preloader, { PreloaderParent } from "@js/components/Preloader";

import Product, { Container as Products } from "@js/components/Product/Item";

export default (props) => {
  const context = React.useContext(Context);
  const [resource] = useLoaderData();

  return (
    <Context.Provider value={{ ...context, resource }}>
      <Title>
        <Title.Text>{resource.pagetitle}</Title.Text>
      </Title>
      <Content />
    </Context.Provider>
  );
};

const Content = (props) => {
  return (
    <>
      <QueryFavorites />
    </>
  );
};

const QueryFavorites = (props) => {
  const { filters } = props;
  const request = useRequest({
    action: "web/favorite/getList",
    data: filters,
  });

  const Loading = (
    <Preloader position="absolute" spinner={{ size: "sm" }} show />
  );

  const ErrorFallback = () => <></>;

  const Output = () => {
    const results = request.response?.results;

    return (
      <Products>
        {results.map((item, index) => (
          <Product key={index} {...item} />
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
