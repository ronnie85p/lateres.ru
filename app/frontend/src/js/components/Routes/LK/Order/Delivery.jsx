import React from "react";
import { Line } from "./Components";

const deliveries = {
  1: (props) => <DeliveryPickupInfo {...props} />,
  2: (props) => <DeliveryCompanyInfo {...props} />,
};

export default ({ order }) => {
  const Component = deliveries[order.delivery.id];

  return <Component order={order} />;
};

const DeliveryPickupInfo = ({ order }) => {
  const { delivery_date, delivery_time } = order;

  return (
    <>
      <div className="fw-bolder mt-4">Дата и время получения</div>
      <Line iconName="clock">
        {delivery_date} {delivery_time}
      </Line>
    </>
  );
};

const DeliveryCompanyInfo = ({ order }) => {
  const { address, delivery_car, delivery_date, delivery_time } = order;

  return (
    <>
      <div className="fw-bolder mb-1 mt-4">Адрес доставки</div>
      <Line iconName="geo-alt">{address.text_address}</Line>

      <div className="fw-bolder mb-1 mt-4">Транспорт</div>
      <Line iconName="truck">
        <div>{delivery_car?.name}</div>
        <div className="text-muted">{delivery_car?.description}</div>
      </Line>

      <div className="fw-bolder mb-1 mt-4">Дата и время доставки</div>
      <Line iconName="clock">
        {delivery_date} {delivery_time}
      </Line>
    </>
  );
};
