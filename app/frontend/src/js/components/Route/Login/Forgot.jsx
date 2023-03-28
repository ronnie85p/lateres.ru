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
    action: "web/auth/password/forgot",

    onSubmit() {
      console.log("[SignInPage] submit");

      return false;
      _form.setIsSubmitting(true);

      setTimeout(() => {
        _form.setIsSubmitting(false);
      }, 3000);

      // if (form.checkValidity() === false) {
      //     console.log('not valid')
      //     event.preventDefault();
      //     event.stopPropagation();
      // }

      return false;
    },
  });

  return (
    <>
      <Row>
        <Col className="m-auto" md="4">
          <div className="h4">Восстановление доступа</div>

          <Card className="shadow-sm border-0">
            <Card.Body>
              <p>
                На Вашу почту будет отправлена инструкция по восстановлению
                доступа
              </p>

              <Form
                noValidate
                // validate={}
                onSubmit={form.handleSubmit}
              >
                <Form.Group>
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
                </Form.Group>

                <Row>
                  <Col className="text-center" md={12}>
                    <Button
                      className="btn-block btn-lg"
                      type="submit"
                      variant="primary"
                    >
                      Отправить
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
