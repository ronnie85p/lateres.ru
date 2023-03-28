import React from "react";
import { Outlet } from "react-router-dom";
import Profile from "@js/components/Page/Profile";

export default () => {
  const items = [
    {
      id: 1,
      uri: "/lk/profile",
      menutitle: "Профиль",
    },
    {
      id: 2,
      uri: "/lk/orders",
      menutitle: "Мои заказы",
    },
    {
      id: 3,
      uri: "/lk/addresses",
      menutitle: "Мои адреса",
    },
    {
      id: 5,
      uri: "/lk/contacts",
      menutitle: "Мои контакты",
    },
    {
      id: 6,
      uri: "/lk/favorites",
      menutitle: "Избранное",
    },
    {
      id: 7,
      uri: "/lk/settings",
      menutitle: "Настройки",
    },
  ];

  return (
    <>
      <Profile>
        <Profile.Menu items={items} />
        <Profile.Content>
          <Outlet />
        </Profile.Content>
      </Profile>
    </>
  );
};
