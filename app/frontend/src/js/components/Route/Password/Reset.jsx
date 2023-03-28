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
        action: "web/auth/password/reset",
      },
    }),

    onSubmit() {
      console.log("[SignInPage] submit");

      return false;
    },
  });

  return (
    <>
      <Row>
        <Col className="m-auto" md="4">
          <div className="h4">Сброс пароля</div>

          <Card className="shadow-sm border-0">
            <Card.Body>
              <Form
                noValidate
                // validate={}
                onSubmit={form.handleSubmit}
              >
                <Form.Group className="form-group">
                  <label htmlFor="password">Новый пароль</label>
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    placeholder=""
                    required
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <label htmlFor="password">Повторите пароль</label>
                  <Form.Control
                    type="password"
                    name="password_again"
                    id="password-again"
                    placeholder=""
                    required
                  />
                </Form.Group>

                <Row>
                  <Col className="text-center" md={12}>
                    <Button
                      className="btn-block"
                      type="submit"
                      variant="primary"
                    >
                      Сбросить
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
