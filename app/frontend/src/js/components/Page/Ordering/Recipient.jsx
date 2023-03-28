import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { Form } from "@js/components/Form";

export default (props) => {
  const { data } = React.useContext(Context);
  const { recipient } = data;

  return (
    <Row>
      <Col>
        <div className="text-muted">
          <Icon name="person-circle" className="mb-1 mr-2" />
          {recipient.fullname}
          {recipient.mobilephone ? `, ${recipient.mobilephone}` : ""}
        </div>

        {/* {user_type == 1 ? (
          <>
            <CompanyInfo />
          </>
        ) : (
          <>
            <Link to="/lk/">Как юридическое лицо</Link>
          </>
        )} */}
      </Col>
      <Col className="text-end">
        <Link to="/lk/profile" title="Изменить данные">
          <Icon name="pencil-square" />
        </Link>
      </Col>
    </Row>
  );
};
