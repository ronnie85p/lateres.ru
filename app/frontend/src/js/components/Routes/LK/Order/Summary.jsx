import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default ({ order }) => {
  const {
    status,
    payment,
    old_cart_cost,
    old_cart_cost_format,
    cart_cost_format,
    cost_format,
    delivery_cost_format,
    discount_value,
    discount_value_format,
    sales_tax,
    sales_tax_format,
  } = order;

  return (
    <>
      <div className="fs-5 fw-bolder">
        {status.id === 1 ? "Сумма" : payment.name}
      </div>

      <Row className="mb-1">
        <Col>Товары</Col>
        <Col>{old_cart_cost ? old_cart_cost_format : cart_cost_format}</Col>
      </Row>

      {discount_value ? (
        <Row className="text-danger mb-1">
          <Col>Скидка</Col>
          <Col>- {discount_value_format}</Col>
        </Row>
      ) : (
        <></>
      )}

      <Row className="mb-1">
        <Col>НДС</Col>
        <Col>{sales_tax ? sales_tax_format : "Без НДС"}</Col>
      </Row>

      <Row className="mb-1">
        <Col>Доставка</Col>
        <Col>{delivery_cost_format}</Col>
      </Row>

      <Row className="fs-5 mt-2">
        <Col>Итого</Col>
        <Col>{cost_format}</Col>
      </Row>
    </>
  );
};
