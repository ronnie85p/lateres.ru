import React, { useEffect, useContext, useState, createRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { useRequest, Suspense, sendRequest } from "@js/components/Http/Request";
import { useForm } from "@js/components/Form";
import Button from "@js/components/Form/Button";
import FetchList from "@js/components/Fetch/List";

const StoryList = (props) => {
  const [trigger, setTrigger] = useState(0);
  const stories = [];

  const request = useRequest({
    params: {
      action: "web/auth/login/getList",
    },
  });

  const requestDestroyAll = useRequest({
    params: {
      action: "web/auth/session/destroyAll",
    },
    onSuccess() {
      request.send();
    },
  });

  useEffect(() => {
    request.send();
  }, [trigger]);

  const handleUpdateList = () => {
    setTrigger(!trigger);
  };

  const handleDestroyAll = () => {
    requestDestroyAll.send();
  };

  const ghostStyles = {
    opacity: 0.5,
    pointerEvents: "none",
  };

  return (
    <>
      {/* <Button onClick={handleUpdateList} disabled={request.state === "sending"}>
        Update list
      </Button>

      <hr /> */}

      <Row className="fw-bolder">
        <Col>Устройство</Col>
        <Col>IP</Col>
        <Col md={3}>Время входа</Col>
      </Row>

      <hr className="mt-2 mb-4" />

      <FetchList
        request={request}
        ItemComponent={({
          id,
          ip,
          browser,
          geolocation,
          current,
          timestamp,
          session,
        }) => (
          <Row
            key={id}
            className={
              "mb-2" +
              (!session.active ? " fst-italic" : "") +
              (current ? " fw-bolder" : "")
            }
            style={{
              ...(!session.active ? ghostStyles : null),
            }}
          >
            <Col className="text-truncate">
              {browser.platform} / {geolocation.address_text || "-"}
            </Col>
            <Col className="text-truncate">{ip}</Col>
            <Col md={3} className="text-truncate">
              {timestamp}
            </Col>
          </Row>
        )}
      />

      {request.response?.actives > 1 ? (
        <>
          <hr />

          <Row>
            <Col>
              <Button
                size={"sm"}
                onClick={handleDestroyAll}
                disabled={requestDestroyAll.state == "sending"}
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

export default (props) => {
  const [activate, setActivate] = useState(() => {});

  const form = useForm({
    request: useRequest({
      params: {
        action: "web/auth/login/updateSettings",
      },
    }),
    onSubmit() {
      return true;
    },
  });

  return (
    <>
      <StoryList />
      <Form onSubmit={form.handleSubmit}></Form>
    </>
  );
};
