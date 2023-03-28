import React from "react";
import { Link } from "react-router-dom";
import Button from "@js/components/Form/Button";
import Icon from "@js/components/Icon";
import { useRequest } from "@js/components/Request";

const ActionButtonFavoriteCreate = (props) => {
  const { product_id, setActive } = props;

  const request = useRequest({
    action: "web/favorite/create",
    data: { product_id },
    onSuccess() {
      setActive(true);
    },
  });

  const handleClick = () => {
    request.send();
  };

  const style =
    request.state === "pending"
      ? { opacity: 0.5, pointerEvents: "none " }
      : null;

  return (
    <Icon
      name="heart-fill"
      title="Добавить в избранное"
      size="1.6em"
      style={{ cursor: "pointer", ...style }}
      onClick={handleClick}
    />
  );
};

const ActionButtonFavoriteRemove = (props) => {
  const { product_id, setActive } = props;

  const request = useRequest({
    action: "web/favorite/remove",
    data: { product_id },
    onSuccess() {
      setActive(false);
    },
  });

  const handleClick = () => {
    request.send();
  };

  const style =
    request.state === "pending"
      ? { opacity: 0.5, pointerEvents: "none " }
      : null;

  return (
    <Icon
      name="heart-fill"
      title="Удалить из избранное"
      size="1.6em"
      className="text-danger"
      style={{ cursor: "pointer", ...style }}
      onClick={handleClick}
    />
  );
};

const ActionButtonFavorite = (props) => {
  const [active, setActive] = React.useState(props.active);

  if (active) {
    return <ActionButtonFavoriteRemove setActive={setActive} {...props} />;
  }

  return <ActionButtonFavoriteCreate setActive={setActive} {...props} />;
};

const ActionButtonToCart = (props) => {
  return (
    <Button
      as={Link}
      to="/cart"
      variant="warning"
      className="btn-block"
      style={{ color: "#59310e" }}
    >
      <Icon name="cart-check" /> В корзину
    </Button>
  );
};

const ActionButtonAddCart = (props) => {
  const { product_id, setInCart } = props;

  const request = useRequest({
    action: "web/cart/add",
    data: { product_id },
    onSuccess() {
      setInCart(true);
    },
  });

  const handleClick = () => {
    request.send();
  };

  return (
    <Button
      variant="success"
      className="btn-block"
      onClick={handleClick}
      loading={request.state === "pending"}
      loadingText={"Добавляем..."}
    >
      <Icon name="cart4" /> В корзину
    </Button>
  );
};

const ActionInCart = (props) => {
  const [inCart, setInCart] = React.useState(props.inCart);

  if (inCart) {
    return <ActionButtonToCart setInCart={setInCart} {...props} />;
  }

  return <ActionButtonAddCart setInCart={setInCart} {...props} />;
};

export {
  ActionButtonAddCart,
  ActionButtonToCart,
  ActionInCart,
  ActionButtonFavorite,
  ActionButtonFavoriteCreate,
  ActionButtonFavoriteRemove,
};
