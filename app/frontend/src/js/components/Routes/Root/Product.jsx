import React, { useContext } from "react";
import { Outlet, useLoaderData, Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import useDataContext from "@js/components/useDataContext";
import Gallery from "@js/components/Gallery";
import RawHTML from "@js/components/RawHTML";

import Title from "@js/components/Page/Product/Title";
import TopBar from "@js/components/Page/Product/TopBar";
import Summary from "@js/components/Page/Product/Summary";

export default (props) => {
  const { data } = useDataContext();
  const { object } = data;

  return (
    <div className="product" id={`product-${object.id}`}>
      <Title>{object.pagetitle}</Title>
      <TopBar />
      <hr className="mt-1" />

      <Row>
        <Col>
          <Gallery images={object.images} />
        </Col>
        <Col>
          <Summary />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={8}>
          <div className="mb-4">
            <Card.Title className="h4">Описание</Card.Title>
            <Card.Text className="product-content">
              <RawHTML>{object.content}</RawHTML>
            </Card.Text>
          </div>

          <div className="">
            <Card.Title>Преимущества</Card.Title>
            <Card.Text className="product-content">
              <RawHTML>{object.benefits}</RawHTML>
            </Card.Text>
          </div>

          <div className="">
            <div className="h4">Сертификаты и документация</div>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};
