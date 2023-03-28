import React from "react";
import { useLoaderData } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { sendRequest } from "@js/components/Request";
import Form, { useForm, Yup } from "@js/components/Form";
import Button from "@js/components/Form/Button";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";
import Preloader from "@js/components/Preloader";

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
  const action = "web/auth/password/change";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    initialValues: {
      old_password: "",
      new_password: "",
      new_password_again: "",
    },
    onSubmit() {
      return true;
    },
    onSuccess() {
      resetForm();
    },
  });

  const {
    handleSubmit,
    handleChange,
    isSubmitting,
    isValid,
    errors,
    values,
    resetForm,
    response,
  } = form;

  return (
    <Form onSubmit={handleSubmit}>
      <Preloader show={isSubmitting} />

      <Form.Alert
        variant={response.success ? "success" : "danger"}
        text={response.message}
      />

      <Form.Group as={Row}>
        <Form.Label htmlFor="old_password" col={3}>
          Текущий пароль
        </Form.Label>
        <Col md="5" className="position-relative">
          <Form.Input
            type="password"
            name="old_password"
            autoComplete="off"
            onChange={handleChange}
            value={values.old_password}
            isInvalid={!!errors.old_password}
          />
          <Form.FieldError tooltip>{errors.old_password}</Form.FieldError>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label htmlFor="new_password" col={3}>
          Новый пароль
        </Form.Label>
        <Col md="5" className="position-relative">
          <Form.Input
            type="password"
            name="new_password"
            autoComplete="off"
            onChange={handleChange}
            value={values.new_password}
            isInvalid={!!errors.new_password}
          />
          <Form.FieldError tooltip>{errors.new_password}</Form.FieldError>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label htmlFor="new_password_again" col="3">
          Повторить пароль
        </Form.Label>
        <Col md="5" className="position-relative">
          <Form.Input
            type="password"
            name="new_password_again"
            autoComplete="off"
            onChange={handleChange}
            value={values.new_password_again}
            isInvalid={!!errors.new_password_again}
          />
          <Form.FieldError tooltip>{errors.new_password_again}</Form.FieldError>
        </Col>
      </Form.Group>

      <hr />

      <Row>
        <Col md="3"></Col>
        <Col>
          <Button type="submit">Изменить</Button>
        </Col>
      </Row>
    </Form>
  );
};
