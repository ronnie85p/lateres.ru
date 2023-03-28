import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Page from "@js/components/Page";
import FormGroup from "@js/components/Form/Group";
import { useForm } from "@js/components/Form";
import { useRequest } from "@js/components/Http/Request";

export default (props) => {
  const form = useForm({
    request: useRequest({
      params: {
        action: "web/auth/login",
      },
    }),

    onSubmit() {
      console.log("[SignInPage] submit");

      return true;
    },

    onSuccess({ object }) {
      if (object.redirect) {
        window.location.href = object.redirect;
      }
    },
  });

  return (
    <>
      <Row>
        <Col className="m-auto" md="4">
          <div className="h4">Авторизация</div>

          <Card className="shadow-sm border-0">
            <Card.Body>
              <Form onSubmit={form.handleSubmit}>
                <FormGroup>
                  <Form.Floating>
                    <Form.Control
                      type="input"
                      name="username"
                      id="usename"
                      placeholder="ID / Емэйл"
                      required
                    />
                    <label htmlFor="username">ID / Емэйл</label>
                  </Form.Floating>
                </FormGroup>

                <FormGroup>
                  <Form.Floating className="form-group">
                    <Form.Control
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Пароль"
                      required
                    />
                    <label htmlFor="password">Пароль</label>
                  </Form.Floating>
                </FormGroup>

                <Row>
                  <Col md="6">
                    <Form.Check
                      defaultChecked
                      type="checkbox"
                      name="rememberme"
                      label="Запомнить меня"
                      id="login-rememberme"
                    />
                  </Col>

                  <Col className="text-end" md="6">
                    <a href="/login/forgot">Забыли пароль?</a>
                  </Col>
                </Row>

                <Button
                  disabled={form.isSubmitting}
                  className="btn-block btn-lg mt-4"
                  type="submit"
                  variant="primary"
                >
                  Войти
                  {/* {form.isSubmitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Loading...</span>
                      Выполняется вход...
                    </>
                  ) : (
                    <>Войти</>
                  )} */}
                </Button>
              </Form>

              <hr className="my-3" />

              <Row className="">
                <Col className="text-end" md="12">
                  <a href="#">Регистрация</a>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* <Card className="shadow-sm border-0">
            <Card.Body>
              <Form
                noValidate
                // validate={}
                onSubmit={_form.submit}
                onChange={_form.changeValue}
                onKeyDown={_form.preventInputSubmit}
              >
                <Form.Floating className="form-group">
                  <Form.Control
                    type="input"
                    name="username"
                    id="usename"
                    placeholder="ID / Емэйл"
                    required
                  />
                  <label htmlFor="username">ID / Емэйл</label>
                </Form.Floating>

                <Form.Floating className="form-group">
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Пароль"
                    required
                  />
                  <label htmlFor="password">Пароль</label>
                </Form.Floating>

                <Row>
                  <Col md="6">
                    <Form.Check
                      type="checkbox"
                      name="rememberme"
                      label="Запомнить меня"
                      id="login-rememberme"
                    />
                  </Col>

                  <Col className="text-end" md="6">
                    <a href="#">Забыли пароль?</a>
                  </Col>
                </Row>

                <Button
                  disabled={_form.isSubmitting}
                  className="btn-block btn-lg mt-4"
                  type="submit"
                  variant="primary"
                >
                  {_form.isSubmitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="visually-hidden">Loading...</span>
                      Выполняется вход...
                    </>
                  ) : (
                    <>Войти</>
                  )}
                </Button>
              </Form>

              <hr className="my-3" />

              <Row className="">
                <Col className="text-end" md="12">
                  <a href="#">Регистрация</a>
                </Col>
              </Row>
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </>
  );
};
