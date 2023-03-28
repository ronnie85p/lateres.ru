import React from "react";
import { Link } from "react-router-dom";
import Title from "@js/components/Page/Title";

const statuses = {
  success: (props) => <StatusSuccess {...props} />,
  failure: (props) => <StatusFailure {...props} />,
};

export default ({ status, order }) => {
  const Component = statuses[status];

  return <Component order={order} />;
};

const StatusSuccess = ({ order }) => {
  return (
    <>
      <Title>
        <Title.Text>
          Заказ № {order.num} <span className="fs-6">{order.status.name}</span>
        </Title.Text>
        <Title.SubText>от {order.createdon}</Title.SubText>
      </Title>

      <Link to={`/lk/order?id=${order.id}`} className="text-success fs-6">
        Успешно создан
      </Link>
    </>
  );
};

const StatusFailure = ({ order }) => {
  return <></>;
};

export { statuses };
