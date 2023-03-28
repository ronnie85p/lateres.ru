import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet, useLoaderData } from "react-router-dom";

import Context from "@js/contexts/context";
import Container from "@js/components/Page/Container";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";

export default (props) => {
  const context = React.useContext(Context);
  const [data] = useLoaderData();

  return (
    <Context.Provider value={{ ...context, data }}>
      <Container className="container-catalog">
        <Title>
          <Title.Text>
            {data.resource.pagetitle}{" "}
            <span className="text-muted" style={{ fontSize: ".7em" }}>
              {data.products} товаров
            </span>
          </Title.Text>
        </Title>

        <Row>
          <Col md="3">
            <Layer>
              <div className="h5">Категории</div>
              <ul className="list-unstyled">
                {data.categories?.list?.map((item) => (
                  <li key={item.id}>
                    <Link to={`/${item.uri}`}>{item.pagetitle}</Link>
                  </li>
                ))}
              </ul>
            </Layer>
          </Col>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </Context.Provider>
  );
};
