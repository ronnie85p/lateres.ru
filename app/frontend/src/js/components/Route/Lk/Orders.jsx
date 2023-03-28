import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Aside from "@js/components/Page/Aside";
import RawHTML from "@js/components/RawHTML";
import FormGroup from "@js/components/Form/Group";
import { useForm } from "@js/components/Form";
import { useRequest } from "@js/components/Http/Request";
import { useEffect } from "react";

const OrdersList = (props) => {
  const request = useRequest({
    params: {
      action: "web/order/getList",
    },
  });

  useEffect(() => {
    request.send();
  }, []);

  switch (request.state) {
    case "sending":
      return <>Loading...</>;
    case "error":
      return <>{request.error.message}</>;
  }

  if (!request.response?.results.length) {
    return <>No orders output</>;
  }

  return (
    <>
      {request.response?.results.map((item) => (
        <div key={item.id}>{item.num}</div>
      ))}
    </>
  );
};

export default (props) => {
  const { resource, topPanel } = global.App?.config || {};

  const menuList = [
    {
      pagetitle: "Профиль",
      id: 1,
      url: "/lk/profile",
    },

    {
      pagetitle: "Мои заказы",
      id: 2,
      url: "/lk/orders",
    },

    {
      pagetitle: "Мои контакты",
      id: 3,
      url: "/lk/contacts",
    },

    {
      pagetitle: "Мои адреса",
      id: 4,
      url: "/lk/addresses",
    },

    {
      pagetitle: "Мои карты",
      id: 5,
      url: "/lk/cards",
    },
  ];

  return (
    <>
      <Aside>
        <Aside.Menu items={menuList} />
        <Aside.Content title={resource.longtitle}>
          <OrdersList />
        </Aside.Content>
      </Aside>
    </>
  );
};
