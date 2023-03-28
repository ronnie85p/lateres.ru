import React, { useContext } from "react";
import { Outlet, useLoaderData, Link } from "react-router-dom";
import Context from "@js/contexts/context";

import Icon from "@js/components/Icon";
import Button from "@js/components/Form/Button";
import { Page, Aside } from "@dashboard/components/Dashboard";

const menuItems = [
  {
    id: 1,
    menutitle: "Добавить товар",
    uri: "/dashboard/balance/product/create",
  },
  {
    id: 2,
    menutitle: "Товары",
    uri: "/dashboard/balance/products",
  },
  {
    id: 3,
    menutitle: "История",
    uri: "/dashboard/balance/stories",
  },
];

const Index = (props) => {
  const context = useContext(Context);
  const data = useLoaderData();
  context.data = data;

  return (
    <>
      <Page>
        <Page.Header />
        <Aside>
          <Aside.Menu>
            <Button as={Link} to="/dashboard/services" variant="light">
              <Icon name="arrow-left-short" size={"1.3em"} className="mb-1" />{" "}
              Главное меню
            </Button>
            <hr className="mt-2" />

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

export default Index;
