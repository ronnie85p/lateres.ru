import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Icon from "@js/components/Icon";
import RatingStars from "@js/components/Rating/Stars";
import useDataContext from "@js/components/useDataContext";

export default (props) => {
  const { data } = useDataContext();
  const { rating, questions, orders, visits, reviews } = data;

  return (
    <div className="product-topbar">
      <Row>
        <Col>
          <a href="#questions" className="mr-2">
            <RatingStars rate={rating?.total} size="1.2em" />
            <span className="ml-2">{reviews?.total} отзывов</span>
          </a>

          {questions?.total > 0 ? (
            <>
              <a href="#questions" className="mr-2">
                {questions?.total} вопросов
              </a>
            </>
          ) : (
            <></>
          )}

          {orders?.total > 0 ? (
            <>
              <a href="#orders" className="mr-2">
                {orders?.total} заказов
              </a>
            </>
          ) : (
            <></>
          )}
        </Col>
        <Col className="text-end">
          <Icon name="eye-fill" className="mr-2 mb-1" />
          <span>
            {visits?.total} (+{visits?.today})
          </span>
        </Col>
      </Row>
    </div>
  );
};
