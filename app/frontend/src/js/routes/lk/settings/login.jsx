import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLoaderData, Link } from "react-router-dom";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { sendRequest } from "@js/components/Request";
import Preloader from "@js/components/Preloader";
import Form, { useForm } from "@js/components/Form";
import Button from "@js/components/Form/Button";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";

export default (props) => {
  const context = React.useContext(Context);
  const [resource] = useLoaderData();

  return (
    <Context.Provider value={{ ...context }}>
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
  const context = React.useContext(Context);
  const { data } = context;
  const [enabled, setEnabled] = React.useState(data.login_enabled);

  const action = "web/auth/login/settings/update";
  const form = useForm({
    initialValues: {
      login_enabled: 0,
      login_method: data.login_method,
      login_answer: data.login_answer,
    },
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[settings] updating...");
      return true;
    },
  });

  const handleSwitch = (event) => {
    form.handleChange(event);
    setEnabled(!enabled);
  };

  const { handleSubmit, isSubmitting, errors, values } = form;

  return (
    <Context.Provider value={{ ...context, form }}>
      <Form onSubmit={handleSubmit}>
        <Preloader show={isSubmitting} />

        <Row>
          <Form.Group as={Col} className="fs-6 mb-4">
            <Form.Check
              type="switch"
              label="Двухфакторная авторизация"
              id="login-enabled"
              name="login_enabled"
              defaultChecked={enabled}
              defaultValue={1}
              isInvalid={!!errors.login_enabled}
              onChange={handleSwitch}
            />
            <Form.FieldError>{errors.login_enabled}</Form.FieldError>
          </Form.Group>
        </Row>

        <div
          style={{
            opacity: enabled ? 1 : 0.5,
            pointerEvents: enabled ? "auto" : "none",
          }}
        >
          <LoginMethods />
        </div>

        <hr />

        <Button type="submit">Сохранить</Button>
      </Form>
    </Context.Provider>
  );
};

const LoginMethods = (props) => {
  const { data, form } = React.useContext(Context);
  const { login_settings } = data;
  const [value, setValue] = React.useState(
    form.values.login_method || login_settings.methods[0]?.id
  );

  const handleChange = (event) => {
    form.handleChange(event);
    setValue(event.currentTarget.value);
  };

  return (
    <>
      <Form.Group>
        {login_settings?.methods?.map(({ id, name }) => (
          <Form.Check
            type="radio"
            name="login_method"
            id={`login-method-${id}`}
            key={id}
            value={id}
            label={name}
            defaultChecked={value == id}
            isInvalid={!!form.errors.login_method}
            onChange={handleChange}
            inline
          />
        ))}
        <Form.FieldError>{form.errors.login_method}</Form.FieldError>
      </Form.Group>

      <Row>
        <Col>
          <LoginMethodOptions method={value} />
        </Col>
      </Row>
    </>
  );
};

const LoginMethodOptions = (props) => {
  const { method } = props;

  switch (parseInt(method)) {
    case 1:
      return LoginMethodEmailOption();

    case 2:
      return LoginMethodQuestionOption();
  }

  return <></>;
};

const LoginMethodEmailOption = (props) => {
  return <Link to="/lk/contacts">Изменить</Link>;
};

const LoginMethodQuestionOption = (props) => {
  const { data, form } = React.useContext(Context);
  const { login_settings } = data;
  const [value, setValue] = React.useState(data.login_question);

  const handleChange = (event) => {
    form.handleChange(event);
    setValue(event.currentTarget.value);
  };

  return (
    <>
      <Form.Group>
        <Form.Select
          name="login_question"
          defaultValue={value}
          isInvalid={!!form.errors.login_question}
          onChange={handleChange}
        >
          <option value="">Выберите вопрос</option>
          {login_settings?.questions?.map(({ id, text }) => (
            <option key={id} value={id}>
              {text}
            </option>
          ))}
        </Form.Select>
        <Form.FieldError>{form.errors.login_question}</Form.FieldError>
      </Form.Group>

      {value ? (
        <Form.Group>
          <Form.Control
            name="login_answer"
            placeholder="Ваш ответ"
            defaultValue={form.values.login_answer}
            isInvalid={!!form.errors.login_answer}
            ref={(node) => node && node.focus()}
            maxLength={50}
            onChange={form.handleChange}
          />
          <Form.FieldError>{form.errors.login_answer}</Form.FieldError>
        </Form.Group>
      ) : (
        <></>
      )}
    </>
  );
};
