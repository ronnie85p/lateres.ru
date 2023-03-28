import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import { useRequest } from "@js/components/Request";
import Preloader from "@js/components/Preloader";
import Icon from "@js/components/Icon";
import Form from "@js/components/Form";
import Media from "@js/components/Media";
import InputCounter from "@js/components/Form/InputCounter";

export default (props) => {
  const { data } = React.useContext(Context);

  return (
    <>
      {data.items.map((item) => {
        return item.published ? (
          <Item key={item.id} {...item} />
        ) : (
          <UnpublishItem key={item.id} {...item} />
        );
      })}
    </>
  );
};

const Item = (props) => {
  const { data, updateData } = React.useContext(Context);
  const {
    id,
    image,
    count,
    name,
    description,
    cost_format,
    old_cost_format,
    price_format,
    weight_format,
    measure_unit,
    checked: pchecked,
    url,
  } = props;

  const [checked, setChecked] = React.useState(pchecked);

  const requestCheck = useRequest({
    action: "web/cart/setChecked",
    data: { keys: [id] },
  });

  const requestUpdate = useRequest({
    action: "web/cart/update",
    data: { key: id },
  });

  const requestRemove = useRequest({
    action: "web/cart/remove",
    data: { keys: [id] },
  });

  const handleUpdate = (event) => {
    let _this = event.currentTarget;

    requestUpdate
      .send({ count: _this.value })
      .then(({ object }) => {
        const items = data.items;
        const index = data.items.findIndex((item) => item.id === id);
        items[index] = object;

        updateData({
          fields: ["items", "status"],
          items,
          status: object.checked ? "changing" : "none",
        });
      })
      .catch((error) => {
        updateData({ fields: ["error", "status"], error, status: "error" });
      });
  };

  const handleRemove = (event) => {
    if (!confirm("Удалить товар из корзины?")) return false;

    requestRemove
      .send()
      .then(() => {
        let index = data.items.findIndex((item) => item.id === id);
        let item = data.items.splice(index, 1)[0];

        if (data.items.length > 0) {
          updateData({
            fields: ["items", "status"],
            items: data.items,
            status: item.checked ? "changing" : "none",
          });
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        updateData({ fields: ["error", "status"], error, status: "error" });
      });
  };

  const handleChangeCheck = (event) => {
    let _this = event.currentTarget;
    let checked = _this.checked;

    setChecked(checked);
    requestCheck
      .send({ checked })
      .then(({ object }) => {
        if (!object.keys[0]) return;

        const items = data.items;
        const index = data.items.findIndex(
          (item) => item.id === object.keys[0]
        );

        items[index] = { ...items[index], checked };
        updateData({ fields: ["items", "status"], items, status: "changing" });
      })
      .catch((error) =>
        updateData({ fields: ["error", "status"], error, status: "error" })
      );
  };

  React.useEffect(() => {
    setChecked(pchecked);
  }, [pchecked]);

  return (
    <Media className="cart-item" style={{ opacity: checked ? 1 : 0.9 }}>
      <Preloader show={requestRemove.state === "pending"} />
      <Form.Check
        type="checkbox"
        name="check"
        className="mr-4"
        id={`item-check-${id}`}
        checked={checked}
        onChange={handleChangeCheck}
      />
      <Media.Image src={image} width={120} rounded />
      <Media.Body>
        <Row>
          <Col md="8">
            <div className="fs-6 mb-2 text-truncate">
              <Link to={url} target="blanc_">
                {name}
              </Link>
            </div>
            <div className="text-muted">{description}</div>
          </Col>
          <Col md="4">
            <ActionButtons>
              <ActionButtonFavorite {...props} />
              <ActionButtonRemove onClick={handleRemove} />
            </ActionButtons>

            <InputCounter
              value={count}
              disabled={requestUpdate.state === "pending"}
              onChange={handleUpdate}
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex align-items-end">
            <div className="">
              Цена {price_format} / {measure_unit}
            </div>
          </Col>
          <Col className="text-end">
            <div className="mt-3">
              <strike className="text-muted mr-2 fs-6">
                {old_cost_format}
              </strike>
              <span className="fs-5">{cost_format}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-end text-muted">Вес {weight_format}</Col>
        </Row>
      </Media.Body>
    </Media>
  );
};

const ActionButtons = (props) => {
  const { children } = props;
  return <div className="mb-3 text-end">{children}</div>;
};

const ActionButtonFavorite = (props) => {
  const { product_id } = props;
  const [favorite, setFavorite] = React.useState(props.favorite);

  const requestAdd = useRequest({
    action: "web/product/favorite/create",
    data: { product_id },
  });

  const requestRemove = useRequest({
    action: "web/product/favorite/remove",
    data: { product_id },
  });

  const handleAdd = (event) => {
    requestAdd
      .send()
      .then(() => {
        setFavorite(true);
      })
      .catch((error) => {});
  };

  const handleRemove = (event) => {
    requestRemove
      .send()
      .then(() => {
        setFavorite(false);
      })
      .catch((error) => {});
  };

  const ButtonAdd = (
    <span className="mr-3" title="Добавить в избранное" onClick={handleAdd}>
      <Icon name="heart" size="1.4em" />
    </span>
  );

  const ButtonRemove = (
    <span
      className="mr-3 text-danger"
      title="Удалить из избранное"
      onClick={handleRemove}
    >
      <Icon name="heart-fill" size="1.4em" />
    </span>
  );

  return favorite ? ButtonRemove : ButtonAdd;
};

const ActionButtonRemove = (props) => {
  return (
    <span title="Удалить" {...props}>
      <Icon name="trash" size="1.4em" />
    </span>
  );
};

const UnpublishItem = (props) => {
  const { id, image, name, description } = props;

  const style = {
    opacity: 0.5,
    pointerEvents: "none",
  };

  return (
    <Media
      className="mb-2 border rounded px-2 py-4 bg-white cart-item"
      id={`cart-item-${id}`}
    >
      <Form.Check
        className="mr-4"
        type="checkbox"
        name="check"
        id={`item-check-${id}`}
        style={style}
      />
      <Media.Image src={image} width={110} rounded style={style} />
      <Media.Body>
        <Row>
          <Col md={8}>
            <h2 className="h6 text-truncate" title={name} style={style}>
              {name}
            </h2>
            <p className="text-muted">
              <span class="text-danger">
                Товар закончился или снят с реализации
              </span>
            </p>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Media.Body>
    </Media>
  );
};
