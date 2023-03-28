import React from "react";
import Button from "react-bootstrap/Button";

import Context from "@js/contexts/context";
import { sendRequest } from "@js/components/Request";
import Preloader from "@js/components/Preloader";
import { useModal, ModalContainer } from "@js/components/Modal";
import Form, { useForm } from "@js/components/Form";

export default (props) => {
  const { config } = React.useContext(Context);
  const { config: _config } = config;

  const modal = useModal({
    title: "Заказать звонок",
    titleIcon: "telephone",
    body: () => <ModalBody />,
  });

  const handleShowModal = (event) => {
    event.preventDefault();
    modal.show();
  };

  return (
    <div className="site-phone">
      <ModalContainer modal={modal} />

      <div className="fs-6">
        <a
          href={`tel:${_config?.site_phone}`}
          className="text-decoration-none"
          title="Позвонить"
        >
          {_config?.site_phone_format}
        </a>
      </div>

      <div className="text-secondary" style={{ fontSize: ".9em" }}>
        {_config?.site_works_time}
        <a
          href="#"
          className="text-secondary text-decoration-none ml-2"
          style={{ borderBottom: "1px dashed silver" }}
          onClick={handleShowModal}
        >
          Заказать звонок
        </a>
      </div>
    </div>
  );
};

const ModalBody = (props) => {
  const { handleSubmit, handleChange, values, errors } = useForm({
    actionRequest: (values) => sendRequest("web/call/sendOrder", values),
    initialValues: {
      fullname: "",
      phone: "",
      datetime: "",
    },
    onSubmit() {
      return true;
    },
    onSuccess() {},
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="fullname">Как к Вам обращаться?</Form.Label>
        <Form.Input
          name="fullname"
          placeholder="Фамилия(не обязательно) Имя Отчество"
          defaultValue={values.fullname}
          isInvalid={"fullname" in errors}
          onChange={handleChange}
        />
        <Form.FieldError>{errors.fullname}</Form.FieldError>
      </Form.Group>

      <Form.Group>
        <Form.Input
          name="phone"
          maskAlias="phone"
          defaultValue={values.phone}
          isInvalid={"phone" in errors}
          onChange={handleChange}
        />
        <Form.FieldError>{errors.phone}</Form.FieldError>
      </Form.Group>

      <Form.Group>
        <Form.DateTime
          name="datetime"
          defaultValue={values.datetime}
          isInvalid={"datetime" in errors}
          onChange={handleChange}
        />
        <Form.FieldError>{errors.datetime}</Form.FieldError>
      </Form.Group>

      <p className="text-secondary">
        Введите номер телефона и укажите дату и время, когда Вам удобно
        позвонить.
      </p>

      <div className="text-center mt-1x">
        <Button type="submit">Отправить</Button>
      </div>
    </Form>
  );
};

const AlertModal = (props) => {
  const { use } = props;

  return (
    <>
      <Modal
        use={use}
        titleText={"Звонок заказан"}
        titleIcon={"telephone"}
        titleIconProps={{
          className: "mr-3",
        }}
        titleProps={{
          className: "text-success",
        }}
        modalProps={{
          animation: false,
        }}
        bodyProps={{
          className: "p-5",
        }}
        Body={() => <p>Мы Вам перезвоним в указанное Вами время!</p>}
      />
    </>
  );
};
