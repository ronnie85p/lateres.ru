import React, {
  useState,
  useMemo,
  useReducer,
  useContext,
  useId,
  useEffect,
} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import Context from "@js/contexts/context";
import { useLoaderData } from "@js/components/Router";
import Container from "@js/components/Page/Container";
import Icon from "@js/components/Icon";

const Deliveries = (props) => {
  const { items } = props;

  return (
    <>
      <Row>
        {items?.map((item) => (
          <Col md={4} key={item.id}>
            <DeliveryItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

const DeliveryItem = (props) => {
  const { id, name, logo } = props;

  const regularClasses = "p-2 rounded d-flex align-items-center";
  const actionClasses = " shadow-sm bg-white";
  const styles = { cursor: "pointer", height: 76 };

  return (
    <>
      <div
        // className={regularClasses + (delivery_id === id ? actionClasses : "")}
        style={styles}
        // onClick={(event) => _onClick(event, id)}
      >
        <Image src={logo} width="50" />
        <span className="flex-fill ml-2 fs-5">{name}</span>
      </div>
    </>
  );
};

const DeliveryInfo = (props) => {
  const context = useContext(Context);

  return <></>;
};

const DeliveryPickupInfo = (props) => {
  const context = useContext(Context);

  return <></>;
};

const DeliveryCompanyInfo = (props) => {
  const context = useContext(Context);

  return <></>;
};

export { Deliveries, DeliveryInfo };
