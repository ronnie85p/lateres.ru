import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Context from "@js/contexts/context";
import Container from "@js/components/Page/Container";
import InputCounter from "@js/components/Form/InputCounter";
import { useLoaderData } from "@js/components/Router";
import Icon from "@js/components/Icon";
import RatingStars from "@js/components/Rating/Stars";
import AppGallery from "@js/components/Gallery";
import RawHTML from "@js/components/RawHTML";
import { Link } from "@js/components/Router";
import FetchList from "@js/components/FetchList";
import { sendRequest } from "@js/components/Request";
import { getProducts, getVisitProducts } from "@js/loaders/products";
import Preloader from "@js/components/Preloader";
import ProductList from "@js/components/Product/List";
import ProductVisits from "@js/components/Product/Visits";

export default (props) => {
  const context = useContext(Context);
  const data = useLoaderData();
  context.data = data;

  return (
    <>
      <Container>
        <Title />
        <Topbar />
        <hr className="mt-0 mb-2" />

        <Row className="mb-2x">
          <Col>
            <Gallery />
          </Col>
          <Col>
            <Summary />
          </Col>
        </Row>

        <Row>
          <Col>
            <Content />
          </Col>
        </Row>

        <ProductList
          title="Товары в этой категории"
          params={{ parent: data?.object?.parent }}
        />
        <ProductVisits />
      </Container>
    </>
  );
};

const Gallery = (props) => {
  const { data } = useContext(Context);
  const { object } = data;

  return (
    <>
      <AppGallery images={object?.images} />
    </>
  );
};

const Summary = (props) => {
  const { data } = useContext(Context);
  const { object } = data;

  const handleFavorite = () => {};

  return (
    <>
      <Card>
        <Card.Body>
          {/* <div className="">
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

          <hr className="mb-2x" /> */}

          <div className="mt-4" style={{}}>
            <div className="text-muted">
              <span className="text-danger">Скидка -2%</span>
            </div>

            <div className="fs-4">
              <strike className="text-muted mr-2">{object?.old_price}</strike>
              <span style={{ color: "#b60000" }}>{object?.price}</span>
              {/* <RawHTML>{object?.currency_html_code}</RawHTML> */}
              <span className="mx-1">/</span>
              {/* <RawHTML>{object?.count_unit || "шт"}</RawHTML> */}
            </div>
          </div>

          <ActionButtons />

          <hr className="mt-2 margin-bottom-2x" />
          <div className="fst-italic">* Минимальная сумма заказа 100 руб.</div>
        </Card.Body>
      </Card>
    </>
  );
};

const ActionButtons = (props) => {
  return (
    <>
      <div className="d-flex mt-4">
        <ActionButtonInCart className="mr-2" />
        <ActionButtonBuyNow className="mr-2" />
        <ActionButtonFavorite />
      </div>
    </>
  );
};

const ActionButtonInCart = (props) => {
  const { data } = useContext(Context);
  const [sending, setSending] = useState(false);
  const [inCart, setInCart] = useState(data.cart?.count);

  const handleClick = async () => {
    setSending(true);

    const response = await sendRequest(
      "web/cart/add",
      {
        product_id: data?.object?.id,
      },
      { return: "data" }
    );

    if (response.success) {
      setInCart(response.count);
    }

    setSending(false);
  };

  const handleCartChange = async (event) => {
    setSending(true);

    const count = parseInt(event.target.value);
    const response = await sendRequest(
      count > 0 ? "web/cart/update" : "web/cart/remove",
      {
        key: data.cart?.id,
        count,
      },
      { return: "data" }
    );

    if (response.success) {
      setInCart(response.object.count);
    }

    setSending(false);
  };

  return (
    <>
      {inCart > 0 ? (
        <CartCounter
          onChange={handleCartChange}
          value={inCart}
          disabled={sending}
        />
      ) : (
        <Button
          variant="primary"
          {...props}
          onClick={handleClick}
          disabled={sending}
        >
          <Icon name="cart" /> В корзину
        </Button>
      )}
    </>
  );
};

const ActionButtonBuyNow = (props) => {
  const [sending, setSending] = useState(false);
  const handleClick = () => {
    setSending(true);

    setTimeout(() => {
      setSending(false);
    }, 3000);
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        {...props}
        onClick={handleClick}
        disabled={sending}
      >
        <Icon name="bag" /> Купить сейчас
      </Button>
    </>
  );
};

const ActionButtonFavorite = (props) => {
  const { data } = useContext(Context);
  const [sending, setSending] = useState(false);
  const [isFavorite, setIsFavorite] = useState(data.is_favorite);

  const icons = [
    {
      name: "heart",
      className: "",
    },
    {
      name: "heart-fill",
      className: "text-danger",
    },
  ];

  const icon = icons[isFavorite ? 1 : 0];

  const handleClick = async () => {
    setSending(true);

    const response = await sendRequest(
      isFavorite
        ? "web/product/favorite/remove"
        : "web/product/favorite/create",
      {
        product_id: data?.object?.id,
      },
      { return: "data" }
    );

    if (response.success) {
      setIsFavorite(!isFavorite);
    }

    setSending(false);
  };

  return (
    <>
      <Button variant="" {...props} onClick={handleClick} disabled={sending}>
        <Icon size={"1.3em"} {...icon} />
      </Button>
    </>
  );
};

const CartCounter = (props) => {
  return (
    <>
      <Form className="mr-2">
        <InputCounter
          name="count"
          minValue={0}
          groupProps={{ style: { width: 200 } }}
          {...props}
        />
      </Form>
    </>
  );
};

const Content = (props) => {
  const { data } = useContext(Context);
  const { object } = data;

  return (
    <>
      <ContentCard title={"Описание"} id={"content"} asHTML>
        {object?.content}
      </ContentCard>

      <ContentCard title={"Преимущества"} id={"benefits"} asHTML>
        {object?.benefits}
      </ContentCard>

      <ContentCard
        title={"Сертификаты и документация"}
        id={"certs_and_docs"}
        asHTML
      >
        {object?.certs_and_docs}
      </ContentCard>

      <ContentCard title={"Характеристики"} id={"features"} asHTML>
        {object?.features}
      </ContentCard>
    </>
  );
};

const ContentTitle = (props) => {
  const { children } = props;

  return <>{children}</>;
};

const ContentCard = (props) => {
  const { id, title, children, className, asHTML } = props;

  return (
    <>
      <Card className={"mb-2 " + className}>
        <Card.Body>
          <h2 className="h4" id={id} style={{ fontWeight: 500 }}>
            {title}
          </h2>

          {asHTML ? (
            <>
              <RawHTML>{children}</RawHTML>
            </>
          ) : (
            children
          )}
        </Card.Body>
      </Card>
    </>
  );
};

const Title = (props) => {
  const { data } = useContext(Context);
  const { object } = data;

  return (
    <>
      <h1 className="h4 mb-3" style={{ fontWeight: 500 }}>
        {object?.pagetitle}
      </h1>
    </>
  );
};

const Topbar = (props) => {
  const { data } = useContext(Context);
  const { object, rating, reviews, visits } = data;

  return (
    <>
      <Row className="mb-2">
        <Col className="d-flex align-items-center">
          <RatingStars rate={rating?.total} size={"1.2em"} />
          <span className="ml-2">{reviews?.total} отзывов</span>
        </Col>
        <Col className="text-end">
          <span className="">
            <Icon name="eye-fill" className="mr-2" />
            {visits?.total} (+{visits?.today})
          </span>
        </Col>

        {/* <Col>
          <a href="#reviews" className="mr-2">
            <RatingStars rate={rating} className="mr-2" />{" "}
            {reviews ? <>{reviews} отзывов</> : <></>}
          </a>

          {questions ? (
            <a href="#questions" className="mr-2">
              {questions} вопросов
            </a>
          ) : (
            <></>
          )}

          {orders ? (
            <a href="#orders" className="mr-2">
              {orders} заказов
            </a>
          ) : (
            <></>
          )}
        </Col> */}

        {/* <Col className='text-end'>
                <span className="">Просмотры: {visits?.totalCount} (сегодня: +{visits?.todayCount})</span>
            </Col> */}
      </Row>
    </>
  );
};
