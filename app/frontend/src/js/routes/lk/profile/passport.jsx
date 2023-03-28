import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import InputGroup from "react-bootstrap/InputGroup";
import { useLoaderData, Link, useLocation } from "react-router-dom";

import Context from "@js/contexts/context";
import Profile from "@js/components/Page/Profile";
import FetchList from "@js/components/FetchList";
import Button from "@js/components/Form/Button";
import { Form, useForm } from "@js/components/Form";
import Icon from "@js/components/Icon";
import { sendRequest, useRequest } from "@js/components/Request";

const Passport = (props) => {
  const location = useLocation();
  const data = useLoaderData();
  const context = useContext(Context);
  context.data = data;

  const links = getTabLinks();

  return (
    <>
      <Profile.Title>Профиль</Profile.Title>

      <Profile.PanelActions>
        <Profile.PanelAction>
          {links.map((item) => (
            <Button
              as={Link}
              key={item.href}
              to={item.href}
              variant={"outline-primary"}
              size={"sm"}
              className="mr-2"
              active={location.pathname === item.href}
            >
              {item.text}
            </Button>
          ))}
        </Profile.PanelAction>
      </Profile.PanelActions>

      <Card>
        <Card.Body>
          <Main />
        </Card.Body>
      </Card>
    </>
  );
};

const getTabLinks = () => {
  return [
    {
      text: "Основное",
      href: "/lk/profile",
    },
    {
      text: "Паспорт",
      href: "/lk/profile/passport",
    },
  ];
};

const Main = (props) => {
  const context = useContext(Context);
  const { data } = context;

  const action = "web/profile/passport/update";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[passport] updating...");
      return true;
    },
  });
  console.log("data", data, action);
  const handleChooseFilesWithComputer = () => {};

  return (
    <>
      <Form onSubmit={form.handleSubmit}>
        <Row>
          <Form.Group as={Col} md={8}>
            <Form.Label htmlFor="fullname">Фамилия Имя Отчество</Form.Label>
            <Form.Input defaultValue={data?.fullname} disabled />
          </Form.Group>

          <Form.Group as={Col} md={4}>
            <Form.Label htmlFor="date_of_birth">Дата рождения</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date_of_birth"
              defaultValue={data?.date_of_birth}
              isInvalid={!!form.errors.date_of_birth}
            />
            <Form.FieldError>{form.errors.date_of_birth}</Form.FieldError>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={5}>
            <Form.Label htmlFor="sitizenship">Гражданство</Form.Label>
            <Form.Select
              name="sitizenship"
              defaultValue={data?.sitizenship}
              onChange={null}
              isInvalid={!!form.errors.sitizenship}
            >
              <option value="">--Не выбрано</option>
              <option value="Россия">Россия</option>
            </Form.Select>
            <Form.FieldError>{form.errors.sitizenship}</Form.FieldError>
          </Form.Group>

          <Form.Group as={Col} md={3}>
            <Form.Label htmlFor="gender">Пол</Form.Label>
            <Form.Select
              name="gender"
              defaultValue={data?.gender}
              isInvalid={!!form.errors.gender}
            >
              <option value="">--Не выбран</option>
              {[
                { id: 1, name: "Муж" },
                { id: 2, name: "Жен" },
              ].map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
            <Form.FieldError>{form.errors.gender}</Form.FieldError>
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col} md={12}>
            <Form.Label htmlFor="place_of_birth">Место рождения</Form.Label>
            <Form.Input
              name="place_of_birth"
              defaultValue={data?.place_of_birth}
              isInvalid={!!form.errors.place_of_birth}
            />
            <Form.FieldError>{form.errors.place_of_birth}</Form.FieldError>
          </Form.Group>

          <Form.Group as={Col} md={4}>
            <Form.Label htmlFor="seria">Серия и номер</Form.Label>
            <InputGroup>
              <Form.Input
                name="seria"
                defaultValue={data?.seria}
                isInvalid={!!form.errors.seria}
              />
              <Form.Input
                name="num"
                defaultValue={data?.num}
                isInvalid={!!form.errors.seria}
              />
            </InputGroup>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={8}>
            <Form.Label htmlFor="dep_issued">Кем выдан</Form.Label>
            <Form.Input
              name="dep_issued"
              defaultValue={data?.dep_issued}
              isInvalid={!!form.errors.dep_issued}
            />
            <Form.FieldError>{form.errors.dep_issued}</Form.FieldError>
          </Form.Group>

          <Form.Group as={Col} md={4}>
            <Form.Label htmlFor="date_issued">Дата выдачи</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date_issued"
              defaultValue={data?.date_issued}
              isInvalid={!!form.errors.date_issued}
            />
            <Form.FieldError>{form.errors.date_issued}</Form.FieldError>
          </Form.Group>
        </Row>

        <h4>Сканы</h4>
        <Button variant="light" onClick={handleChooseFilesWithComputer}>
          <Icon name="file-earmark-arrow-up" /> Выбрать с компьютера
        </Button>

        <hr />

        <Button
          type="submit"
          loading={form.isSubmitting}
          loadingText="Сохраняем..."
        >
          Сохранить
        </Button>
      </Form>
    </>
  );
};

export default Passport;
