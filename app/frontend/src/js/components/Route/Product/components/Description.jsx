import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Icon from "@js/components/Icon";
import RawHTML from "@js/components/RawHTML";
import { useRequest } from "@js/components/Request";
import RatingStars from "@js/components/Rating/Stars";
import { joinToString } from "@js/utils";
import Context from "../context";

const Description = (props) => {
  const { data } = useContext(Context);
  const { object, visits, reviews, rating } = data;

  return (
    <>
      <Card>
        <Card.Body>
          <div className="">
            <div className="h5">Характеристики</div>

            <Row className="mb-2">
              <Col>Цвет</Col>
              <Col className="text-end">Red</Col>
            </Row>

            <Row className="mb-2">
              <Col>Вес</Col>
              <Col className="text-end">2.3 kg</Col>
            </Row>

            <div className="mt-2x text-center">
              <a href="/">Перейти к описанию</a>
            </div>
          </div>

          <hr className="mb-2x" />

          <div className="mt-4" style={{}}>
            <div className="text-muted">
              <span className="text-danger">Скидка -2%</span>
            </div>

            <div className="fs-4">
              <strike className="text-muted mr-2">{object.old_price}</strike>
              <span style={{ color: "#b60000" }}>{object.price}</span>
              <RawHTML>{object.currency_html_code}</RawHTML>
              <span className="mx-1">/</span>
              <RawHTML>{object.count_unit || "шт"}</RawHTML>
            </div>
          </div>

          <ActionButtonGroup className="mt-2x">
            <ActionButtonToCart />
            <ActionButtonToOrder />
            <ActionButtonToFavorite />
          </ActionButtonGroup>

          <hr className="mt-2 margin-bottom-2x" />
          <div className="fst-italic">* Минимальная сумма заказа 100 руб.</div>
        </Card.Body>
      </Card>
    </>
  );
};

const ActionButtonToCart = (props) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const request = useRequest({
    params: {
      action: "cart/add",
    },
  });

  const handleClick = () => {
    request.send();
  };

  useEffect(() => {
    setIsDisabled(request.result.state === "sending");
  }, [request.result.state]);

  return (
    <>
      <ActionButton
        variant="success"
        iconName="cart2"
        onClick={handleClick}
        disabled={isDisabled}
      >
        В корзину
      </ActionButton>
    </>
  );
};

const ActionButtonToOrder = (props) => {
  const handleClick = () => {};
  return (
    <>
      <ActionButton
        variant="secondary"
        iconName="box-seam"
        onClick={handleClick}
      >
        Заказать сейчас
      </ActionButton>
    </>
  );
};

const ActionButtonToFavorite = (props) => {
  const handleClick = () => {};
  return (
    <>
      <ActionButton iconName="heart" onClick={handleClick} />
    </>
  );
};

const ActionButtonGroup = (props) => {
  const { children, className } = props;

  return (
    <>
      <div
        {...props}
        className={joinToString(
          ["d-flex justify-content-between", className],
          " ",
          true
        )}
      >
        {children}
      </div>
    </>
  );
};

const ActionButton = (props) => {
  const {
    children,
    disabled = false,
    onClick,
    iconName,
    variant = "",
    size = "lg",
  } = props;

  return (
    <Button
      className=""
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon className="mb-1 mr-2" name={iconName} />
      {children}
    </Button>
  );
};

export default Description;
