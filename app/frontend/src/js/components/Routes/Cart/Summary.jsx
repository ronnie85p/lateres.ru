import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import { useRequest } from "@js/components/Request";
import Preloader, { PreloaderParent } from "@js/components/Preloader";
import Button from "@js/components/Form/Button";
import Layer from "@js/components/Page/Layer";

export default (props) => {
  const { data, config, updateData, handlePrepare } = React.useContext(Context);
  const minCost = config.config["app.ordering_cost_from"];
  const isLessMinCost = data.total.cost > 0 && data.total.cost < minCost;
  const disabled = !data.total.cost || isLessMinCost;

  const request = useRequest({
    action: "web/cart/getTotal",
    onSuccess({ object }) {
      updateData({
        status: "changed",
        fields: ["total", "status"],
        total: object,
      });
    },
  });

  React.useEffect(() => {
    if (data.status === "changing") {
      if (request.state !== "pending") {
        request.send();
      }
    }
  }, [request.state, data.status]);

  return (
    <Layer className="sticky-top offset-top-8 mb-0">
      <PreloaderParent>
        <Preloader position="absolute" show={request.state === "pending"} />

        <Row className="mb-4">
          <Col className="h3 fw-bolder m-0">Сумма</Col>
          <Col className="text-end col d-flex align-items-end justify-content-end">
            {data.total.count} товаров
          </Col>
        </Row>

        <Row className="mb-1 fs-6">
          <Col className="">Товары</Col>
          <Col className="text-end">{data.total.old_cost_format}</Col>
        </Row>
        {data.total.discount ? (
          <Row className="mb-1 fs-6 text-danger">
            <Col className="">Скидка</Col>
            <Col className="text-end">-{data.total.discount_format}</Col>
          </Row>
        ) : (
          <></>
        )}
        <Row className="mb-1 fs-6">
          <Col className="">НДС</Col>
          <Col className="text-end">
            {data.total.sales_tax ? data.total.sales_tax_format : <>Без НДС</>}
          </Col>
        </Row>
        {data.total.delivery_cost > 0 ? (
          <Row className="mb-1 fs-6">
            <Col className="">Доставка</Col>
            <Col className="text-end">{data.total.delivery_cost_format}</Col>
          </Row>
        ) : (
          <></>
        )}
        <Row>
          <Col>
            {data.total.delivery_cost ? <a href="№">Подробнее</a> : <></>}
          </Col>
        </Row>

        <hr />
        <Row className="mb-1 fs-4" style={{ fontWeight: 500 }}>
          <Col className="">Итого</Col>
          <Col className="text-end">{data.total.cost_format}</Col>
        </Row>

        <div className="d-grid gap-2 mt-4">
          <Button size="lg" disabled={disabled} onClick={handlePrepare}>
            К оформлению
          </Button>
        </div>

        {isLessMinCost ? (
          <div className="text-danger text-center mt-3">
            Мин. стоимость заказа от {minCost}
          </div>
        ) : (
          <></>
        )}
      </PreloaderParent>
    </Layer>
  );
};
