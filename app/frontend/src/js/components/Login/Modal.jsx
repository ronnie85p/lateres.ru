import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { useForm } from "../Form";
import { Modal } from "../Modal";
import FormInput from "../Form/Input";

const LoginModal = (props) => {
  const form = useForm({
    requestOptions: {
      params: {
        action: "web/auth/login",
      },
    },
    onSubmit() {
      return true;
    },
  });

  return (
    <>
      <Modal
        titleText={"Авторизация"}
        titleIcon={"box-arrow-in-right"}
        titleIconProps={{
          className: "mb-1 mr-2",
        }}
        modalProps={{
          animation: false,
        }}
        bodyProps={{
          className: "p-4",
        }}
        Body={() => {
          console.log("errors", !form.errors.username, !!form.errors.username);
          return (
            <>
              <Row>
                <Col className="m-auto" md="10">
                  <FormMessage
                    success={form.response.success}
                    message={form.response.message}
                  />

                  <Form onSubmit={form.submit}>
                    <Form.Group className="form-group">
                      <FloatingLabel controlId="username" label="Емэйл или ID">
                        <FormInput
                          name="username"
                          placeholder=" "
                          isInvalid={"username" in form.errors}
                        />
                        <Form.Control.Feedback type="invalid">
                          {form.errors.username}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="form-group">
                      <FloatingLabel controlId="password" label="Пароль">
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder=" "
                          isInvalid={"password" in form.errors}
                        />
                        <Form.Control.Feedback type="invalid">
                          {form.errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Row className="mb-4">
                      <Col>
                        <Form.Check label="Запомнить меня" defaultChecked />
                      </Col>
                      <Col className="text-end">
                        <a href="/">Забыли пароль?</a>
                      </Col>
                    </Row>

                    <Button className="btn-block" size="lg" type="submit">
                      Войти
                    </Button>
                  </Form>
                </Col>
              </Row>
            </>
          );
        }}
        {...props}
      />
    </>
  );
};

export default LoginModal;
