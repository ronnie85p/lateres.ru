import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import Form, { useForm } from "@js/components/Form";
import Button from "@js/components/Form/Button";
import Icon from "@js/components/Icon";
import { sendRequest } from "@js/components/Request";
import { Link } from "@js/components/Router";
import Container from "@js/components/Page/Container";

const Forgot = (props) => {
  const form = useForm({
    actionRequest: (values) =>
      sendRequest(
        {
          action: "web/auth/login/forgot",
        },
        values,
        { return: "data" }
      ),
    onSubmit() {
      console.log("[Forgot] submtting...");
      return false;
    },
  });

  return (
    <Container>
      <Row>
        <Col className="m-auto" md={4}>
          <div className="h4">Восстановление доступа</div>

          <Card className="shadow-sm border-0">
            <Card.Body>
              <p className="text-muted">
                На Вашу почту будет отправлена инструкция по восстановлению
                доступа
              </p>

              <Form onSubmit={form.handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="username">ID / Емэйл</Form.Label>
                  <Form.Input
                    name="username"
                    placeholder=""
                    isInvalid={!!form.errors.username}
                    autoFocus
                  />

                  <Form.FieldError>{form.errors.username}</Form.FieldError>
                </Form.Group>

                <Button
                  type="submit"
                  className="btn-block"
                  loading={form.isSubmitting}
                  loadingText={"Отправляем..."}
                >
                  Отправить
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Forgot;
