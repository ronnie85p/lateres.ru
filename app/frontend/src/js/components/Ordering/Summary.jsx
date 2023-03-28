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

const Summary = ({
  old_cart_cost,
  cart_cost,
  delivery_cost,
  sales_tax,
  cost,
  discount,
  weight,
  weight_unit,
  count,
  items_count,
  currency_html,
}) => {
  return (
    <>
      <div className="sticky-top offset-top-1">
        <Card>
          <Card.Body>
            <Row className="mb-4">
              <Col md="8">
                <div className="fw-bolder fs-3 text-dark">Ваш заказ</div>
              </Col>
              <Col className="d-flex align-items-end justify-content-end">
                {items_count} <RawHTML>&nbsp;&bull;&nbsp;</RawHTML> {weight}{" "}
                {weight_unit}
              </Col>
            </Row>

            <Row className="mb-1 fs-6">
              <Col md="6">Товары</Col>
              <Col md="6 text-end">
                {old_cart_cost} <RawHTML>{currency_html}</RawHTML>
              </Col>
            </Row>

            <Row className="text-danger mb-1 fs-6">
              <Col md="6">Скидка</Col>
              <Col md="6 text-end">
                -{discount} <RawHTML>{currency_html}</RawHTML>
              </Col>
            </Row>

            <Row className="mb-4 fs-6">
              <Col md="6">Налог</Col>
              <Col md="6 text-end">
                {sales_tax > 0 ? (
                  <>
                    {sales_tax} <RawHTML>{currency_html}</RawHTML>
                  </>
                ) : (
                  "Без НДС"
                )}
              </Col>
            </Row>

            <Row className="mb-4 fs-6">
              <Col md="6">Доставка</Col>
              <Col md="6 text-end">
                {delivery_cost > 0 ? (
                  <>
                    {delivery_cost} <RawHTML>{currency_html}</RawHTML>
                  </>
                ) : (
                  0
                )}
              </Col>
            </Row>

            <hr className="" />

            <Row className="fw-bolder fs-4">
              <Col md="6">Итого</Col>
              <Col md="6 text-end">
                {cost} <RawHTML>{currency_html}</RawHTML>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Button className="btn-block btn-lg" variant="primary" type="submit">
          Сделать заказ
        </Button>

        <div className="mt-2 text-muted">
          Нажимая на кнопку, вы соглашаетесь с Условиями обработки перс. данных,
          а также с Условиями продажи
        </div>
      </div>
    </>
  );
};

export default Summary;
