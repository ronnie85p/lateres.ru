import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import * as BsPlaceholder from "react-bootstrap/Placeholder";
// import Button from "react-bootstrap/Button";

import Context from "@js/contexts/context";
import Loading from "@js/components/Loading";
import { useForm } from "@js/components/Form";
import Button from "@js/components/Form/Button";
import { useRequest, Suspense } from "@js/components/Http/Request";
import Aside from "../Aside";
import LoadContent from "../LoadContent";

const PlaceholderContainer = (props) => {
  const { show, children, Placeholder } = props;
  return show ? (
    <>
      <BsPlaceholder as="p" animation="wave" {...placeholderProps}>
        <Placeholder />
      </BsPlaceholder>
    </>
  ) : (
    <>{children}</>
  );
};

const FormEdit = (props) => {
  const { object } = props;
  const form = useForm({
    request: useRequest({
      params: {
        action: "web/profile/address/update",
      },
    }),
  });

  return (
    <>
      <Form onSubmit={form.handleSubmit}>
        <Row className="mb-1x">
          <Col className="text-end">
            <a href="" className="mr-2">
              Карта
            </a>
            <a href="">Определить автоматически</a>
          </Col>
        </Row>

        <Row>
          <Form.Group className="form-group" as={Col}>
            <label htmlFor="region">Регион</label>
            <Form.Control name="region" defaultValue={object?.region} />
          </Form.Group>
          <Form.Group className="form-group" as={Col}>
            <label htmlFor="city">Населенный пункт</label>
            <Form.Control name="city" defaultValue={object?.city} />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="form-group" as={Col}>
            <label htmlFor="street">Улица</label>
            <Form.Control name="street" defaultValue={object?.street} />
          </Form.Group>
          <Form.Group className="form-group" as={Col}>
            <label htmlFor="building">Дом</label>
            <Form.Control name="building" defaultValue={object?.building} />
          </Form.Group>
        </Row>

        <hr className="" />

        <Row>
          <Col className="text-start">
            <Button
              type="submit"
              loading={form.isSubmitting}
              loadingText="Сохраняем"
            >
              Сохранить
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default (props) => {
  const { resource, user } = useContext(Context);

  const request = useRequest({
    params: {
      action: "web/profile/menu/getList",
    },
  });

  return (
    <>
      <Suspense
        request={request}
        LoadingComponent={() => <>Loading...</>}
        ErrorComponent={({ error }) => <>{error.message}</>}
      >
        {({ response }) => (
          <>
            <Aside>
              <Aside.Menu items={response.results} />

              <Aside.Content title={resource.longtitle}>
                <Card className="pb-2 pt-2" style={{ minHeight: 100 }}>
                  <Card.Body>
                    <LoadContent
                      params={{ action: "web/profile/address/get", id: 1 }}
                    >
                      {({ response }) => <FormEdit {...response} />}
                    </LoadContent>
                  </Card.Body>
                </Card>
              </Aside.Content>
            </Aside>
          </>
        )}
      </Suspense>
    </>
  );
};
