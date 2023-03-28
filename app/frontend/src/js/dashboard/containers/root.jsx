import React, { useContext } from "react";
import { Outlet, useLoaderData, Link } from "react-router-dom";
import Context from "@js/contexts/context";
import { Page, Aside } from "@dashboard/components/Dashboard";

const menuItems = [
  //   {
  //     id: 11,
  //     menutitle: "Профиль",
  //     uri: "/dashboard/profile",
  //   },
  {
    id: 1,
    menutitle: "Товары",
    uri: "/dashboard/balance",
  },
  {
    id: 2,
    menutitle: "Услуги",
    uri: "/dashboard/services",
  },
  {
    id: 3,
    menutitle: "Заказы",
    uri: "/dashboard/orders",
  },
  {
    id: 4,
    menutitle: "Объявления",
    uri: "/dashboard/announces",
  },

  {
    id: 5,
    menutitle: "Новости",
    uri: "/dashboard/news",
  },
  {
    id: 6,
    menutitle: "Отзывы",
    uri: "/dashboard/reviews",
  },
  {
    id: 7,
    menutitle: "Платежи",
    uri: "/dashboard/payments",
  },
  {
    id: 8,
    menutitle: "Категории",
    uri: "/dashboard/categories",
  },
  {
    id: 9,
    menutitle: "Производители",
    uri: "/dashboard/fabricators",
  },
];

const Root = (props) => {
  const context = useContext(Context);
  const data = useLoaderData();
  context.data = data;

  return (
    <>
      <Page>
        <Page.Header />
        <Aside>
          <Aside.Menu>
            <ul className="list-unstyled">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link to={item.uri}>{item.menutitle}</Link>
                </li>
              ))}
            </ul>
          </Aside.Menu>
          <Aside.Content>
            <Outlet />
          </Aside.Content>
        </Aside>
        <Page.Footer />
      </Page>
    </>
  );
};

export default Root;
