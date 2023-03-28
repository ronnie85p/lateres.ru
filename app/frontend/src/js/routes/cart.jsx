import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Button from "@js/components/Form/Button";
import Preloader from "@js/components/Preloader";

import Container from "@js/components/Page/Container";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";
import { sendRequest } from "@js/components/Request";
import Summary from "@js/components/Routes/Cart/Summary";
import Items from "@js/components/Routes/Cart/Items";
import Controls from "@js/components/Routes/Cart/Controls";

export default (props) => {
  const context = React.useContext(Context);
  const navigate = useNavigate();
  const [resource, items] = useLoaderData();
  const [data, updateData] = React.useReducer(
    (state, action) => {
      let fields = action.fields || [];
      if (action.field) {
        fields.push(action.field);
      }

      let data = state;
      for (let i in fields) {
        let field = fields[i];
        if (field in state) {
          let value = action[field];
          data = { ...data, [field]: value };
        }
      }

      return data;
    },
    {
      items,
      total: {},
      error: null,
      preloader: false,
      status: "changing",
    }
  );

  const handlePrepare = () => {
    updateData({ field: "preloader", preloader: true });
    sendRequest("web/ordering/prepare")
      .then(({ object }) => {
        if (object.redirect) {
          navigate(`/${object.redirect}`);
        }
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        updateData({ field: "preloader", preloader: false });
      });
  };

  const checkedItems = data.items
    .filter((item) => {
      return Boolean(item.checked) === true;
    })
    .map((item) => item.id);

  return (
    <Context.Provider
      value={{
        ...context,
        resource,
        data,
        checkedItems,
        updateData,
        handlePrepare,
      }}
    >
      <Preloader show={data.preloader} />
      <Container className="cart">
        <Title>
          <Title.Text>
            {resource.pagetitle}{" "}
            {data.items.length > 0 ? `(${checkedItems.length})` : ""}
          </Title.Text>
        </Title>

        {items.length > 0 ? <Content /> : <>Вы еще ничего не добавляли</>}
      </Container>
    </Context.Provider>
  );
};

const Content = (props) => {
  const { data, handlePrepare } = React.useContext(Context);

  return (
    <>
      <Row>
        <Col md={8}>
          <Output />
        </Col>
        <Col md={4}>
          <Summary />
        </Col>
      </Row>

      <hr />

      <Row>
        <Col>
          <Button
            as={Link}
            to={`/factory/delivery?weight=${data.total.weight}&from_cart`}
            variant="success"
            className="mr-2"
          >
            Рассчитать доставку
          </Button>
          <Button variant="success" onClick={handlePrepare}>
            Коммерческое предложение
          </Button>
        </Col>
      </Row>
    </>
  );
};

const Output = (props) => {
  const { data } = React.useContext(Context);

  return (
    <>
      <Layer>
        <Controls />
        <hr className="mb-4" />
        <Items />
      </Layer>

      <Row className="mt-4">
        <Col className="text-end fs-6 text-muted">
          Общий вес {data.total.weight > 0 ? data.total.weight_format : 0}
        </Col>
      </Row>
    </>
  );
};
