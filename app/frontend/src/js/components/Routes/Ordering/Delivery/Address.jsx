import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import Form from "@js/components/Form";
import { Line } from "../Components";
import Distance from "./Distance";

export default (props) => {
  const { order } = React.useContext(Context);
  const { address } = order;

  return (
    <>
      {address ? (
        <>
          <Row className="mb-2">
            <Form.Group as={Col}>
              <Form.Label>Адрес доставки</Form.Label>
              {/* <Line iconName="geo-alt"> */}
              <div>{address.text}</div>
              {address.comment ? (
                <div className="my-2">
                  <span>Комментарий</span>
                  <div className="text-muted">{address.comment}</div>
                </div>
              ) : (
                <></>
              )}
              <Link to="/lk/addresses" title="Редактировать">
                Редактировать
              </Link>
              {/* </Line> */}
            </Form.Group>
          </Row>

          <Distance {...address} />
        </>
      ) : (
        <Link to="/lk/addresses" className="text-danger">
          Добавить адрес
        </Link>
      )}
    </>
  );
};
