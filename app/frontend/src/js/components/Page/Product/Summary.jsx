import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import RawHTML from "@js/components/RawHTML";
import { useRequest } from "@js/components/Request";
import Icon from "@js/components/Icon";
import Button from "@js/components/Form/Button";
import InputCounter from "@js/components/Form/InputCounter";
import useDataContext from "@js/components/useDataContext";

export default (props) => {
  const { data, config } = useDataContext();
  const { object, cart, is_favorite } = data;

  return (
    <div className="product-summary">
      <div className="h5">Характеристики</div>

      <div className="product-options">
        {object.options.map((item) => (
          <Row key={item.title}>
            <Col className="text-muted">{item.title}</Col>
            <Col>{item.value}</Col>
          </Row>
        ))}
      </div>

      <hr />

      <div className="product-price mb-4">
        <Row>
          <Col>
            <span className="fs-4">
              <strike>{object.old_price}</strike> {object.price} /{" "}
              {object.measure_unit}
            </span>
          </Col>
          <Col className="text-end text-danger">-{object.discount}%</Col>
        </Row>
      </div>

      <div className="product-buttons">
        <Row>
          <Col>
            <LayerInCart object={object} cart={cart} />
          </Col>
          <Col className="d-flex align-items-center justify-content-end">
            <ButtonFavorite object={object} is_favorite={is_favorite} />
          </Col>
        </Row>
      </div>

      <hr />

      <div className="">
        <div className="h6">Способы получения</div>
        <p>
          Минимальная сумма заказа 100 руб. Доставка транспортом компании
          (манипулятор, шаланда или малотоннажный транспорт) и Самовывоз по
          адресу производства. Для расчёта доставки положите товар в корзину и
          перейдите по ссылке в корзину, затем укажите адрес доставки.
          Рассчитать
        </p>
      </div>

      <div className="">
        <div className="h6">Сроки получения</div>
        <p>
          Сроки получения товара В день заказа - если заказ сделан до 14:00, на
          следующий рабочий день - если заказ сделан после 14:00. В связи с
          загруженностью производства могут увеличиваться сроки изготовления на
          отдельные виды изделий до 6-9 дней.
        </p>
      </div>

      <hr />
      <div className="">ID: {object.id}</div>
    </div>
  );
};

const LayerInCart = (props) => {
  const { object, cart: _cart = {} } = props;
  const [cart, setCart] = useState(_cart);

  const onSuccess = (request) => {
    console.log("success", request);
    const response = request.response;
    if (response.success) {
      setCart({ ...cart, key: response.key, count: 1 });
    }
  };

  return (
    <>
      {cart.count > 0 ? (
        <>
          <InputInCart onSuccess={onSuccess} cart={cart} />
          <div className="mb-2"></div>
          <a href="">Перейти в корзину</a>
        </>
      ) : (
        <>
          <ButtonInCart onSuccess={onSuccess} object={object}>
            <Icon name="cart" /> В корзину
          </ButtonInCart>
          <ButtonClickBuy>
            <Icon name="bag" /> Купить сейчас
          </ButtonClickBuy>
        </>
      )}
    </>
  );
};

const ButtonInCart = (props) => {
  const { children, object, onSuccess } = props;
  const request = useRequest({
    action: "web/cart/add",
    data: {
      product_id: object.id,
    },
  });

  const handleClick = () => {
    request.send();
  };

  React.useEffect(() => {
    if (request.isSuccess) {
      onSuccess && onSuccess(request);
    }
  }, [request]);

  return (
    <Button
      className="mr-2 fs-6 py-1"
      variant="success"
      onClick={handleClick}
      disabled={request.isPending}
    >
      {children}
    </Button>
  );
};

const InputInCart = (props) => {
  const { cart } = props;
  const request = useRequest({
    action: "web/cart/update",
    data: {
      key: cart.id,
    },
  });

  const handleChange = (event) => {
    const _this = event.currentTarget;

    request.send({ count: _this.value });
  };

  return (
    <InputCounter
      value={cart.count}
      disabled={request.isPending}
      onChange={handleChange}
    />
  );
};

const ButtonClickBuy = (props) => {
  const { children } = props;
  const request = useRequest({
    action: "",
  });

  const handleClick = (event) => {};

  return (
    <Button
      className="mr-2 fs-6 py-1"
      variant="outline-secondary"
      disabled={request.isPending}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

const ButtonFavorite = (props) => {
  const { is_favorite, object } = props;

  return is_favorite ? (
    <ButtonFavoriteRemove {...props} />
  ) : (
    <ButtonFavoriteCreate {...props} />
  );
};

const ButtonFavoriteCreate = (props) => {
  const { object } = props;
  const request = useRequest({
    action: "web/product/favorite/create",
    data: {
      product_id: object.id,
    },
  });

  const handleClick = (event) => {
    event.preventDefault();

    request.send();
  };

  return (
    <a
      href="#"
      className="text-decoration-none"
      disabled={request.isPending}
      onClick={handleClick}
    >
      <Icon name="heart" size="1.3em" />
    </a>
  );
};

const ButtonFavoriteRemove = (props) => {
  const { object } = props;
  const request = useRequest({
    action: "web/product/favorite/remove",
    data: {
      product_id: object.id,
    },
  });

  const handleClick = (event) => {
    event.preventDefault();

    request.send();
  };

  return (
    <a
      href="#"
      className="text-decoration-none text-danger"
      disabled={request.isPending}
      onClick={handleClick}
    >
      <Icon name="heart-fill" size="1.3em" />
    </a>
  );
};
