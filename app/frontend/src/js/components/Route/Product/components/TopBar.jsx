import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import RatingStars from "@js/components/Rating/Stars";
import Icon from "@js/components/Icon";
import Context from "../context";

const TopBar = (props) => {
  const { data } = useContext(Context);
  const { className } = props;

  const { rating, questions, orders, visits, reviews } = data;

  return (
    <>
      <Row className={className}>
        <Col className="d-flex align-items-center">
          <RatingStars rate={rating} size={"1.2em"} />
          <span className="ml-2">{reviews} отзывов</span>
        </Col>
        <Col className="text-end">
          <span className="">
            <Icon name="eye-fill" className="mr-2" />
            {visits?.totalCount} (+{visits?.todayCount})
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

export default TopBar;
