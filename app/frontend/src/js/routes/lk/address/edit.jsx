import React from "react";
import { useLoaderData } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import { sendRequest } from "@js/components/Request";
import Icon from "@js/components/Icon";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";
import { Form, useForm } from "@js/components/Form";
import Button from "@js/components/Form/Button";
import Asterix from "@js/components/Form/Asterix";
import Preloader from "@js/components/Preloader";
import Fields from "@js/components/Page/Address/Fields";

export default (props) => {
  const context = React.useContext(Context);
  const [resource, data] = useLoaderData();

  return (
    <Context.Provider value={{ ...context, data }}>
      <Title>
        <Title.Text>{resource.pagetitle}</Title.Text>
        <Title.SubText>Редактирование</Title.SubText>
      </Title>

      <Content />
    </Context.Provider>
  );
};

const Content = (props) => {
  const context = React.useContext(Context);
  const { data } = context;
  const form = useForm({
    actionRequest: (values) =>
      sendRequest("web/profile/address/update", { id: data.id, ...values }),
    initialValues: {
      region: data.region,
      district: data.district,
      city: data.city,
      street: data.street,
      building: data.building,
      comment: data.comment,
      is_default: data.is_default,
    },
    onSubmit() {
      console.log("[address] updating...");
      return true;
    },
  });

  return (
    <Context.Provider value={{ ...context, form }}>
      <Layer>
        <Preloader show={form.isSubmitting} />
        <Form onSubmit={form.handleSubmit}>
          <Form.Alert
            variant={form.response.success ? "success" : "danger"}
            text={form.response.message}
          ></Form.Alert>

          <Fields />

          <hr />

          <Row>
            <Col>
              <Button type="submit">Сохранить</Button>
            </Col>
          </Row>
        </Form>
      </Layer>
    </Context.Provider>
  );
};
