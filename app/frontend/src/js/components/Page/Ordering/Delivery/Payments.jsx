import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButton from "react-bootstrap/ToggleButton";

import Context from "@js/contexts/context";
import { useLocation, useRequest, QueryData } from "@js/components/Request";
import Preloader, {
  PreloaderParent,
  PreloaderSm,
} from "@js/components/Preloader";

import PaymentContent from "../Payments/Payment";

export default (props) => {
  const { delivery, form } = React.useContext(Context);
  const request = useRequest({
    action: "web/delivery/payment/getList",
    data: {
      delivery_id: delivery.id,
    },
  });

  const queryDataProps = {
    request,
    Loading: (
      <PreloaderParent>
        <PreloaderSm position="absolute" show />
      </PreloaderParent>
    ),
    Error: ({ error }) => <>{error.message}</>,
  };

  React.useEffect(() => {
    request.send();
  }, [form.values.delivery]);

  return (
    <QueryData {...queryDataProps}>
      <Payments payments={request.response?.results} />
    </QueryData>
  );
};

const Payments = (props) => {
  const { payments } = props;
  const context = React.useContext(Context);
  const { form } = context;
  const { updateParams } = useLocation();
  const defaultIndex = getDefaultIndex(form.values.payment, payments, "id");
  const payment = payments[defaultIndex];

  const handleChange = (event) => {
    let _this = event.currentTarget;

    updateParams({ [_this.name]: _this.value });
    form.handleChange(event);
  };

  return (
    <Context.Provider value={{ ...context, payment }}>
      <PaymentItems>
        {payments.map((item) => (
          <Col key={item.id} md={3}>
            <ToggleButton
              type="radio"
              name="payment"
              variant="outline-secondary"
              className="btn-block"
              id={`payment-${item.id}`}
              value={item.id}
              checked={payment.id == item.id}
              onChange={handleChange}
            >
              {/* <Image src={logo} /> */}
              {item.name}
            </ToggleButton>
          </Col>
        ))}
      </PaymentItems>

      <PaymentContent />
    </Context.Provider>
  );
};

const PaymentItems = ({ children }) => {
  return <Row>{children}</Row>;
};

const getDefaultIndex = (value, items, prop) => {
  const index = items.findIndex((item) => item[prop] == value);
  return index !== -1 ? index : 0;
};
