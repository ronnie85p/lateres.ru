import React, {
  useEffect,
  useContext,
  useState,
  createRef,
  Children,
} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { useRequest, Suspense, sendRequest } from "@js/components/Http/Request";
import { useForm } from "@js/components/Form";
import { useFile } from "@js/components/Files/File";
import Button from "@js/components/Form/Button";
import Aside from "../Aside";
import LoadContent from "../LoadContent";

const ChangePassword = (props) => {
  const form = useForm({
    onSubmit() {
      return false;
    },
  });

  return (
    <>
      <Form onSubmit={form.submit} onKeyDown={form.preventInputSubmit}>
        <Row>
          <Col md={8}>
            <Form.Group as={Col} md={12} className="form-group">
              <label htmlFor="password">Текущий пароль</label>
              <Form.Control
                type="password"
                name="password"
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group as={Col} md={12} className="form-group">
              <label htmlFor="password_new">Новый пароль</label>
              <Form.Control
                type="password"
                name="password_new"
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group as={Col} md={12} className="form-group">
              <label htmlFor="password_again">Повторить пароль</label>
              <Form.Control
                type="password"
                name="password_again"
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group as={Col} md={12} className="form-group">
              <Button type="submit" variant="primary">
                Сохранить
              </Button>
            </Form.Group>
          </Col>

          <Col>
            <p>Требования к паролю</p>
            <p>От 8 символов</p>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default (props) => {
  const { resource, user } = useContext(Context);

  return (
    <>
      <Suspense
        request={request}
        LoadingComponent={() => <>Loading...</>}
        ErrorComponent={({ error }) => <>{error.message}</>}
      >
        {({ response }) => (
          <Aside>
            <Aside.Menu items={response.results} />

            <Aside.Content title={resource.longtitle}>
              <Card className="pb-2 pt-2">
                <Card.Body>
                  <LoadContent
                    params={{ action: "web/profile/passport/get" }}
                  />
                  <FormEdit {...request} />
                </Card.Body>
              </Card>
            </Aside.Content>
          </Aside>
        )}
      </Suspense>
    </>
  );
};
