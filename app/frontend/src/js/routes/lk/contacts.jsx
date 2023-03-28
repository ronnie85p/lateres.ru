import React from "react";
import { useLoaderData } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import Context from "@js/contexts/context";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";
import Preloader from "@js/components/Preloader";
import Button from "@js/components/Form/Button";
import Form, { useForm } from "@js/components/Form";
import Icon from "@js/components/Icon";
import { sendRequest, useRequest, QueryData } from "@js/components/Request";

export default (props) => {
  const context = React.useContext(Context);
  const [resource, data] = useLoaderData();

  return (
    <Context.Provider value={{ ...context, data }}>
      <Title>
        <Title.Text>{resource.pagetitle}</Title.Text>
      </Title>

      <Content />
    </Context.Provider>
  );
};

const Content = (props) => {
  const { data } = React.useContext(Context);

  return (
    <>
      <Layer>
        <div className="h5">Телефоны</div>
        <PhonesList />

        <hr />

        <div className="h5">E-мэйл</div>
        <Email />
      </Layer>
    </>
  );
};

const PhonesList = (props) => {
  const context = React.useContext(Context);
  const { data } = context;
  const [isFormShown, setShowForm] = React.useState(false);
  const [list, setList] = React.useState(data.phones);
  const limit = 3;
  const isLimit = limit <= list.length;

  const handleShowForm = (event) => {
    event.preventDefault();

    setShowForm(true);
  };

  return (
    <Context.Provider
      value={{ ...context, list, setList, isFormShown, setShowForm }}
    >
      {list.map((item) => (
        <PhoneItem key={item.id} {...item} />
      ))}

      {!isLimit ? (
        <>
          {isFormShown ? (
            <PhoneForm />
          ) : (
            <a href="#" onClick={handleShowForm}>
              Добавить
            </a>
          )}
        </>
      ) : (
        <></>
      )}
    </Context.Provider>
  );
};

const PhoneItem = (props) => {
  const { list, setList } = React.useContext(Context);
  const { id, text, is_default } = props;
  const request = useRequest({
    action: "web/profile/phone/remove",
    data: { id },
  });

  const handleDelete = (event) => {
    event.preventDefault();
    if (!confirm(`Удалить телефон ${text}?`)) return;

    let idx = list.findIndex((item) => item.id === id);
    if (idx !== -1) {
      list.splice(idx, 1);
      setList([...list]);
    }

    request.send();
  };

  return (
    <>
      <Row className="mb-2">
        <Col md="5">
          <div className="d-flex">
            <div
              className={
                "form-control mr-2" +
                (is_default ? " border-dark text-dark" : " text-muted")
              }
              style={{ width: 200 }}
            >
              {text}
            </div>
            {!is_default ? (
              <a
                className="text-danger d-flex align-items-center justify-content-center px-2"
                href="#"
                onClick={handleDelete}
              >
                <Icon className="" name="trash" size="1.4em" />
              </a>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

const PhoneForm = (props) => {
  const { list, setList, setShowForm } = React.useContext(Context);
  const action = "web/profile/phone/create";
  const { errors, handleSubmit, isSubmitting } = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[phone] saving...");
      return true;
    },
    onSuccess({ object }) {
      let _list = list;
      if (object.is_default) {
        _list = list.map((item) => {
          return { ...item, is_default: 0 };
        });
        _list.unshift(object);
      } else {
        _list.push(object);
      }

      setList([..._list]);
      setShowForm(false);
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={5}>
          <div className="d-flex">
            <Form.Input
              name="phone"
              maskAlias="phone"
              style={{ width: 200 }}
              disabled={isSubmitting}
              isInvalid={!!errors.phone}
              autoComplete="off"
              autoFocus
            />

            <Button
              className="ml-2"
              type="submit"
              variant=""
              loading={isSubmitting}
            >
              <Icon name="save-fill" size="1.4em" />
            </Button>
          </div>
          <Form.Check
            className="mt-1"
            id="is-default"
            name="is_default"
            value="1"
            label="По умолчанию"
            defaultChecked
          />
          <Form.FieldError>{errors.phone}</Form.FieldError>
        </Col>
      </Row>
    </Form>
  );
};

const Email = (props) => {
  const context = React.useContext(Context);
  const { data } = context;
  const [isCodeFormShown, setShowCodeForm] = React.useState(false);
  const [formDisabled, setFormDisabled] = React.useState(false);
  const [isTimerShown, setShowTimer] = React.useState(false);
  const action = "web/profile/email/sendCode";
  const { errors, handleSubmit, isSubmitting, response } = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[email] sending...");
      return true;
    },
    onSuccess() {
      setFormDisabled(true);
      setShowCodeForm(true);
      setShowTimer(true);
    },
  });

  return (
    <Context.Provider
      value={{ ...context, setShowCodeForm, setFormDisabled, setShowTimer }}
    >
      <Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} md="5">
            <Form.Input
              type="email"
              name="email"
              placeholder="user@domain.ru"
              defaultValue={data.email}
              isInvalid={!!errors.email}
              disabled={formDisabled || isSubmitting}
            />
            <Form.FieldError>{errors.email}</Form.FieldError>
          </Form.Group>
          <Col>
            <Button
              type="submit"
              disabled={formDisabled}
              loading={isSubmitting}
              loadingText="Отправляем код..."
            >
              {isTimerShown ? (
                <Timer
                  dir="down"
                  startTime={30}
                  endTime={0}
                  Time={({ time }) => <>Через {time} сек</>}
                  onTimeEnd={() => {
                    setFormDisabled(false);
                    setShowTimer(false);
                  }}
                />
              ) : (
                <>Отправить код</>
              )}
            </Button>
          </Col>
        </Row>
      </Form>

      {isCodeFormShown ? <CodeForm data={response?.object} /> : <></>}
    </Context.Provider>
  );
};

const defaultTimerProps = {
  dir: "up",
  step: 1,
  delay: 1000,
};

const Timer = (props) => {
  const {
    dir,
    step,
    delay,
    startTime,
    endTime,
    onTime,
    onTimeStart,
    onTimeEnd,
    Time,
  } = { ...defaultTimerProps, ...props };
  const [time, dispatchTime] = React.useReducer((state, action) => {
    onTime && onTime({ time: state, stop });
    switch (action.dir) {
      case "up":
        return state + step;
      case "down":
        return state - step;
    }

    return state;
  }, parseInt(startTime));

  const start = () => {
    setTimeout(() => {
      if (time == startTime) {
        onTimeStart && onTimeStart({ time });
      }

      if (time !== endTime) {
        dispatchTime({ dir });
      } else {
        onTimeEnd && onTimeEnd({ time });
      }
    }, delay);
  };

  const stop = () => {};

  React.useEffect(() => {
    start();
  }, [time]);

  return <Time time={time} />;
};

const CodeForm = (props) => {
  const { setShowCodeForm, setFormDisabled, setShowTimer } =
    React.useContext(Context);
  const { data } = props;
  const action = "web/profile/email/update";
  const { errors, handleSubmit, isSubmitting, response } = useForm({
    actionRequest: (values) => sendRequest(action, { ...values, ...data }),
    onSubmit() {
      console.log("[email] sending...");
      return true;
    },
    onSuccess() {
      setFormDisabled(false);
      setShowCodeForm(false);
      setShowTimer(false);
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      {response.success ? (
        <div className="text-success">
          <Icon name="check-circle" /> {response.message}
        </div>
      ) : (
        <></>
      )}
      <Row>
        <Form.Group as={Col} md="2">
          <Form.Input
            name="code"
            placeholder="Ваш код"
            isInvalid={!!errors.code}
            disabled={isSubmitting}
            autoFocus
          />
          <Form.FieldError>{errors.code}</Form.FieldError>
        </Form.Group>

        <Col>
          <Button
            type="submit"
            loading={isSubmitting}
            loadingText="Подтверждаем..."
          >
            Подтвердить
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
