import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { Outlet, useLoaderData, Link } from "react-router-dom";
import useDataContext from "@js/components/useDataContext";
import FetchList from "@js/components/FetchList";
import { sendRequest } from "@js/components/Request";

export default (props) => {
  const { data } = useDataContext();

  return (
    <>
      <Row>
        <Col md={3}>
          <div className="sticky-top offset-top-1">
            <h5>
              {data?.object?.pagetitle}{" "}
              <span className="text-muted">{data?.products?.total}</span>
            </h5>

            <ul className="list-unstyled">
              {data?.categories?.list?.map((item) => (
                <li key={item.id}>
                  <Link to={`/${item.uri}`}>{item.pagetitle}</Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          <ListWrapper>
            <FetchList
              list={async () => {
                const { results } = await sendRequest("web/product/getList", {
                  parent: data?.object?.parent,
                });

                return results;
              }}
              Fallback={() => <>Loading</>}
              Empty={() => <>Empty list</>}
              Item={(item) => <ItemGrid {...item} />}
            />
          </ListWrapper>

          {/* <Outlet /> */}
        </Col>
      </Row>
    </>
  );
};

const ListWrapper = ({ children }) => {
  return <Row>{children}</Row>;
};

const ItemGrid = (props) => {
  const { image, pagetitle, description, uri } = props;

  return (
    <Col md={4} className="mb-2">
      <Card>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title className="text-truncate">{pagetitle}</Card.Title>
          <Card.Text className="text-truncate">{description}</Card.Text>
          <Link to={`/${uri}`}>Перейти</Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ItemRow = (props) => {
  return <></>;
};
