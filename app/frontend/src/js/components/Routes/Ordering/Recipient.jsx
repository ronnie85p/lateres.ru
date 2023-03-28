import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { Line } from "./Components";

export default (props) => {
  const { order } = React.useContext(Context);
  const { recipient } = order;
  const isJuristicType = recipient.user_type == 1;

  return (
    <>
      {isJuristicType ? (
        <div className="fw-bolder mb-2">Юридическое лицо</div>
      ) : (
        <></>
      )}

      <Row>
        <Col>
          <Line iconName="person-circle">
            {recipient.fullname}
            {recipient.mobilephone ? `, ${recipient.mobilephone}` : ""}
          </Line>

          {isJuristicType ? (
            <>
              {recipient.company ? (
                <RecipientCompany {...recipient.company} />
              ) : (
                <Line textVariant="danger" iconName="house-exclamation">
                  <Link to="/lk/profile" className="text-danger">
                    Заполните данные о компании
                  </Link>
                </Line>
              )}
            </>
          ) : (
            <Link to="/lk/profile">Как юридическое лицо</Link>
          )}
        </Col>
      </Row>
      <Link to="/lk/profile" title="Редактировать">
        Редактировать
      </Link>
    </>
  );
};

const RecipientCompany = (props) => {
  const { text } = props;

  return (
    <>
      <Line iconName="house-exclamation">{text}</Line>

      <CompanyAddress {...props} />
    </>
  );
};

const CompanyAddress = (props) => {
  const { address_text } = props;

  return <Line iconName="geo-alt">{address_text}</Line>;
};
