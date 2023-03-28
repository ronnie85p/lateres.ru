import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import { QueryData, useRequest } from "@js/components/Request";
import Form from "@js/components/Form";
import PaymentCard from "./Payment/Card";
import PaymentCash from "./Payment/Cash";
import PaymentNoCash from "./Payment/NoCash";

const components = {
  1: PaymentCard,
  2: PaymentCash,
  3: PaymentNoCash,
};

export default (props) => {
  const { data, form } = React.useContext(Context);
  const request = useRequest({
    action: "web/delivery/payment/getList",
    data: {
      delivery_id: form.values.delivery,
    },
  });

  const queryDataProps = {
    request,
    Loading: <>Loading...</>,
    Error: ({ error }) => <>{error.message}</>,
  };

  React.useEffect(() => {
    if (data.status === "changing") {
      if (request.state !== "pending") {
        request.send();
      }
    }
  }, []);

  return (
    <QueryData {...queryDataProps}>
      <Payments payments={request.response?.results} />
    </QueryData>
  );
};

const Payments = (props) => {
  const { payments } = props;
  const { params, handleFieldChange } = React.useContext(Context);
  const payment =
    payments.find((item) => params.payment == item.id) || payments[0];

  return (
    <>
      {payments.map((item) => (
        <Form.Check
          type="radio"
          name="payment"
          id={`payment-${item.id}`}
          key={item.id}
          value={item.id}
          label={item.name}
          defaultChecked={payment.id == item.id}
          onChange={handleFieldChange}
          inline
        />
      ))}

      <Payment {...payment} />
    </>
  );
};

const Payment = (props) => {
  const { id } = props;
  const Component = components[id];

  return (
    <div className="mt-2" style={{ minHeight: 80 }}>
      <Component {...props} />
    </div>
  );
};
