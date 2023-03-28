import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Preloader, { PreloaderParent } from "@js/components/Preloader";
import RawHTML from "@js/components/RawHTML";
import { useRequest } from "@js/components/Request";
import Layer from "@js/components/Page/Layer";
import Button from "@js/components/Form/Button";

var object = {};

export default (props) => {
  const { form, config } = React.useContext(Context);
  const request = useRequest({
    action: "web/ordering/getTotal",
    data: {
      include_tax: form.values.include_tax,
      delivery_car: form.values.delivery_car,
      distance: 0,
    },
  });

  React.useEffect(() => {
    request.send();
  }, [
    form.values.include_tax,
    form.values.payment,
    form.values.delivery,
    form.values.delivery_car,
  ]);

  if (request.state === "success") {
    object = request.response?.object || {};
  }

  return (
    <Layer className="sticky-top offset-top-8 mb-0">
      <PreloaderParent>
        <Preloader position="absolute" show={request.state === "pending"} />

        <div className="h3 fw-bolder">
          <Row>
            <Col>Сумма</Col>
            <Col className="text-end">
              {/* Вес {data.weight} {config.config["app.weight_unit"]} */}
            </Col>
          </Row>
        </div>
        <Row className="mb-1 fs-6">
          <Col className="">Товары</Col>
          <Col className="text-end">
            {object.old_cost ? object.old_cost_format : 0}{" "}
            <RawHTML>{config.config["app.currency_html_code"]}</RawHTML>
          </Col>
        </Row>
        {object.discount ? (
          <Row className="mb-1 fs-6 text-danger">
            <Col className="">Скидка</Col>
            <Col className="text-end">
              -{object.discount_format}{" "}
              <RawHTML>{config.config["app.currency_html_code"]}</RawHTML>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        <Row className="mb-1 fs-6">
          <Col className="">НДС</Col>
          <Col className="text-end">
            {object.sales_tax ? (
              <>
                {object.sales_tax_format}{" "}
                <RawHTML>{config.config["app.currency_html_code"]}</RawHTML>
              </>
            ) : (
              <>Без НДС</>
            )}
          </Col>
        </Row>
        <Row className="mb-1 fs-6">
          <Col className="">Доставка</Col>
          <Col className="text-end">
            {object.delivery_cost ? object.delivery_cost_format : 0}{" "}
            <RawHTML>{config.config["app.currency_html_code"]}</RawHTML>
          </Col>
        </Row>
        <Row>
          <Col>{object.delivery_cost ? <a href="№">Подробнее</a> : <></>}</Col>
        </Row>

        <hr />
        <Row className="mb-1 fs-4" style={{ fontWeight: 500 }}>
          <Col className="">Итого</Col>
          <Col className="text-end">
            {object.cost ? object.cost_format : 0}{" "}
            <RawHTML>{config.config["app.currency_html_code"]}</RawHTML>
          </Col>
        </Row>

        <div className="d-grid gap-2 mt-4">
          <Button type="submit" size="lg">
            Сделать заказ
          </Button>
        </div>
      </PreloaderParent>
    </Layer>
  );
};
