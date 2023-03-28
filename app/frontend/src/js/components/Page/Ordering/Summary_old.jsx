import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import Context from "@js/contexts/context";
import RawHTML from "@js/components/RawHTML";
import Button from "@js/components/Form/Button";
import { QueryData, useRequest } from "@js/components/Request";
import Preloader from "@js/components/Preloader";

const Summary = (props) => {
  const { config, settings, state, setTotal } = useContext(Context);
  const request = useRequest({
    action: "web/ordering/getTotal",
  });
  const queryDataProps = {
    request,
    Error: ({ error }) => <>{error.message}</>,
  };

  const Output = () => {
    const { object } = request.response;

    return (
      <div className="">
        <Row className="mb-4">
          <Col md="8">
            <div className="fw-bolder fs-3 text-dark">Сумма</div>
          </Col>
          <Col className="d-flex align-items-end justify-content-end"></Col>
        </Row>

        <Row className="mb-1 fs-6">
          <Col md="6">Товары</Col>
          <Col md="6 text-end">
            {object.old_cost_format}{" "}
            <RawHTML>{config.config["app.currency_html_code"]}</RawHTML>
          </Col>
        </Row>

        {object.discount > 0 ? (
          <Row className="text-danger mb-1 fs-6">
            <Col md="6">Скидка</Col>
            <Col md="6 text-end">
              -{object.discount_format}{" "}
              <RawHTML>{config.config["app.currency_html_code"]}</RawHTML>
            </Col>
          </Row>
        ) : (
          <></>
        )}

        <Row className="mb-4 fs-6">
          <Col md="6">Налог</Col>
          <Col md="6 text-end">
            {object.sales_tax > 0 ? (
              <>
                {object.sales_tax_format}{" "}
                <RawHTML>{config.config["app.currency_html_code"]}</RawHTML>
              </>
            ) : (
              "Без НДС"
            )}
          </Col>
        </Row>

        <Row className="mb-4 fs-6">
          <Col md="6">Доставка</Col>
          <Col md="6 text-end">
            {object.delivery_cost > 0 ? (
              <>
                {object.delivery_cost_format}{" "}
                <RawHTML>{config.config["app.currency_html_code"]}</RawHTML>
              </>
            ) : (
              0
            )}
          </Col>
        </Row>

        <hr className="" />

        <Row className="fw-bolder fs-4 mb-4">
          <Col md="6">Итого</Col>
          <Col md="6 text-end">
            {object.cost_format}{" "}
            <RawHTML>{config.config["app.currency_html_code"]}</RawHTML>
          </Col>
        </Row>

        <Button className="btn-block btn-lg" type="submit">
          Сделать заказ
        </Button>
      </div>
    );
  };

  useEffect(() => {
    // if (state.status === "changed") {
    //   console.log("send");
    //   request.send();
    // }

    const { include_tax } = settings;
    request.send({ include_tax });

    if (request.state === "success" && request.response.object) {
      setTotal(request.response.object);
    }
  }, [settings]);

  return (
    <>
      <Card>
        <Card.Body style={{ minHeight: 350 }}>
          <Preloader position="absolute" show={request.state === "pending"} />
          <QueryData {...queryDataProps}>
            <Output />
          </QueryData>
        </Card.Body>
      </Card>

      <div className="mt-1x text-muted">
        Нажимая на кнопку, вы соглашаетесь с Условиями обработки перс. данных, а
        также с Условиями продажи
      </div>
    </>
  );
};

export default Summary;
