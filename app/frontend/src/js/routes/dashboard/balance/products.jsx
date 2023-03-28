import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Placeholder from "react-bootstrap/Placeholder";
import { useLoaderData, Link, useLocation } from "react-router-dom";

import Context from "@js/contexts/context";
import Button from "@js/components/Form/Button";
import { Form, useForm } from "@js/components/Form";
import { sendRequest, useRequest } from "@js/components/Request";
import { Page } from "@dashboard/components/Dashboard";
import FetchList from "@js/components/FetchList";

const Index = (props) => {
  return (
    <>
      <Page.Title>Товары</Page.Title>

      <Row>
        <Col md={10}>
          <ProductsList />
        </Col>
      </Row>
    </>
  );
};

const ProductsList = (props) => {
  return (
    <>
      <FetchList
        loader={getProducts}
        ItemComponent={(item) => <ProductItem {...item} key={item.id} />}
        FallbackComponent={() => <>Loading...</>}
        ErrorComponent={(error) => <>{error.message}</>}
        EmptyComponent={() => <>Empty list</>}
      />
    </>
  );
};

const ProductItem = (props) => {
  const {
    id,
    old_price,
    price,
    pagetitle,
    longtitle,
    image,
    content,
    uri,
    parents,
    parent,
  } = props;

  return (
    <>
      <div className="p-2 mb-1x shadow-sm rounded">
        <Breadcrumb>
          {parents?.map((item) => (
            <Breadcrumb.Item href={item.uri}>{item.pagetitle}</Breadcrumb.Item>
          ))}
        </Breadcrumb>

        <div className="media">
          <Image
            className="mr-3"
            src={image}
            alt={longtitle}
            width={130}
            onError={(event) => {
              event.currentTarget.src = "/assets/imgs/lateres_no.jpg";
            }}
            rounded
          />
          <div className="media-body">
            <Row>
              <Col>
                <h5 className="mt-0">
                  <a
                    className="text-decoration-none text-dark"
                    href={uri}
                    target="_blanc"
                  >
                    {pagetitle}
                  </a>
                </h5>
                <p className="text-truncate text-wrap text-muted">
                  {longtitle}
                </p>
                <a href=".dashboard/products/item?">Редактировать</a>
              </Col>
              <Col md={3}>
                <div>
                  Цена (шт.) {price} <strike>{old_price}</strike>
                </div>
                <div>Старая цена (шт.) {old_price}</div>
                <div>Остаток</div>
                <div>Брак </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

const getProducts = () => {
  return sendRequest("mgr/product/getList");
};

export default Index;
