import React, { useEffect, useContext, useState, createRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { useRequest, Suspense, sendRequest } from "@js/components/Http/Request";
import { useForm } from "@js/components/Form";
import Button from "@js/components/Form/Button";

export default (props) => {
  const form = useForm({
    request: useRequest({
      params: {
        action: "web/auth/password/change",
      },
    }),
    onSubmit() {
      return true;
    },
  });

  return (
    <>
      <Form onSubmit={form.handleSubmit}>
        <Row>
          <Col md={8}>
            <Form.Group as={Col} md={12} className="form-group">
              <label htmlFor="old_password">Текущий пароль</label>
              <Form.Control
                type="password"
                name="old_password"
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group as={Col} md={12} className="form-group">
              <label htmlFor="new_password">Новый пароль</label>
              <Form.Control
                type="password"
                name="new_password"
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group as={Col} md={12} className="form-group">
              <label htmlFor="new_password_again">Повторить пароль</label>
              <Form.Control
                type="password"
                name="new_password_again"
                autoComplete="off"
              />
            </Form.Group>

            <Form.Group as={Col} md={12} className="form-group">
              <Button
                type="submit"
                loading={form.isSubmitting}
                loadingText={"Coхраняем..."}
              >
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
