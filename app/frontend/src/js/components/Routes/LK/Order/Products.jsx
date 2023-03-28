import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "@js/components/Image";
import Layer from "@js/components/Page/Layer";

export default (props) => {
  const { products, status } = props;

  return (
    <>
      <div className="fs-5 fw-bolder mb-3">Товары</div>
      {products.map((item) => (
        <Layer className="mb-2" key={item.id}>
          <Row>
            <Col md="2">
              <Image src={item.image} />
            </Col>
            <Col>
              <div className="h5">{item.name}</div>
              <div className="">
                Цена {item.price_format} / {item.measure_unit}
              </div>
            </Col>
            <Col className="text-end" md="2">
              <div>x {item.count}</div>
              <div>{item.weight_format}</div>
              <div className="fs-6 mt-2">{item.cost_format}</div>
            </Col>
          </Row>
          <Row>
            <Col className="text-end">
              {/* {status.id === 6 ? (
                  <Button variant="secondary">Возврат</Button>
                ) : (
                  <></>
                )} */}
            </Col>
          </Row>
        </Layer>
      ))}
    </>
  );
};
