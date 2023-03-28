import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { useForm, Form } from "@js/components/Form";
import Button from "@js/components/Form/Button";
import Icon from "@js/components/Icon";
import { sendRequest } from "@js/components/Request";
import { Link } from "@js/components/Router";
import Container from "@js/components/Page/Container";

const Register = (props) => {
  const [isGeneratePassword, setGeneratePassword] = useState(true);
  const [isJuristicType, setJuristicType] = useState(false);
  const [agreed, setAgreed] = useState(0);

  const form = useForm({
    actionRequest: (values) =>
      sendRequest("web/auth/register", values, { return: "data" }),

    onSubmit() {
      console.log("[Register] submit");

      return true;
    },
  });

  console.log("errors", form.errors, { fullname: !!form.errors.fullname });

  return (
    <Container>
      <Row>
        <Col className="m-auto" md={6}>
          <Form onSubmit={form.handleSubmit}>
            <Row className="mb-3">
              <Col>
                <div className="h4 m-0">Регистрация</div>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-end"
                style={{ opacity: isJuristicType ? 1 : 0.7 }}
              >
                <Form.Check
                  type="switch"
                  id="user-type"
                  label="Юридическое лицо"
                  name="user_type"
                  value={1}
                  checked={isJuristicType}
                  onChange={() => setJuristicType(!isJuristicType)}
                />
              </Col>
            </Row>

            <Card className="shadow-sm border-0">
              <Card.Body>
                <Row>
                  <Form.Group as={Col} md={12}>
                    <label htmlFor="fullname">
                      Как Вас зовут<span className="text-danger">*</span>
                    </label>
                    <Form.Input
                      name="fullname"
                      placeholder="Имя Отчество Фамилия"
                      isInvalid={!!form.errors.fullname}
                    />
                    <Form.FieldError>{form.errors.fullname}</Form.FieldError>
                    <Form.Text>
                      Пожалуйста, заполните полное имя в том порядке, который
                      указан.
                    </Form.Text>
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col} md={7}>
                    <Form.Label htmlFor="email">
                      Емэйл<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="user@domain.ru"
                      isInvalid={!!form.errors.email}
                    />
                    <Form.FieldError>{form.errors.email}</Form.FieldError>
                  </Form.Group>

                  <Form.Group as={Col} md={5}>
                    <Form.Label htmlFor="mobilephone">Телефон</Form.Label>
                    <Form.Input
                      name="mobilephone"
                      placeholder="+7 (___) ___ ____"
                      maskAlias="phone"
                      isInvalid={!!form.errors.mobilephone}
                    />
                    <Form.FieldError>{form.errors.mobilephone}</Form.FieldError>
                  </Form.Group>
                </Row>

                {isJuristicType ? (
                  <>
                    <hr className="mb-4" />
                    <UserCompany form={form} />
                  </>
                ) : (
                  <></>
                )}

                <hr className="mb-4" />

                <Row>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      id="gen-password"
                      label="Сгенеровать пароль"
                      name="generatePassword"
                      value={1}
                      checked={isGeneratePassword}
                      onChange={() => setGeneratePassword(!isGeneratePassword)}
                    />

                    {isGeneratePassword ? (
                      <Form.Text>Вышлем пароль на почту</Form.Text>
                    ) : (
                      <NewPassword form={form} />
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Check
                      type="checkbox"
                      id="agreed"
                      name="agreed"
                      label={<AgreementLabel />}
                      value={1}
                      checked={agreed}
                      onChange={() => setAgreed(!agreed)}
                      isInvalid={!!form.errors.agreed}
                    />
                    <Form.FieldError>{form.errors.agreed}</Form.FieldError>
                  </Col>
                </Row>

                <hr className="" />
                <Row className="mt-4">
                  <Col className="text-center" md={12}>
                    <Button
                      className="btn-md"
                      type="submit"
                      disabled={form.isSubmitting || !agreed}
                    >
                      Зарегистрироваться
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const AgreementLabel = (props) => {
  return (
    <>
      <span>
        Я согласен с условиями{" "}
        <a href="/user-agreement" target="_blanc">
          <Icon name="box-arrow-up-right" /> Пользовательского Соглашения
        </a>
      </span>
    </>
  );
};

const NewPassword = (props) => {
  const { form } = props;

  return (
    <Row className="mt-4">
      <Col md={7}>
        <Form.Group>
          <Form.Label htmlFor="password">Пароль</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder=""
            isInvalid={!!form.errors.password}
            autoFocus
          />
          <Form.FieldError>{form.errors.password}</Form.FieldError>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password_again">Повторите пароль</Form.Label>
          <Form.Control
            type="password"
            name="password_again"
            placeholder=""
            isInvalid={!!form.errors.password_again}
          />
          <Form.FieldError>{form.errors.password_again}</Form.FieldError>
        </Form.Group>
      </Col>
      <Col md={5}>
        <Form.Text>
          Пароль должен содержать:
          <ul>
            <li>не менее 8 символов</li>
          </ul>
        </Form.Text>
      </Col>
    </Row>
  );
};

const UserCompany = (props) => {
  const { form } = props;
  const [isAddressRequired, setAddressRequired] = useState(false);

  return (
    <>
      <div className="h5 mt-4 text-muted">Организация</div>
      <Row>
        <Form.Group as={Col} md={12}>
          <Form.Label htmlFor="company_name">
            Полное название<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="company_name"
            placeholder=""
            isInvalid={!!form.errors.company_name}
          />
          <Form.FieldError>{form.errors.company_name}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={6}>
          <Form.Label htmlFor="company_inn">
            ИНН<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="company_inn"
            placeholder=""
            min={0}
            maxLength={10}
            isInvalid={!!form.errors.company_inn}
          />
          <Form.FieldError>{form.errors.company_inn}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={6}>
          <Form.Label htmlFor="company_kpp">
            КПП<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="company_kpp"
            placeholder=""
            min={0}
            maxLength={9}
            isInvalid={!!form.errors.company_kpp}
          />
          <Form.FieldError>{form.errors.company_kpp}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={7}>
          <Form.Label htmlFor="company_ogrn">
            ОГРН (ИП)<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="company_ogrn"
            placeholder=""
            min={0}
            maxLength={15}
            isInvalid={!!form.errors.company_ogrn}
          />
          <Form.FieldError>{form.errors.company_ogrn}</Form.FieldError>
        </Form.Group>

        <Form.Group className="form-group" as={Col} md={5}>
          <Form.Label htmlFor="company_phone">
            Телефон<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="company_phone"
            placeholder="+7 (___) ___ ____"
            maskAlias="phone"
            isInvalid={!!form.errors.company_phone}
          />
          <Form.FieldError>{form.errors.company_phone}</Form.FieldError>
        </Form.Group>
      </Row>

      {isAddressRequired ? <UserCompanyAddress form={form} /> : <></>}

      <Row className="mt-4">
        <Col md={12}>
          <Form.Check
            type="checkbox"
            id="company-address-required"
            label="Указать адрес"
            name="company_address_required"
            value={1}
            checked={isAddressRequired}
            onChange={() => setAddressRequired(!isAddressRequired)}
          />
        </Col>
      </Row>
    </>
  );
};

const UserCompanyAddress = (props) => {
  const { form } = props;

  return (
    <>
      <div className="h5 mt-4 text-muted">Юридический адрес</div>
      <Row>
        <Form.Group as={Col} md={8}>
          <Form.Label htmlFor="company_address_country">
            Страна<span className="text-danger">*</span>
          </Form.Label>
          <Form.Select
            name="company_address_country"
            placeholder=""
            isInvalid={!!form.errors.company_address_country}
          >
            <option value="">-- Не выбрана</option>
            <option value="Россия">Россия</option>
          </Form.Select>
          <Form.FieldError>
            {form.errors.company_address_country}
          </Form.FieldError>
        </Form.Group>

        <Form.Group className="form-group" as={Col} md={4}>
          <Form.Label htmlFor="company_address_index">
            Индекс<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="company_address_index"
            maxLength={6}
            placeholder=""
            isInvalid={!!form.errors.company_address_index}
          />
          <Form.FieldError>{form.errors.company_address_index}</Form.FieldError>
        </Form.Group>

        <Form.Group className="form-group" as={Col} md={12}>
          <Form.Label htmlFor="company_address_region">
            Область<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="company_address_region"
            placeholder="Например: Московская область"
            isInvalid={!!form.errors.company_address_region}
          />
          <Form.FieldError>
            {form.errors.company_address_region}
          </Form.FieldError>
        </Form.Group>

        <Form.Group className="form-group" as={Col} md={12}>
          <Form.Label htmlFor="company_address_city">
            Город<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="company_address_city"
            placeholder="Например: г. Солнечногорск"
            isInvalid={!!form.errors.company_address_city}
          />
          <Form.FieldError>{form.errors.company_address_city}</Form.FieldError>
        </Form.Group>

        <Form.Group className="form-group" as={Col} md={9}>
          <Form.Label htmlFor="company_address_street">
            Улица<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="company_address_street"
            placeholder="Например: ул. Разина"
            isInvalid={!!form.errors.company_address_street}
          />
          <Form.FieldError>
            {form.errors.company_address_street}
          </Form.FieldError>
        </Form.Group>

        <Form.Group className="form-group" as={Col} md={3}>
          <Form.Label htmlFor="company_address_building">
            Строение<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input
            name="company_address_building"
            placeholder=""
            isInvalid={!!form.errors.company_address_bulding}
          />
          <Form.FieldError>
            {form.errors.company_address_building}
          </Form.FieldError>
        </Form.Group>

        <Form.Group className="form-group" as={Col} md={3}>
          <Form.Label htmlFor="company_address_corpus">Корпус</Form.Label>
          <Form.Input
            name="company_address_corpus"
            placeholder=""
            isInvalid={!!form.errors.company_address_corpus}
          />
          <Form.FieldError>
            {form.errors.company_address_corpus}
          </Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="company_address_floor">Этаж</Form.Label>
          <Form.Control
            type="number"
            name="company_address_floor"
            min={0}
            placeholder=""
            isInvalid={!!form.errors.company_address_floor}
          />
          <Form.FieldError>{form.errors.company_address_floor}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="company_address_floor">Помещение</Form.Label>
          <Form.Input
            name="company_address_premise"
            placeholder=""
            isInvalid={!!form.errors.company_address_premise}
          />
          <Form.FieldError>
            {form.errors.company_address_premise}
          </Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="company_address_room">Офис</Form.Label>
          <Form.Input
            name="company_address_room"
            placeholder=""
            isInvalid={!!form.errors.company_address_room}
          />
          <Form.FieldError>{form.errors.company_address_room}</Form.FieldError>
        </Form.Group>
      </Row>
    </>
  );
};

export default Register;
