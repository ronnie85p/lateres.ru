import React, { useContext } from "react";
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

const Address = (props) => {
  const context = useContext(Context);
  const data = useLoaderData();
  const isEdit = data?.id > 0;

  context.data = data;
  context.isEdit = isEdit;

  return (
    <>
      {isEdit ? (
        <>
          <Profile.Title subtext={"Редактирование"}>Адреc</Profile.Title>
        </>
      ) : (
        <>
          <Profile.Title>Новый адрес</Profile.Title>
        </>
      )}

      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <AddressForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const AddressForm = (props) => {
  const context = useContext(Context);
  const { data, isEdit } = context;
  const action = isEdit
    ? "web/profile/address/update"
    : "web/profile/address/create";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[address] " + (isEdit ? "updating..." : "creating..."));
      return true;
    },
  });

  return (
    <>
      <Form onSubmit={form.handleSubmit}>
        <input type="hidden" name="id" value={data.id} />

        <Row>
          <Form.Group as={Col}>
            <Form.Label htmlFor="title">
              Заголовок<span className="text-danger">*</span>
            </Form.Label>
            <Form.Input
              name="title"
              placeholder=""
              defaultValue={data?.title}
              isInvalid={!!form.errors.title}
            />
            <Form.FieldError>{form.errors.title}</Form.FieldError>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={12} className="form-group">
            <Form.Label htmlFor="region">
              Регион<span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="region"
              defaultValue={data?.region}
              isInvalid={!!form.errors.region}
            >
              <option value="Московская область">Московская область</option>
            </Form.Select>
            <Form.FieldError>{form.errors.region}</Form.FieldError>
          </Form.Group>

          <Form.Group as={Col} md={12}>
            <Form.Label htmlFor="district">Район</Form.Label>
            <Form.Input
              name="district"
              placeholder="Например: Солнечногорский район"
              defaultValue={data?.district}
              isInvalid={!!form.errors.district}
            />
            <Form.FieldError>{form.errors.district}</Form.FieldError>
          </Form.Group>

          <Form.Group as={Col} md={12}>
            <Form.Label htmlFor="city">
              Населенный пункт<span className="text-danger">*</span>
            </Form.Label>
            <Form.Input
              name="city"
              placeholder="Например: Солнечногорск"
              defaultValue={data?.city}
              isInvalid={!!form.errors.city}
            />
            <Form.FieldError>{form.errors.city}</Form.FieldError>
          </Form.Group>

          <Form.Group as={Col} md={9}>
            <Form.Label htmlFor="street">
              Улица<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="street"
              placeholder="Например: улица Баранова"
              defaultValue={data?.street}
              isInvalid={!!form.errors.street}
            />
            <Form.FieldError>{form.errors.street}</Form.FieldError>
          </Form.Group>

          <Form.Group as={Col} md={3}>
            <Form.Label htmlFor="building">
              Строение<span className="text-danger">*</span>
            </Form.Label>
            <Form.Input
              name="building"
              placeholder=""
              defaultValue={data?.building}
              isInvalid={!!form.errors.building}
            />
            <Form.FieldError>{form.errors.building}</Form.FieldError>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={12}>
            <Form.Label htmlFor="comment">Дополнительные инструкции</Form.Label>
            <Form.Control
              as="textarea"
              name="comment"
              placeholder="Если необходимо, то предоставьте подробную информацию по доставке или оставьте комментарий"
              maxLength={1500}
              style={{ height: "100px" }}
              defaultValue={data?.comment}
              isInvalid={!!form.errors.comment}
            />
            <Form.FieldError>{form.errors.comment}</Form.FieldError>
          </Form.Group>
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

export default Address;
