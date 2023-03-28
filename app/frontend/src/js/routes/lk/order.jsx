import React from "react";
import { useLoaderData, useSearchParams, Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";

import { Line } from "@js/components/Routes/LK/Order/Components";
import Payments from "@js/components/Routes/LK/Order/Payments";
import Summary from "@js/components/Routes/LK/Order/Summary";
import ActionButtons from "@js/components/Routes/LK/Order/ActionButtons";
import DeliveryInfo from "@js/components/Routes/LK/Order/Delivery";
import Products from "@js/components/Routes/LK/Order/Products";
import Status, { statuses } from "@js/components/Routes/LK/Order/Status";

export default (props) => {
  const context = React.useContext(Context);
  const [resource, order] = useLoaderData();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  return (
    <Context.Provider value={{ ...context, order }}>
      {status in statuses ? (
        <Status status={status} order={order} />
      ) : (
        <Content />
      )}
    </Context.Provider>
  );
};

const Content = (props) => {
  const { order } = React.useContext(Context);

  return (
    <>
      <Title>
        <Title.Text>
          Заказ № {order.num}{" "}
          <span className="fs-6" style={{ color: `#${order.status.color}` }}>
            {order.status.name}
          </span>
        </Title.Text>
        <Title.SubText>от {order.createdon}</Title.SubText>
      </Title>

      <Layer>
        <Row>
          <Col>
            <OrderInfo order={order} />
          </Col>
          <Col md={5}>
            <div className="bg-light rounded p-3 sticky-top offset-top-8">
              <Summary order={order} />
            </div>
          </Col>
        </Row>
      </Layer>

      <ActionButtons {...order} />

      {order.status.id === 1 ? (
        <Layer>
          <Payments {...order} />
        </Layer>
      ) : (
        <></>
      )}

      <div className="my-5"></div>
      <Products {...order} />
    </>
  );
};

const ReceiverCompany = (props) => {
  const { receiver_company } = props;

  if (receiver_company) {
    return (
      <>
        <Line iconName="building-check">
          <div>{receiver_company.text}</div>

          {receiver_company.address_required ? (
            <div>{receiver_company.address_text}</div>
          ) : (
            <></>
          )}
        </Line>
      </>
    );
  }

  return <span className="text-danger">Компания не указана</span>;
};

const OrderInfo = ({ order }) => {
  const { delivery, address } = order;
  const isJuristic = address.receiver_type == 1;

  return (
    <>
      <div className="h5">{delivery.name}</div>
      <div className="fw-bolder mb-1">Получатель</div>
      <Line iconName="person-circle">
        {isJuristic ? "Юридическое лицо, " : ""}
        {address.receiver}
        {address.phone ? `, ${address.phone}` : <></>}
      </Line>

      {isJuristic ? <ReceiverCompany {...address} /> : <></>}
      <DeliveryInfo order={order} />
    </>
  );
};
