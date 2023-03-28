import React from "react";
import { useLoaderData } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { sendRequest } from "@js/components/Request";
import Icon from "@js/components/Icon";
import Title from "@js/components/Page/Title";
import Media from "@js/components/Media";

export default (props) => {
  const [resource, address] = useLoaderData();

  return (
    <>
      <Title>{resource.pagetitle}</Title>

      <Layer></Layer>
    </>
  );
};

const Layer = (props) => {
  const { children } = props;
  return <div className="rounded bg-white p-2 mb-2">{children}</div>;
};
