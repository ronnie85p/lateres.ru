import React, { useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { sendRequest, useNavigate } from "@js/components/Request";
import Preloader from "@js/components/Preloader";
import Form, { useForm } from "@js/components/Form";
import Button from "@js/components/Form/Button";
import Container from "@js/components/Page/Container";
import useDataContext from "@js/components/useDataContext";

export default function LoginPage(props) {
  const { data, config } = useDataContext();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("amp;return_url");

  const action = "web/auth/login";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSuccess({ object }) {
      if (object.redirect) {
        window.location.href = object.redirect;
      }
    },
  });

  return (
    <Container>
      <Preloader show={form.isSubmitting} />

      <Row>
        <Col className="m-auto" sm={12} md={5} lg={4}>
          <div className="h4">{data?.pagetitle}</div>

          <Card className="shadow-sm border-0">
            <Card.Body>
              <Form.Alert
                variant={form.response.success ? "success" : "danger"}
                text={form.message}
              />

              <Form preventPressEnter={false} onSubmit={form.handleSubmit}>
                <input
                  type="hidden"
                  name="return_url"
                  defaultValue={returnUrl}
                />

                <Form.Group>
                  <Form.Label htmlFor="username">
                    {config.lang["app.auth_login_username_field"]}
                  </Form.Label>
                  <Form.Input
                    name="username"
                    placeholder=""
                    isInvalid={!!form.errors.username}
                    autoFocus
                  />

                  <Form.FieldError>{form.errors.username}</Form.FieldError>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="password">
                    {config.lang["app.auth_login_password_field"]}
                  </Form.Label>
                  <Form.Input
                    type="password"
                    name="password"
                    placeholder=""
                    isInvalid={!!form.errors.password}
                  />

                  <Form.FieldError>{form.errors.password}</Form.FieldError>
                </Form.Group>

                <Row>
                  <Col md="6">
                    <Form.Check
                      type="checkbox"
                      name="rememberme"
                      id="rememberme"
                      label={config.lang["app.auth_login_rememberme_field"]}
                      defaultValue={1}
                      defaultChecked
                    />
                  </Col>

                  <Col className="text-end" md="6">
                    <Link to="/login/forgot">
                      {config.lang["app.auth_login_forgot_button"]}
                    </Link>
                  </Col>
                </Row>

                <Button className="btn-block mt-4" type="submit">
                  {config.lang["app.auth_login_action_button"]}
                </Button>
              </Form>

              <hr className="my-3" />

              <Row className="">
                <Col className="text-end" md="12">
                  <Link to="/register">
                    {config.lang["app.auth_login_register_button"]}
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
