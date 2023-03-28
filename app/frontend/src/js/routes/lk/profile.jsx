import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLoaderData, Link } from "react-router-dom";

import Context from "@js/contexts/context";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";
import Preloader from "@js/components/Preloader";
import Form, { useForm } from "@js/components/Form";
import Button from "@js/components/Form/Button";
import { sendRequest } from "../../components/Request";

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
  const context = React.useContext(Context);
  const { data } = context;
  const [userType, setUserType] = React.useState(data.user_type);

  const action = "web/profile/update";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[profile] updating...");
      return true;
    },
  });

  const { response, errors, isSubmitting, handleSubmit } = form;

  return (
    <Context.Provider value={{ ...context, form }}>
      <Layer>
        <Preloader show={isSubmitting} />
        <Form onSubmit={handleSubmit}>
          <Form.Alert
            variant={response.success ? "success" : "error"}
            text={response.message}
          />

          <Row>
            <Form.Group as={Col}>
              <UserTypeSwitch
                checked={userType === 1}
                isInvalid={!!errors.user_type}
                onChange={(event) => setUserType(!userType)}
              />
              <Form.FieldError>{errors.user_type}</Form.FieldError>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="6">
              <Form.Label htmlFor="fullname">
                Фамилия Имя Отчество
                <Form.Asterix />
              </Form.Label>
              <Form.Input
                name="fullname"
                defaultValue={data.fullname}
                isInvalid={!!errors.fullname}
              />
              <Form.FieldError>{errors.fullname}</Form.FieldError>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md="3">
              {data.phones?.length ? (
                <>
                  <Form.Label htmlFor="mobilephone">Телефон</Form.Label>
                  <Form.Select
                    name="mobilephone"
                    defaultValue={data.mobilephone}
                    className="mb-1"
                  >
                    <option value="">--Не выбран</option>
                    {data.phones.map(({ id, text }) => (
                      <option key={id} value={id}>
                        {text}
                      </option>
                    ))}
                  </Form.Select>
                </>
              ) : (
                <></>
              )}
              <Link to="/lk/contacts">Добавить</Link>
            </Form.Group>
          </Row>

          {userType ? (
            <>
              <hr /> <Company />
            </>
          ) : (
            <></>
          )}

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

const UserTypeSwitch = (props) => {
  const { checked: pchecked, onChange } = props;
  const [checked, setChecked] = React.useState(pchecked);

  const handleChange = (event) => {
    setChecked(!checked);

    onChange && onChange(event);
  };

  return (
    <Form.Check
      {...props}
      type="switch"
      id="user-type"
      name="user_type"
      label="Юридическое лицо"
      style={{ opacity: checked ? 1 : 0.5 }}
      value={1}
      checked={checked}
      onChange={handleChange}
    />
  );
};

const Company = (props) => {
  const { form, data } = React.useContext(Context);
  const { errors } = form;
  const { company } = data;

  const [addressRequired, dispatchAddressRequired] = React.useReducer(
    (state, { event, value }) => {
      event.preventDefault();

      return value;
    },
    company.address_required
  );

  return (
    <>
      <div className="fs-4 mb-4">Организация</div>

      <input
        type="hidden"
        name="company_address_required"
        value={addressRequired}
      />

      <Row>
        <Form.Group as={Col} md={8}>
          <Form.Label htmlFor="company_name">
            Полное название
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="company_name"
            placeholder=""
            defaultValue={company?.name}
            isInvalid={!!errors.company_name}
          />
          <Form.FieldError>{errors.company_name}</Form.FieldError>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="company_inn">
            ИНН
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="company_inn"
            placeholder="0000000000"
            min={0}
            maxLength={10}
            maskAlias="number"
            defaultValue={company?.inn}
            isInvalid={!!errors.company_inn}
          />
          <Form.FieldError>{errors.company_inn}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="company_ogrn">
            ОГРН (ИП)
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="company_ogrn"
            placeholder="000000000000000"
            min={0}
            maxLength={15}
            maskAlias="number"
            defaultValue={company?.ogrn}
            isInvalid={!!errors.company_ogrn}
          />
          <Form.FieldError>{errors.ogrn}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={2}>
          <Form.Label htmlFor="company_kpp">КПП</Form.Label>
          <Form.Input
            name="company_kpp"
            placeholder="000000000"
            min={0}
            maxLength={9}
            maskAlias="number"
            defaultValue={company?.kpp}
            isInvalid={!!errors.company_kpp}
          />
          <Form.FieldError>{errors.company_kpp}</Form.FieldError>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group className="form-group" as={Col} md={3}>
          <Form.Label htmlFor="company_phone">Телефон</Form.Label>
          <Form.Input
            name="company_phone"
            placeholder="+7 (___) ___ ____"
            maskAlias="phone"
            defaultValue={company?.phone}
            isInvalid={!!errors.company_phone}
          />
          <Form.FieldError>{errors.company_phone}</Form.FieldError>
        </Form.Group>
      </Row>

      {addressRequired ? (
        <>
          <CompanyAddress />

          <a
            href="#"
            className="text-danger"
            onClick={(event) => dispatchAddressRequired({ event, value: 0 })}
          >
            Удалить адрес
          </a>
        </>
      ) : (
        <>
          <a
            href="#"
            onClick={(event) => dispatchAddressRequired({ event, value: 1 })}
          >
            Добавить адрес
          </a>
        </>
      )}
    </>
  );
};

const CompanyAddress = (props) => {
  const { form, data } = React.useContext(Context);
  const { errors } = form;
  const { company } = data;

  return (
    <>
      <div className="h6 my-4">
        <span
          className="border-bottom pb-1"
          ref={(node) => {
            if (!node) return;
            node.style.setProperty("border-bottom-width", "2px", "important");
            node.style.setProperty(
              "border-bottom-color",
              "#cdcdcd",
              "important"
            );
          }}
        >
          Юридический адрес
        </span>
      </div>

      <Row>
        <Form.Group as={Col} md={6}>
          <Form.Label htmlFor="company_address_country">
            Страна
            <Form.Asterix />
          </Form.Label>
          <Form.Select
            name="company_address_country"
            placeholder=""
            defaultValue={company?.address_country}
            isInvalid={!!errors.company_address_country}
          >
            <option value="">-- Не выбрана</option>
            <option value="Россия">Россия</option>
          </Form.Select>
          <Form.FieldError>{errors.company_address_country}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={2}>
          <Form.Label htmlFor="company_address_index">
            Индекс
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="company_address_index"
            maxLength={6}
            placeholder="000000"
            maskAlias="number"
            defaultValue={company?.address_index}
            isInvalid={!!errors.company_address_index}
          />
          <Form.FieldError>{errors.company_address_index}</Form.FieldError>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md={8}>
          <Form.Label htmlFor="company_address_region">
            Регион
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="company_address_region"
            placeholder="Например: Московская область"
            defaultValue={company?.address_region}
            isInvalid={!!errors.company_address_region}
          />
          <Form.FieldError>{errors.company_address_region}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={8}>
          <Form.Label htmlFor="company_address_city">
            Населенный пункт
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="company_address_city"
            placeholder="Например: г. Солнечногорск"
            defaultValue={company?.address_city}
            isInvalid={!!errors.company_address_city}
          />
          <Form.FieldError>{errors.company_address_city}</Form.FieldError>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md={6}>
          <Form.Label htmlFor="company_address_street">
            Улица
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="company_address_street"
            placeholder="Например: ул. Разина"
            defaultValue={company?.address_street}
            isInvalid={!!errors.company_address_street}
          />
          <Form.FieldError>{errors.company_address_street}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={2}>
          <Form.Label htmlFor="company_address_building">
            Строение
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="company_address_building"
            placeholder=""
            defaultValue={company?.address_building}
            isInvalid={!!errors.company_address_building}
          />
          <Form.FieldError>{errors.company_address_building}</Form.FieldError>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md={2}>
          <Form.Label htmlFor="company_address_corpus">Корпус</Form.Label>
          <Form.Input
            name="company_address_corpus"
            placeholder=""
            defaultValue={company?.address_corpus}
            isInvalid={!!errors.company_address_corpus}
          />
          <Form.FieldError>{errors.company_address_corpus}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={2}>
          <Form.Label htmlFor="company_address_floor">Этаж</Form.Label>
          <Form.Control
            type="number"
            name="company_address_floor"
            min={0}
            placeholder=""
            defaultValue={company?.address_floor}
            isInvalid={!!errors.company_address_floor}
          />
          <Form.FieldError>{errors.company_address_floor}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={2}>
          <Form.Label htmlFor="company_address_premise">Помещение</Form.Label>
          <Form.Input
            name="company_address_premise"
            placeholder=""
            defaultValue={company?.address_premise}
            isInvalid={!!errors.company_address_premise}
          />
          <Form.FieldError>{errors.company_address_premise}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={2}>
          <Form.Label htmlFor="company_address_room">Офис</Form.Label>
          <Form.Input
            name="company_address_room"
            placeholder=""
            defaultValue={company?.address_room}
            isInvalid={!!errors.company_address_room}
          />
          <Form.FieldError>{errors.company_address_room}</Form.FieldError>
        </Form.Group>
      </Row>
    </>
  );
};
