import React from "react";

import Aside from "@js/components/Page/Aside";
import RawHTML from "@js/components/RawHTML";

export default (props) => {
  const { resource, topPanel } = global.App?.config || {};

  const menuList = [
    {
      pagetitle: "Адрес производства",
      id: 1,
      url: "/contacts/address",
    },
    {
      pagetitle: "Служба поддержки клиентов",
      id: 2,
      url: "/contacts/support",
    },
    {
      pagetitle: "Сотрудничество",
      id: 3,
      url: "/contacts/collaboration",
    },
    {
      pagetitle: "Оптовые продажи",
      id: 4,
      url: "/contacts/wholesales",
    },
    {
      pagetitle: "Офис",
      id: 6,
      url: "/contacts/office",
    },
    {
      id: 7,
      pagetitle: "Пресс-служба",
      url: "/contacts/press",
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
