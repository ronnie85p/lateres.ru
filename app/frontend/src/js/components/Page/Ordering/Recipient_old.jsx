import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { Form } from "@js/components/Form";
import { Title, Layer } from "./Components";

export default (props) => {
  const { order } = useContext(Context);
  const { fullname, mobilephone, user_type } = order.recipient;

  return (
    <Layer>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label htmlFor="">Получатель</Form.Label>
            <div className="">
              <Icon name="person-circle" className="mb-1 mr-2" />
              {fullname}
              {mobilephone ? `, ${mobilephone}` : ""}
            </div>
          </Form.Group>

          {user_type == 1 ? (
            <>
              <CompanyInfo />
            </>
          ) : (
            <>
              <Link to="/lk/">Как юридическое лицо</Link>
            </>
          )}
        </Col>
        <Col className="text-end">
          <Link to="/lk/">
            <Icon name="pencil-square" /> Изменить
          </Link>
        </Col>
      </Row>
    </Layer>
  );
  return (
    <Row className="">
      <Col>
        <div className="d-flex fs-6 mb-3">
          <Icon name="person-circle" className="mr-3 mt-1" />{" "}
          <div>
            {fullname}
            {mobilephone ? `, ${mobilephone}` : ""}
          </div>
        </div>

        {user_type === 1 ? <Company {...props} /> : <></>}
      </Col>
      <Col md={2} className="text-end">
        <a href="#">Изменить</a>
      </Col>
    </Row>
  );
};

const CompanyInfo = (props) => {
  const { recipient } = useContext(Context);
  const { company } = recipient;

  return (
    <>
      <div className="d-flex text-muted mb-1">
        <Icon name="house-exclamation" className="mr-3 mt-1" />{" "}
        <div>{company.text}</div>
      </div>

      <CompanyAddress {...company} />
    </>
  );
};

const CompanyAddress = (props) => {
  const { address_text } = props;

  return (
    <div className="d-flex text-muted">
      <Icon name="geo-alt" className="mr-3 mt-1" /> <div>{address_text}</div>
    </div>
  );
};
