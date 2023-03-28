import React, { useEffect, useContext, useState, createRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { useRequest, Suspense, sendRequest } from "@js/components/Http/Request";
import { useForm } from "@js/components/Form";
import Button from "@js/components/Form/Button";

const LoginAuthMethods = (props) => {
  const [method, setMethod] = useState(1);

  const methods = [
    {
      id: 1,
      name: "E-mail",
    },

    {
      id: 2,
      name: "Вопрос",
    },
  ];

  const handleChange = ({ currentTarget }) => {
    setMethod(parseInt(currentTarget.value));
  };

  return (
    <>
      <Form.Group className="form-group">
        {methods.map(({ id, name }) => (
          <Form.Check
            type="radio"
            name="login_auth_method"
            id={`login-auth-method-${id}`}
            key={id}
            value={id}
            label={name}
            onChange={handleChange}
            defaultChecked={method === id}
            inline
          />
        ))}
      </Form.Group>

      <LoginAuthMethodOptions method={method} />
    </>
  );
};

const LoginAuthMethodOptions = (props) => {
  const { method } = props;

  switch (method) {
    case 1:
      return <LoginAuthMethodEmailOption />;

    case 2:
      return <LoginAuthMethodQuestionOption />;
  }

  return <></>;
};

const LoginAuthMethodEmailOption = (props) => {
  return <></>;
};

const LoginAuthMethodQuestionOption = (props) => {
  const [question, setQuestion] = useState(0);

  const questions = [
    {
      id: 1,
      text: "Question 1",
    },
    {
      id: 2,
      text: "Question 2",
    },
  ];

  const handleChange = ({ currentTarget }) => {
    setQuestion(parseInt(currentTarget.value));
  };

  return (
    <>
      <Form.Group className="form-group">
        <Form.Select name="login_auth_question" onChange={handleChange}>
          <option value="">Выберите вопрос</option>
          {questions.map(({ id, text }) => (
            <option key={id} value={id} defaultChecked={id === question}>
              {text}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {question > 0 ? (
        <>
          <Form.Group className="form-group">
            <Form.Control
              type="input"
              name="login_auth_answer"
              placeholder="Ваш ответ"
              // defaultValue={answer}
              autoFocus
            />
          </Form.Group>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default (props) => {
  const [activate, setActivate] = useState(() => {});

  const form = useForm({
    request: useRequest({
      params: {
        action: "web/auth/login/settings/update",
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
          <Form.Group as={Col} className="fs-6 mb-4">
            <Form.Check
              defaultChecked={activate}
              defaultValue={1}
              onChange={() => setActivate(!activate)}
              type="switch"
              label="Активировать"
              id="login-auth-activate"
              name="login_auth_activate"
            />
          </Form.Group>
        </Row>

        {activate ? (
          <>
            <Row>
              <Col md={4}>
                <LoginAuthMethods />
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}

        <hr className="" />

        <Row>
          <Col>
            <Button
              type="submit"
              loading={form.isSubmitting}
              loadingText={"Сохраняем..."}
            >
              Сохранить
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};
