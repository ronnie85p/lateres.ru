import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Page from "@js/components/Page";
import FormGroup from "@js/components/Form/Group";
import { useForm } from "@js/components/Form";
import { useRequest } from "@js/components/Http/Request";

export default (props) => {
  const form = useForm({
    request: useRequest({
      params: {
        action: "web/auth/register",
      },
    }),

    onSubmit() {
      console.log("[SignInPage] submit");

      return false;
    },
  });

  return (
    <>
      <Row>
        <Col className="m-auto" md="5">
          <div className="h4">Регистрация</div>

          <Card className="shadow-sm border-0">
            <Card.Body>
              <Form
                noValidate
                // validate={}
                onSubmit={form.handleSubmit}
              >
                <Row>
                  <Form.Group className="form-group" as={Col} md={12}>
                    <label htmlFor="lastname">
                      Фамилия<span className="text-danger">*</span>
                    </label>
                    <Form.Control
                      type="input"
                      name="lastname"
                      placeholder=""
                      required
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group className="form-group" as={Col} md={5}>
                    <label htmlFor="firstname">
                      Имя<span className="text-danger">*</span>
                    </label>
                    <Form.Control
                      type="input"
                      name="firstname"
                      placeholder=""
                      required
                    />
                  </Form.Group>

                  <Form.Group className="form-group" as={Col} md={7}>
                    <label htmlFor="midname">
                      Отчество<span className="text-danger">*</span>
                    </label>
                    <Form.Control
                      type="input"
                      name="midname"
                      placeholder=""
                      required
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group className="form-group" as={Col} md={7}>
                    <label htmlFor="email">
                      Емэйл<span className="text-danger">*</span>
                    </label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder=""
                      required
                    />
                  </Form.Group>

                  <Form.Group className="form-group" as={Col} md={5}>
                    <label htmlFor="mobilephone">Телефон</label>
                    <Form.Control
                      type="input"
                      name="mobilephone"
                      placeholder="+7 (___) ___ ____"
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col}>
                    <Form.Check
                      type="switch"
                      id="account-type"
                      label="Юридическое лицо"
                    />
                  </Form.Group>
                </Row>

                {/* {isUserCompany ? <UserCompanyFields /> : <></>} */}

                <hr className="mb-4" />
                {/* {!isGenPassword ? <PasswordFields /> : <></>} */}

                <Row>
                  <Form.Group as={Col}>
                    <Form.Check
                      type="checkbox"
                      name="gen_password"
                      id="gen-password"
                      label="Сгенеровать пароль"
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group as={Col}>
                    <Form.Check type="checkbox" name="agreed" id="agreed" />
                  </Form.Group>
                </Row>

                <hr className="" />
                <Row className="mt-4">
                  <Col className="text-center" md={12}>
                    <Button className="btn-md" type="submit" variant="primary">
                      Зарегистрироваться
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
