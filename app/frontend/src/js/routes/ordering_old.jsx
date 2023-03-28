import React, { useState, useContext, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import Context from "@js/contexts/context";
import {
  useRequest,
  useParams,
  useLocation,
  sendRequest,
  QueryData,
} from "@js/components/Request";
import Icon from "@js/components/Icon";
import Preloader from "@js/components/Preloader";
import Image from "@js/components/Image";
import Form, { useForm } from "@js/components/Form";
import Button from "@js/components/Form/Button";
import Container from "@js/components/Page/Container";

import Title from "@js/components/Page/Title";
import Delivery from "@js/components/Page/Ordering/Delivery";
import Recipient from "@js/components/Page/Ordering/Recipient";
import Comment from "@js/components/Page/Ordering/Comment";
import Summary from "@js/components/Page/Ordering/Summary";
import Products from "@js/components/Page/Ordering/Products";
import { Title as Title_ } from "@js/components/Page/Ordering/Components";

const Ordering = (props) => {
  const context = useContext(Context);
  const data = useLoaderData();
  const params = useParams();
  const [total, setTotal] = useState({});
  const [distance, setDistance] = useState(0);
  const [settings, setSettings] = useState(params);

  return (
    <Context.Provider
      value={{
        ...context,
        data,
        total,
        distance,
        settings,
        setTotal,
        setDistance,
        setSettings,
      }}
    >
      <Container>
        <Link to="/cart">В корзину</Link>
        <hr className="mt-2 mb-1x" />

        <Title>{data?.pagetitle}</Title>
        <OrderContent>
          <OrderForm />
        </OrderContent>
      </Container>
    </Context.Provider>
  );
};

const OrderContent = (props) => {
  const { children } = props;
  const context = useContext(Context);
  const request = useRequest({ action: "web/ordering/get" });
  const queryDataProps = {
    request: request,
    Loading: <Preloader show />,
    Error: ({ error }) => <>{error.message}</>,
  };

  const { object: order } = request?.response || {};
  return (
    <Context.Provider value={{ ...context, order }}>
      <QueryData {...queryDataProps}>{children}</QueryData>;
    </Context.Provider>
  );
};

const OrderForm = (props) => {
  const context = useContext(Context);
  const { order, settings, setSettings } = context;
  const { deliveries } = order;
  const navigate = useNavigate();
  const action = "web/ordering/create";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[order] creating...");
      return true;
    },
    onSuccess({ object }) {
      if (object.redirect) {
        navigate(object.redirect);
      }
    },
  });

  const delivery =
    deliveries.find((item) => item.id == settings.delivery) || deliveries[0];

  return (
    <Context.Provider value={{ ...context, form }}>
      <Form onSubmit={form.handleSubmit}>
        <Preloader show={form.isSubmitting} />

        <Row>
          <Col md={8}>
            <Deliveries deliveries={deliveries} defaultValue={delivery.id} />

            <div className="mt-4">
              <Delivery delivery={delivery} />
            </div>

            <Recipient />

            <div className="my-4"></div>
            <Comment />

            <div className="my-4"></div>
            <Products />
          </Col>
          <Col md={4}>
            <Summary />
          </Col>
        </Row>
      </Form>
    </Context.Provider>
  );
};

const Deliveries = (props) => {
  const { deliveries, defaultValue } = props;
  const { settings, setSettings } = useContext(Context);
  const location = useLocation();

  const handleChange = (event) => {
    const _this = event.currentTarget;
    let param = { [_this.name]: _this.value };

    location.updateParams(param);
    setSettings({ ...settings, ...param });
  };

  return (
    <>
      {deliveries.map((item) => (
        <ToggleButton
          type="radio"
          name="delivery"
          variant="outline-secondary"
          className="border mr-2"
          id={`delivery-${item.id}`}
          key={item.id}
          value={item.id}
          checked={defaultValue == item.id}
          onChange={handleChange}
        >
          {item.name}
        </ToggleButton>
      ))}
    </>
  );
};

export default Ordering;
