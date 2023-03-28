import React from "react";
import Placeholder from "react-bootstrap/Placeholder";
import { useRequest } from "@js/components/Request";
import Form from "@js/components/Form";

const payments = {
  1: (props) => <PaymentCashInfo {...props} />,
  2: (props) => <PaymentCardInfo {...props} />,
  3: (props) => <PaymentNoCashInfo {...props} />,
};

export default (props) => {
  const { payments, id } = props;
  const [payment, setPayment] = React.useState(props.payment);
  const request = useRequest({
    action: "web/order/update",
    data: { id },
  });

  const handleChange = (item) => {
    setPayment(item);

    request.send({ payment: item.id });
  };

  return (
    <>
      <div className="fs-5 fw-bolder mb-2">Метод оплаты</div>
      <div className="mb-2">
        {payments?.map((item) => (
          <Form.Check
            type="radio"
            name="payment"
            id={`payment-${item.id}`}
            key={item.id}
            value={item.id}
            label={item.name}
            defaultChecked={payment.id === item.id}
            disabled={request.state === "pending"}
            onChange={() => handleChange(item)}
            inline
          />
        ))}
      </div>

      <div className="" style={{ minHeight: 80 }}>
        {request.state === "pending" ? (
          <div>
            <Placeholder animation="glow">
              <Placeholder xs={4} />
            </Placeholder>
          </div>
        ) : (
          <PaymentInfo {...props} payment={payment} />
        )}
      </div>
    </>
  );
};

const PaymentInfo = (props) => {
  const { payment } = props;
  const Component = payments[payment.id];

  return (
    <>
      <div className="mb-2">{payment.description}</div>
      <Component {...props} />
    </>
  );
};

const PaymentCashInfo = (props) => {
  return <></>;
};
const PaymentCardInfo = (props) => {
  return <></>;
};

const methods = [
  {
    name: "Без НДС",
    value: 0,
  },
  {
    name: "С НДС",
    value: 1,
  },
];

const PaymentNoCashInfo = (props) => {
  const { id, include_tax } = props;
  const request = useRequest({
    action: "web/order/update",
    data: { id },
  });

  const handleChange = (value) => {
    request.send({ include_tax: value });
  };

  return (
    <>
      {methods.map((item) => (
        <Form.Check
          type="radio"
          name="include_tax"
          id={`include-tax-${item.value}`}
          key={item.value}
          label={item.name}
          value={item.value}
          defaultChecked={include_tax == item.value}
          disabled={request.state === "pending"}
          onChange={(event) => handleChange(item.value)}
        />
      ))}
    </>
  );
};
