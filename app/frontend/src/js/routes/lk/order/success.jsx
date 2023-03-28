import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Container from "@js/components/Page/Container";
import Title from "@js/components/Page/Title";

export default () => {
  const [resource, order] = useLoaderData();

  return (
    <Container>
      <Title className="h5 mb-1">
        <Link to={`/lk/order?id=${order.id}`}>Заказ создан № {order.num}</Link>
      </Title>
      <div className="text-muted">от {order.createdon}</div>
    </Container>
  );
};
