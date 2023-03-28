import React, { useEffect, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useLoaderData } from "react-router-dom";

import Context from "@js/contexts/context";
import RawHTML from "@js/components/RawHTML";
import Title from "@js/components/Page/Title";

const Collaboration = (props) => {
  const context = useContext(Context);
  const data = useLoaderData();

  return (
    <Context.Provider value={{ ...context, data }}>
      <Title>{data?.pagetitle}</Title>
      <Card>
        <Card.Body>
          <RawHTML>{data?.content}</RawHTML>
        </Card.Body>
      </Card>
    </Context.Provider>
  );
};

export default Collaboration;
