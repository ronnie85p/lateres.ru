import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Context from "@js/contexts/context";
import { sendRequest } from "@js/components/Request";
import Icon from "@js/components/Icon";
import Form, { useForm } from "@js/components/Form";
import Preloader from "@js/components/Preloader";
import { useModal, ModalContainer } from "@js/components/Modal";

const OfferButton = (props) => {
  const { form, updateData, sendValidate } = React.useContext(Context);
  const emailForm = useForm({
    actionRequest: (values) => sendRequest("web/order/offer/send", values),
    initialValues: {
      ...form.values,
      email: "",
    },
    onSubmit() {
      return true;
    },
    onSuccess(response) {
      if (response.success) {
        emailModal.hide();
      } else {
        emailForm.setResponseErrors(response.errors);
        emailForm.setResponse(response);
      }
    },
  });

  const emailModal = useModal({
    title: (
      <>
        <Icon name="envelope" /> Отправить предложение
      </>
    ),
    body: (
      <Form onSubmit={form.handleSubmit}>
        <Preloader show={emailForm.isSubmitting} />
        <Form.Group>
          <Form.Input
            name="email"
            placeholder="Введите email"
            defaultValue={emailForm.values.email}
            isInvalid={!!emailForm.errors.email}
            onChange={emailForm.handleChange}
          />
          <Form.FieldError>{emailForm.errors.email}</Form.FieldError>
          <Form.Text>Можно указать несколько адресов через запятую</Form.Text>
        </Form.Group>
      </Form>
    ),
    buttons: [
      {
        text: "Отправить",
        loading: emailForm.isSubmitting,
        loadingText: "Отправляем...",
        onClick() {
          emailForm.submitForm();
        },
      },
    ],
  });

  const getOffer = () => {
    updateData({ field: "preloader", preloader: true });
    sendRequest("web/order/offer/get", form.values)
      .then((response) => {
        if (response.success) {
          if (response.object.url) {
            window.open(response.object.url, "blanc_");
          }
        } else {
          form.setResponse(response);
        }
      })
      .finally(() => {
        updateData({ field: "preloader", preloader: false });
      });
  };

  const showEmailModal = () => {
    emailModal.show();
  };

  const handleSelect = (eventKey) => {
    sendValidate().then((response) => {
      switch (eventKey) {
        case "print":
          getOffer();
          break;
        case "email":
          showEmailModal();
          break;
      }
    });
  };

  return (
    <>
      <ModalContainer modal={emailModal} />
      <DropdownButton
        variant="success"
        title="Коммерческое предложение (.pdf)"
        onSelect={handleSelect}
      >
        <Dropdown.Item eventKey="print">
          <Icon name="printer" /> Распечатать
        </Dropdown.Item>
        <Dropdown.Item eventKey="email">
          <Icon name="envelope" /> Отправить на e-mail
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};

export { OfferButton };
