import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Placeholder from "react-bootstrap/Placeholder";
import {
  useLoaderData,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Context from "@js/contexts/context";
import Button from "@js/components/Form/Button";
import Icon from "@js/components/Icon";
import FetchList from "@js/components/FetchList";
import { Form, useForm } from "@js/components/Form";
import { sendRequest, useRequest } from "@js/components/Request";
import { Page } from "@dashboard/components/Dashboard";

const orders = require("@js/fakes/orders.json");

const Index = (props) => {
  const data = useLoaderData();

  return (
    <Context.Provider value={{ data }}>
      <div className="mb-2x">
        <Button
          as={Link}
          to="/dashboard/order/create"
          variant="outline-secondary"
          className="border"
        >
          <Icon name="plus" /> Создать заказ
        </Button>
      </div>

      <Page.Title>Заказы</Page.Title>

      <div className="fw-bolder border rounded p-2 mb-1x">
        <Row>
          <Col md={2}>Номер заказа</Col>
          <Col md={3}>Получатель</Col>
          <Col md={3}>Доставка</Col>
          <Col>Оплата</Col>
          <Col>Стоимость</Col>
        </Row>
      </div>

      <FetchList
        list={getOrders}
        Item={(item) => <OrderRow key={item.id} {...item} />}
      />
    </Context.Provider>
  );
};

const OrderRow = (props) => {
  const { id, num, createdon, customer, delivery, payment, cost } = props;
  const navigate = useNavigate();
  console.log("props", props);
  return (
    <>
      <div
        className="border rounded shadow-sm p-2 mb-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/dashboard/order?id=${id}`)}
      >
        <Row className="mb-1">
          <Col md={2}>
            <div className="h5 mb-0">№ {num}</div>
          </Col>
          <Col md={3}>
            <div className="">
              <Icon name="person-circle" /> {customer.fullname}
            </div>
          </Col>
          <Col md={3}>
            <div className="">{delivery.name}</div>
          </Col>
          <Col>
            <div className="">{payment.name}</div>
          </Col>
          <Col>
            <div className="">{cost}</div>
          </Col>
        </Row>

        <Row>
          <Col md={2}>
            <div className="text-muted">
              <Icon name="clock" /> {createdon}
            </div>
          </Col>
          <Col md={3}>
            <div className="text-muted text-truncate">
              <Icon name="building" /> {customer.company.text}
            </div>
          </Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </div>
    </>
  );
};

const getOrders = () => {
  return orders;
};

export default Index;
