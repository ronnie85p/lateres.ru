import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Summary = (props) => {
  return (
    <>
      <Form onSubmit={null}>
        <Card>
          <Card.Body>
            <Row className="mb-4">
              <Col md="8">
                <div className="fw-bolder m-0 fs-3">Сумма</div>
              </Col>
              <Col
                className="d-flex align-items-end justify-content-end"
                md="4"
              >
                {/* {total?.cart_items_count} <RawHTML>&nbsp;&bull;&nbsp;</RawHTML> {total?.weight} {total?.weight_unit} */}
              </Col>
            </Row>

            <Row className="mb-1 fs-6">
              <Col md="6">Товары</Col>
              <Col md="6 text-end">
                {/* {total?.cart_cost}{" "}
                  <RawHTML>{total?.currency_html_code}</RawHTML> */}
              </Col>
            </Row>

            <Row className="text-danger mb-1 fs-6">
              <Col md="6">Скидка</Col>
              <Col md="6 text-end">
                {/* -{total?.discount_value}{" "}
                  <RawHTML>{total.currency_html_code}</RawHTML> */}
              </Col>
            </Row>

            <Row className="mb-4 fs-6">
              <Col md="6">Налог</Col>
              <Col md="6 text-end">
                {/* {total?.sales_tax > 0 ? (
                    <>
                      {total?.sales_tax}{" "}
                      <RawHTML>{total?.currency_html_code}</RawHTML>
                    </>
                  ) : (
                    "Без НДС"
                  )} */}
              </Col>
            </Row>

            {/* <Row className='fw-bolder fs-4'>
                              <Col md='6'>
                                  Итого
                              </Col>
                              <Col md='6 text-end'>
                                  {total?.cost} <RawHTML>{total?.currency_html_code}</RawHTML>
                              </Col>
                          </Row> */}
          </Card.Body>
        </Card>

        <Button className="btn-block btn-lg" variant="danger" type="submit">
          К оформлению
          <div className="" style={{ fontSize: ".7em", opacity: 0.6 }}>
            {/* {total?.cart_items_count} товара
              {total?.cost} <RawHTML>{total?.currency_html_code}</RawHTML> */}
          </div>
        </Button>
      </Form>
    </>
  );
};

export default Summary;
