import React, {
  useState,
  useMemo,
  useReducer,
  useContext,
  useId,
  useEffect,
} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import Context from "@js/contexts/context";
import RawHTML from "@js/components/RawHTML";

const Products = (props) => {
  const { products } = props;

  return products?.map((item) => <Product key={item.id} {...item} />);
};

const Product = ({
  id,
  image,
  name,
  price,
  currency_html_code,
  count,
  count_unit,
  weight,
  weight_unit,
  cost,
}) => {
  return (
    <>
      <div className="rounded bg-white p-2 mb-3">
        <Row>
          <Col className="d-flex">
            <Image className="mr-4" src={image} width="50px" rounded />
            <div>
              <div className="fs-6 mb-2">{name}</div>
              <div>
                Цена {price} <RawHTML>{currency_html_code}</RawHTML> x {count}{" "}
                {count_unit}
              </div>
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-end" md={4}>
            <div>
              <div className="text-muted">
                Вес {weight} {weight_unit}
              </div>
              <div className="fs-6 fw-bolder mt-2">
                = {cost} <RawHTML>{currency_html_code}</RawHTML>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Products;
