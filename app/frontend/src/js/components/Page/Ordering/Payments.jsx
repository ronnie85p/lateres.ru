import React, { useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButton from "react-bootstrap/ToggleButton";

import Context from "@js/contexts/context";
import { useParams, useLocation, sendRequest } from "@js/components/Request";
import { Form } from "@js/components/Form";
import Image from "@js/components/Image";

const Payments = ({ children }) => {
  return <Row>{children}</Row>;
};

const PaymentItem = (props) => {
  const { id, name, logo, onChange, checked } = props;

  return (
    <>
      <Col md={3}>
        <ToggleButton
          type="checkbox"
          name="payment"
          variant="outline-primary"
          className="btn-block"
          id={`payment-${id}`}
          checked={checked}
          value={id}
          onChange={onChange}
        >
          {/* <Image src={logo} /> */}
          {name}
        </ToggleButton>
      </Col>
    </>
  );
};

const PaymentInfo = (props) => {
  const { payment } = props;

  const components = {
    1: PaymentCardInfo,
    2: PaymentCashInfo,
    3: PaymentNoCashInfo,
  };

  const Component = components[payment.id];

  return <Component {...payment} />;
};

const PaymentCardInfo = (props) => {
  const { description } = props;

  return <div className="">{description}</div>;
};

const PaymentCashInfo = (props) => {
  const { description } = props;

  return <div className="">{description}</div>;
};

const PaymentNoCashInfo = (props) => {
  const { description } = props;
  const { settings, setSettings } = useContext(Context);
  const location = useLocation();

  const methods = [
    {
      name: "С НДС",
      value: 1,
    },
    {
      name: "Без НДС",
      value: 0,
    },
  ];

  const handleChange = (event) => {
    let _this = event.currentTarget;
    let param = { [_this.name]: _this.value };

    location.updateParams(param);
    setSettings({ ...settings, ...param });
  };

  return (
    <div className="">
      <div className="mb-2">{description}</div>

      {methods.map((item) => (
        <Form.Check
          type="radio"
          name="include_tax"
          id={`include-tax-${item.value}`}
          key={item.value}
          label={item.name}
          value={item.value}
          checked={settings.include_tax == item.value}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export {
  Payments,
  PaymentItem,
  PaymentInfo,
  PaymentCardInfo,
  PaymentCashInfo,
  PaymentNoCashInfo,
};
