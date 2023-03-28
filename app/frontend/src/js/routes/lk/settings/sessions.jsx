import React from "react";
import { useLoaderData } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { useRequest } from "@js/components/Request";
import Button from "@js/components/Form/Button";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";

export default (props) => {
  const context = React.useContext(Context);
  const [resource, data] = useLoaderData();

  return (
    <Context.Provider value={{ ...context, data }}>
      <Layer>
        <Title>
          <Title.Text>{resource.pagetitle}</Title.Text>
        </Title>

        <Content />
      </Layer>
    </Context.Provider>
  );
};

const Content = (props) => {
  const { data } = React.useContext(Context);
  const [list, setList] = React.useState(data.results);
  const request = useRequest({
    action: "",
  });

  const handleDestroyAll = (event) => {
    request.send();
  };

  return (
    <>
      <Row className="fw-bolder">
        <Col>Устройство</Col>
        <Col>IP</Col>
        <Col md={3}>Время входа</Col>
      </Row>

      <hr className="mt-2 mb-4" />

      {list.map((item) => (
        <SessionItem key={item.id} {...item} />
      ))}

      {data.actives > 1 ? (
        <>
          <hr />

          <Row>
            <Col>
              <Button
                size="sm"
                onClick={handleDestroyAll}
                disabled={request.state === "sending"}
              >
                Завершить все
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const SessionItem = (props) => {
  const { id, ip, browser, geolocation, current, timestamp, session } = props;

  return (
    <Row
      key={id}
      className={
        "mb-2" +
        (!session.active ? " fst-italic" : "") +
        (current ? " fw-bolder" : "")
      }
      style={{ opacity: session.active ? 1 : 0.5 }}
    >
      <Col className="text-truncate">
        {browser.platform} / {geolocation.address_text || "-"}
      </Col>
      <Col className="text-truncate">{ip}</Col>
      <Col md={3} className="text-truncate">
        {timestamp}
      </Col>
    </Row>
  );
};
