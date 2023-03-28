import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import Form from "@js/components/Form";
import DeliveryTime from "./Time";
import Address from "./Address";
import Cars from "./Cars";

export default (props) => {
  const { data, config, delivery } = React.useContext(Context);
  const { work_times } = data;

  return (
    <>
      <Form.Group>
        <Form.Label className="fw-bolder mb-2">
          Адрес отгрузки товара
        </Form.Label>
        <Row>
          <Col md="10">
            <Icon name="geo-alt" className="mb-1 mr-2" />
            {config.config["app.contacts_factory_address"]}
          </Col>
          <Col className="text-end" md="2">
            <Link to="/contacts/address" title="Адрес отгрузки товара">
              <Icon name="chevron-right" />
            </Link>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="address">Адрес доставки</Form.Label>
        <Address />
      </Form.Group>

      <hr />

      <Form.Group className="form-group ">
        <Form.Label htmlFor="delivery_car">Транспорт</Form.Label>
        <Cars />
      </Form.Group>

      <DeliveryTime times={work_times} label="Дата и время доставки" />
    </>
  );
};
