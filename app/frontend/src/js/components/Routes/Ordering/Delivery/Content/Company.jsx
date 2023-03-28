import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import Form from "@js/components/Form";
import DeliveryTime from "../Time";
import Address from "../Address";
import Cars from "../Cars";

export default (props) => {
  const { order } = React.useContext(Context);

  return (
    <>
      <Address />

      <Form.Group className="form-group mt-4">
        <Form.Label htmlFor="delivery_car">Транспорт</Form.Label>
        <Cars />
      </Form.Group>

      <DeliveryTime label="Дата и время доставки" options={order.work_times} />
    </>
  );
};
