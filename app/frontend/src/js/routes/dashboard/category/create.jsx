import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Placeholder from "react-bootstrap/Placeholder";
import { useLoaderData, Link, useLocation } from "react-router-dom";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import Button from "@js/components/Form/Button";
import { Form, useForm } from "@js/components/Form";
import { sendRequest } from "@js/components/Request";
import { Page } from "@dashboard/components/Dashboard";

const Index = (props) => {
  const context = useContext(Context);
  const data = useLoaderData();

  return (
    <Context.Provider value={{ data }}>
      <div className="mb-2x">
        <Button
          variant={"outline-secondary"}
          className="border"
          as={Link}
          to={"/dashboard/categories"}
        >
          <Icon name="arrow-left-short" /> Назад
        </Button>
      </div>

      <Page.Title>Новая категория</Page.Title>

      <Row>
        <Col md={8}>
          <IndexForm />
        </Col>
      </Row>
    </Context.Provider>
  );
};

const IndexForm = (props) => {
  const context = useContext(Context);
  const action = "mgr/category/create";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[IndexForm] submitting...");
      return false;
    },
  });

  return (
    <>
      <Form>
        <Row>
          <Form.Group as={Col} md={12}>
            <Form.Label htmlFor="pagetitle">Заголовок</Form.Label>
            <Form.Input name="pagetitle" isInvalid={!!form.errors.pagetitle} />
            <Form.FieldError>{form.errors.pagetitle}</Form.FieldError>
          </Form.Group>

          <Form.Group as={Col} md={12}>
            <Form.Label htmlFor="longtitle">Расширенный заголовок</Form.Label>
            <Form.Input name="longtitle" isInvalid={!!form.errors.longtitle} />
            <Form.FieldError>{form.errors.longtitle}</Form.FieldError>
          </Form.Group>

          <Form.Group as={Col} md={12}>
            <Form.Label htmlFor="description">Описание</Form.Label>
            <Form.Input
              name="description"
              isInvalid={!!form.errors.description}
            />
            <Form.FieldError>{form.errors.description}</Form.FieldError>
          </Form.Group>

          <Form.Group as={Col} md={12}>
            <Form.Label htmlFor="content">Содержимое</Form.Label>
            <Form.Editor name="description" isInvalid={!!form.errors.content} />
            <Form.FieldError>{form.errors.content}</Form.FieldError>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={3}>
            <Form.Label htmlFor="menuindex">Позиция в меню</Form.Label>
            <Form.Input
              type="number"
              name="menuindex"
              isInvalid={!!form.errors.menuindex}
            />
            <Form.FieldError>{form.errors.menuindex}</Form.FieldError>
          </Form.Group>
        </Row>

        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              name="published"
              id="published"
              label="Сделать доступной"
              isInvalid={!!form.errors.published}
              defaultValue={1}
              defaultChecked
            />
            <Form.FieldError>{form.errors.published}</Form.FieldError>
            <Form.Text>Будет отображаться в категориях на сайте</Form.Text>
          </Col>
        </Row>

        <hr />

        <Button loading={form.isSubmitting} loadingText={"Добавляем..."}>
          Добавить
        </Button>
      </Form>
    </>
  );
};

export default Index;
