import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import RawHTML from "@js/components/RawHTML";
import Container from "@js/components/Page/Container";

export default (props) => {
  const { config } = React.useContext(Context);

  return (
    <footer className="site-footer text-white pt-4">
      <Container>
        <Row>
          <Col>
            <div className="fs-5 mb-2">Наши контакты</div>
            <ul className="list-unstyled">
              <li>
                <Link className="text-white opacity-80" to={"/contacts"}>
                  Офис
                </Link>
              </li>
              <li>
                <Link className="text-white opacity-80" to={"/contacts"}>
                  Адрес производства
                </Link>
              </li>
              <li>
                <Link className="text-white opacity-80" to={"/contacts"}>
                  Пресс служба
                </Link>
              </li>
            </ul>
          </Col>
          <Col>
            <div className="fs-5 mb-2">Производство</div>
            <ul className="list-unstyled">
              <li>
                <Link className="text-white opacity-80" to={"/contacts"}>
                  Сертификаты и лицензии
                </Link>
              </li>
              <li>
                <Link className="text-white opacity-80" to={"/contacts"}>
                  Индивидуальные составы
                </Link>
              </li>
              <li>
                <Link className="text-white opacity-80" to={"/contacts"}>
                  Доставка и самовывоз
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link className="text-white opacity-80" to={"/contacts"}>
              Пользовательское соглашение
            </Link>
          </Col>
          <Col className="text-end">
            2023 <RawHTML>&copy;</RawHTML> Lateres
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
