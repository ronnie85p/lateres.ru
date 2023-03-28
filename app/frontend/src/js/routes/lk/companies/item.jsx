import React, { useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import { useLoaderData, Link, useLocation } from "react-router-dom";

import Context from "@js/contexts/context";
import Profile from "@js/components/Page/Profile";
import Button from "@js/components/Form/Button";
import { Form, useForm } from "@js/components/Form";
import Icon from "@js/components/Icon";
import { sendRequest } from "@js/components/Request";

const Company = (props) => {
  const context = useContext(Context);
  const data = useLoaderData();
  const isEdit = data?.id > 0;

  context.data = data;
  context.isEdit = isEdit;

  return (
    <>
      {isEdit ? (
        <>
          <Profile.Title subtext={"Редактирование"}>Компания</Profile.Title>
        </>
      ) : (
        <>
          <Profile.Title>Новая компания</Profile.Title>
        </>
      )}

      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <CompanyForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const CompanyForm = (props) => {
  const context = useContext(Context);
  const { data, isEdit } = context;
  const [isAddressRequired, setAddressRequired] = useState(
    () => data?.address_required || false
  );

  const action = isEdit
    ? "web/profile/company/update"
    : "web/profile/company/create";

  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[company] " + (isEdit ? "updating..." : "creating..."));
      return true;
    },
  });

  return (
    <>
      <Form onSubmit={form.handleSubmit}>
        <input type="hidden" name="id" value={data.id} />

        <Row>
          <Form.Group as={Col} md={12}>
            <Form.Label htmlFor="name">
              Полное название<span className="text-danger">*</span>
            </Form.Label>
            <Form.Input
              name="name"
              placeholder=""
              defaultValue={data?.name}
              isInvalid={!!form.errors.name}
            />
            <Form.FieldError>{form.errors.name}</Form.FieldError>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={3}>
            <Form.Label htmlFor="inn">
              ИНН<span className="text-danger">*</span>
            </Form.Label>
            <Form.Input
              name="inn"
              placeholder=""
              min={0}
              maxLength={10}
              defaultValue={data?.inn}
              isInvalid={!!form.errors.inn}
            />
            <Form.FieldError>{form.errors.inn}</Form.FieldError>
          </Form.Group>

          <Form.Group as={Col} md={5}>
            <Form.Label htmlFor="ogrn">
              ОГРН (ИП)<span className="text-danger">*</span>
            </Form.Label>
            <Form.Input
              name="ogrn"
              placeholder=""
              min={0}
              maxLength={15}
              defaultValue={data?.ogrn}
              isInvalid={!!form.errors.ogrn}
            />
            <Form.FieldError>{form.errors.ogrn}</Form.FieldError>
          </Form.Group>

          <Form.Group as={Col} md={4}>
            <Form.Label htmlFor="kpp">КПП</Form.Label>
            <Form.Input
              name="kpp"
              placeholder=""
              min={0}
              maxLength={9}
              defaultValue={data?.kpp}
              isInvalid={!!form.errors.kpp}
            />
            <Form.FieldError>{form.errors.kpp}</Form.FieldError>
          </Form.Group>

          <Form.Group className="form-group" as={Col} md={5}>
            <Form.Label htmlFor="phone">Телефон</Form.Label>
            <Form.Input
              name="phone"
              placeholder="+7 (___) ___ ____"
              maskAlias="phone"
              defaultValue={data?.phone}
              isInvalid={!!form.errors.phone}
            />
            <Form.FieldError>{form.errors.phone}</Form.FieldError>
          </Form.Group>
        </Row>

        {isAddressRequired ? <Address form={form} data={data} /> : <></>}

        <Row className="mt-4">
          <Col md={12}>
            <Form.Check
              type="checkbox"
              id="address-required"
              label="Указать адрес"
              name="address_required"
              value={1}
              checked={isAddressRequired}
              onChange={() => setAddressRequired(!isAddressRequired)}
            />
          </Col>
        </Row>

        <Form.Check
          type="checkbox"
          name="bydef"
          id="bydef"
          label={"По умолчанию"}
          defaultValue={1}
          defaultChecked
        />

        <hr />

        <Button
          type="submit"
          loading={form.isSubmitting}
          loadingText={"Сохраняем..."}
        >
          Сохранить
        </Button>
      </Form>
    </>
  );
};

const Address = (props) => {
  const { form, data } = props;

  return (
    <>
      <div className="h5 mt-4 text-muted">Юридический адрес</div>
      <Row>
        <Form.Group as={Col} md={9}>
          <Form.Label htmlFor="address_country">
            Страна<span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="address_country"
            placeholder=""
            defaultValue={data?.address_country}
            isInvalid={!!form.errors.address_country}
          >
            <option value="">-- Не выбрана</option>
            <option value="Россия">Россия</option>
          </Form.Select>
          <Form.FieldError>{form.errors.address_country}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="address_index">
            Индекс<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="address_index"
            maxLength={6}
            placeholder=""
            defaultValue={data?.address_index}
            isInvalid={!!form.errors.address_index}
          />
          <Form.FieldError>{form.errors.address_index}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={12}>
          <Form.Label htmlFor="address_region">
            Регион<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="address_region"
            placeholder="Например: Московская область"
            defaultValue={data?.address_region}
            isInvalid={!!form.errors.address_region}
          />
          <Form.FieldError>{form.errors.address_region}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={12}>
          <Form.Label htmlFor="address_city">
            Город<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="address_city"
            placeholder="Например: г. Солнечногорск"
            defaultValue={data?.address_city}
            isInvalid={!!form.errors.address_city}
          />
          <Form.FieldError>{form.errors.address_city}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={9}>
          <Form.Label htmlFor="address_street">
            Улица<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="address_street"
            placeholder="Например: ул. Разина"
            defaultValue={data?.address_street}
            isInvalid={!!form.errors.address_street}
          />
          <Form.FieldError>{form.errors.address_street}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="address_building">
            Строение<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="address_building"
            placeholder=""
            defaultValue={data?.address_building}
            isInvalid={!!form.errors.address_building}
          />
          <Form.FieldError>{form.errors.address_building}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="address_corpus">Корпус</Form.Label>
          <Form.Input
            name="address_corpus"
            placeholder=""
            defaultValue={data?.address_corpus}
            isInvalid={!!form.errors.address_corpus}
          />
          <Form.FieldError>{form.errors.address_corpus}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="address_floor">Этаж</Form.Label>
          <Form.Control
            type="number"
            name="address_floor"
            min={0}
            placeholder=""
            defaultValue={data?.address_floor}
            isInvalid={!!form.errors.address_floor}
          />
          <Form.FieldError>{form.errors.address_floor}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="address_floor">Помещение</Form.Label>
          <Form.Input
            name="address_premise"
            placeholder=""
            defaultValue={data?.address_premise}
            isInvalid={!!form.errors.address_premise}
          />
          <Form.FieldError>{form.errors.address_premise}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="address_room">Офис</Form.Label>
          <Form.Input
            name="address_room"
            placeholder=""
            defaultValue={data?.address_room}
            isInvalid={!!form.errors.address_room}
          />
          <Form.FieldError>{form.errors.address_room}</Form.FieldError>
        </Form.Group>
      </Row>
    </>
  );
};

export default Company;
