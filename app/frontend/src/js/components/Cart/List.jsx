import React, { useState, useContext, useEffect, createRef } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import Context from "@js/contexts/context";
import Preloader from "@js/components/Preloader";
import InputCounter from "@js/components/Form/InputCounter";
import FetchList from "@js/components/FetchList";
import RawHTML from "@js/components/RawHTML";
import { sendRequest } from "@js/components/Request";
import getResults from "@js/loaders/getResults";

const List = (props) => {
  const loader = () => getResults("web/cart/getList");

  return (
    <>
      <FetchList
        loader={loader}
        FallbackComponent={() => <Preloader />}
        EmptyComponent={() => <>Empty list</>}
        ItemComponent={(item) => <Item key={item.id} {...item} />}
      />
    </>
  );
};

const Item = (props) => {
  const {
    id,
    cart_key,
    uri,
    cost,
    pagetitle,
    description,
    image,
    price,
    old_price,
    discount,
    count_unit,
    currency_html_code,
    count,
    left_count,
  } = props;

  const context = useContext(Context);
  const [sending, setSending] = useState(false);
  const containerRef = createRef(null);

  const handleCountChange = async (event) => {
    setSending(true);

    const count = parseInt(event.target.value);
    const response = await sendRequest(
      count > 0 ? "web/cart/update" : "web/cart/remove",
      {
        key: cart_key,
        count,
      },
      { return: "data" }
    );

    if (response.success) {
    }

    setSending(false);
  };

  const handleCheckOrUncheck = (e) => {
    // context.dispatchCartItems({
    //   action: "change",
    //   key: cart_key,
    //   value: { checked: e.currentTarget.checked },
    // });
    // const cartItems = context.cartItems;
    // cartItems[cart_key] = {
    //   ...cartItems[cart_key],
    //   checked: e.currentTarget.checked,
    // };
    // context.setCartItems(cartItems);
    // context.cartItems[cart_key] = {
    //   ...context.cartItems[cart_key],
    //   checked: e.currentTarget.checked,
    // };
    // context.setCartItems({ checked: e.currentTarget.checked });
  };

  useEffect(() => {
    // context.dispatchCartItems({
    //   action: "set",
    //   key: cart_key,
    //   value: { props, containerRef },
    // });
    // const cartItems = context.cartItems;
    // cartItems[cart_key] = { props, containerRef };
    // context.setCartItems(cartItems);
    // context.cartItems[cart_key] = { props, containerRef };
    // context.setCartItems({ props, containerRef });
  }, []);

  return (
    <>
      <div className="border-bottom mb-4 py-4" ref={containerRef}>
        <Row>
          <Col md="9">
            <div className="d-flex">
              <Form.Check
                type="checkbox"
                name={`check_${id}`}
                id={`check-${id}`}
                className="d-flex align-items-center mr-4"
                onChange={handleCheckOrUncheck}
              />

              <Image
                className="mr-4"
                src={image}
                alt={pagetitle}
                width={150}
                rounded
              />

              <div className="overflow-hidden">
                <div className="mb-1" style={{ fontSize: "1.2em" }}>
                  <a href={uri} target="_blanc">
                    {pagetitle}
                  </a>
                </div>

                <div className="text-muted text-truncate">{description}</div>

                <div className="mt-2">
                  Цена {price} <RawHTML>{currency_html_code}&nbsp;</RawHTML> за
                  {count_unit}
                </div>

                <div className="text-danger">
                  Скидка -{discount} <RawHTML>{currency_html_code}</RawHTML>
                </div>
              </div>
            </div>
          </Col>

          <Col md="3">
            <InputCounter
              name="count"
              value={count}
              minValue={0}
              disabled={sending}
              onChange={handleCountChange}
            />

            <div className="text-danger text-center small mt-1">
              Осталось {left_count} {count_unit}
            </div>

            <div className="text-center" style={{ fontSize: "1.3em" }}>
              {cost} <RawHTML>{currency_html_code}</RawHTML>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default List;
