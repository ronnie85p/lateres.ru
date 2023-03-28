import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Image from "@js/components/Image";
import RawHTML from "@js/components/RawHTML";
import { Title, Layer } from "./Components";

export default (props) => {
  const { order } = useContext(Context);
  const { products } = order;

  return (
    <div {...props}>
      <Title>Товары</Title>

      {products?.map((item) => (
        <Product {...item} key={item.id} />
      ))}
    </div>
  );
};

const Product = (props) => {
  const { config } = useContext(Context);

  const {
    id,
    image,
    name,
    count,
    measure_unit,
    price_format,
    weight_format,
    cost_format,
    old_price_format,
  } = props;

  return (
    <Layer>
      <Row>
        <Col className="d-flex">
          <Image className="mr-4" src={image} width={110} rounded />
          <div>
            <div className="fs-6 mb-2">{name}</div>
            <div>
              Цена {price_format}{" "}
              <RawHTML>{config.config["app.currency_html_code"]}</RawHTML> x{" "}
              {count} {measure_unit}
            </div>
          </div>
        </Col>

        <Col className="d-flex align-items-center justify-content-end" md={4}>
          <div>
            <div className="text-muted">
              Вес {weight_format} {config.config["app.weight_unit"]}
            </div>
            <div className="fs-6 fw-bolder mt-2">
              = {cost_format}{" "}
              <RawHTML>{config.config["app.currency_html_code"]}</RawHTML>
            </div>
          </div>
        </Col>
      </Row>
    </Layer>
  );
};
