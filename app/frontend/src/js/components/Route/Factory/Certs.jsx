import React from "react";

import Aside from "@js/components/Page/Aside";
import RawHTML from "@js/components/RawHTML";

export default (props) => {
  const { resource, topPanel } = global.App?.config || {};

  const menuList = [
    {
      pagetitle: "Сертификаты и лицензии",
      id: 1,
      url: "/factory/certs",
    },
    {
      pagetitle: "Индивидуальные составы",
      id: 2,
      url: "/factory/custom",
    },
    {
      pagetitle: "Колорирование изделий",
      id: 3,
      url: "/factory/colors",
    },
    {
      pagetitle: "Любая форма оплаты",
      id: 4,
      url: "/factory/anypay",
    },
    {
      pagetitle: "Доставка и Самовывоз",
      id: 5,
      url: "/factory/delivery",
    },
    {
      pagetitle: "Лабораторные исследования",
      id: 6,
      url: "/factory/research",
    },
    {
      id: 7,
      pagetitle: "Возврат",
      url: "/factory/return",
    },
  ];

  return (
    <>
      <Aside>
        <Aside.Menu items={menuList} />
        <Aside.Content title={resource.pagetitle}>
          <RawHTML>{resource.content}</RawHTML>
        </Aside.Content>
      </Aside>
    </>
  );
};
