import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

import Context from "@js/contexts/context";
import Button from "@js/components/Form/Button";
import Image from "@js/components/Image";
import Icon from "@js/components/Icon";
import { sendRequest, useRequest, QueryData } from "@js/components/Request";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";
import Preloader, { PreloaderParent } from "@js/components/Preloader";

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
  const context = React.useContext(Context);

  return (
    <>
      <QueryOrders />
    </>
  );
};

const QueryOrders = (props) => {
  const { filters, children: Children } = props;
  const request = useRequest({
    action: "web/order/getList",
    data: filters,
  });

  const Loading = (
    <Preloader position="absolute" spinner={{ size: "sm" }} show />
  );

  const ErrorFallback = () => <></>;

  const Output = () => {
    const results = request.response?.results;

    return (
      <>
        {results.map((item) => (
          <OrderItem key={item.id} {...item} />
        ))}
      </>
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

const OrderItem = (props) => {
  const {
    id,
    num,
    createdon,
    delivery,
    status,
    address,
    cost_format,
    products,
  } = props;

  const isJuristic = address.receiver_type == 1;

  return (
    <Layer className="">
      <Row>
        <Col>
          <div className="h6 mb-1">
            <Link
              className="text-dark text-decoration-none mr-2"
              to={`/lk/order?id=${id}`}
            >
              Заказ № {num}
            </Link>
            <span style={{ color: `#${status.color}`, fontSize: ".8em" }}>
              {status.name}
            </span>
          </div>
          <div className="text-muted">от {createdon}</div>
        </Col>
        <Col className="text-end">
          <span className="fs-5">{cost_format}</span>
        </Col>
      </Row>
      <hr className="mt-1" />
      <Row>
        <Col>
          <div className="">
            <Icon name="person-circle" />{" "}
            <span className="fst-italic">
              {isJuristic ? "Юридическое лицо, " : ""}
              {address.receiver}
              {address.phone ? `, ${address.phone}` : <></>}
            </span>
          </div>

          <div className="">
            <Icon name="truck" />{" "}
            <span className="fst-italic">
              {delivery.id === 2 ? address.text_address : delivery.name}
            </span>
          </div>

          <Link className="" to={`/lk/order?id=${id}`}>
            Подробнее
          </Link>
        </Col>
      </Row>
    </Layer>
  );
};
