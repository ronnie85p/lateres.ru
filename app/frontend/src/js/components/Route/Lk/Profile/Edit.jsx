import React, { useEffect, useContext, useState, createRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import Button from "@js/components/Form/Button";
import { useForm } from "@js/components/Form";
import { useRequest, Suspense } from "@js/components/Http/Request";
import Aside from "../Aside";
import LoadContent from "../LoadContent";

const CompaniesSelect = (props) => {
  const { companies, settings } = props;
  const [selectedValue, setSelectedValue] = useState(() => {
    return settings?.company_default;
  });

  const handleCompanyChange = ({ currentTarget }) => {
    setSelectedValue(currentTarget.value);
  };

  return companies.length ? (
    <>
      <label htmlFor="company">Организация</label>
      <Form.Select
        name="company"
        className="mb-2"
        defaultValue={settings?.company_default}
        onChange={handleCompanyChange}
      >
        <option value={0}>-- Не выбрана</option>
        {companies.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Form.Select>
      <a href="#">Добавить</a>{" "}
      {selectedValue > 0 ? (
        <>
          <a href="#" className="ml-2">
            Редактировать
          </a>
        </>
      ) : (
        <></>
      )}
    </>
  ) : (
    <div className="text-primary">
      <Icon name="plus" size="1.5em" />
      <a href="#">Добавить организацию</a>
    </div>
  );
};

const PhonesSelect = (props) => {
  const { phones, mobilephone } = props;

  return phones.length ? (
    <>
      <label htmlFor="mobilephone">Телефон</label>
      <Form.Select name="mobilephone" defaultValue={mobilephone}>
        {phones.map(({ id, text }) => (
          <option key={id}>{text}</option>
        ))}
      </Form.Select>

      <a href="#">Добавить</a>
      <a href="#" className="ml-2">
        Изменить
      </a>
    </>
  ) : (
    <div className="text-primary">
      <Icon name="plus" size="1.5em" />
      <a href="/lk/profile/contacts">Добавить телефон</a>
    </div>
  );
};

const FormEdit = (props) => {
  const { object } = props;
  const [isJuristicType, setIsJuristicType] = useState(() => {
    return object.settings?.is_jurictic_type === 1;
  });

  const form = useForm({
    request: useRequest({
      params: {
        action: "web/profile/update",
      },
    }),
  });

  const handleJuristicTypeChange = (event) => {
    setIsJuristicType(!isJuristicType);
  };

  return (
    <>
      <Form onSubmit={form.handleSubmit}>
        <Row>
          <Form.Group
            className={"form-group"}
            style={{ opacity: isJuristicType ? 1 : 0.7 }}
            as={Col}
          >
            <Form.Check
              id="juristic-type"
              name="juristic_type"
              type="switch"
              label="Юридическое лицо"
              onChange={handleJuristicTypeChange}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="form-group" as={Col} md={5}>
            <label htmlFor="fullname">Фамилия Имя Отчество</label>
            <Form.Control name="fullname" defaultValue={object.fullname} />
          </Form.Group>
        </Row>

        {isJuristicType ? (
          <>
            <Row>
              <Form.Group className="form-group" as={Col} md={5}>
                <CompaniesSelect {...object} />
              </Form.Group>
            </Row>
          </>
        ) : (
          <></>
        )}

        <Row>
          <Form.Group className="form-group" as={Col} md={3}>
            <PhonesSelect {...object} />
          </Form.Group>
        </Row>

        <hr className="" />

        <Row>
          <Col className="text-start">
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

export default (props) => {
  const { resource } = useContext(Context);

  const request = useRequest({
    params: {
      action: "web/profile/menu/getList",
    },
  });

  return (
    <>
      <Suspense
        request={request}
        LoadingComponent={() => <>Loading...</>}
        ErrorComponent={({ error }) => <>{error.message}</>}
      >
        {({ response }) => (
          <Aside>
            <Aside.Menu items={response.results} />

            <Aside.Content title={resource.longtitle}>
              <Card className="pb-2 pt-2">
                <Card.Body>
                  <LoadContent params={{ action: "web/profile/get" }}>
                    {({ response }) => <FormEdit {...response} />}
                  </LoadContent>
                </Card.Body>
              </Card>
            </Aside.Content>
          </Aside>
        )}
      </Suspense>
    </>
  );
};
