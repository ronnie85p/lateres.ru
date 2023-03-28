import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { useRequest } from "@js/components/Request";
import { useForm } from "@js/components/Form";

const App = (props) => {
  const form = useForm({
    requestOptions: {
      params: {
        action: "mgr/extra/package/getObjects",
      },
    },

    onSubmit({ event }) {
      console.log("submit", event.currentTarget);
      return true;
    },
  });

  return (
    <>
      <Card>
        <Card.Body>
          <Form onSubmit={form.submit}>
            <Row className="mb-2">
              <Form.Group as={Col} md={6}>
                <Form.Label htmlFor="pkg_path">Package Name:</Form.Label>

                <InputActionField
                  inputName="package_name"
                  btnText="Start parse"
                  disabled={form.isSubmitting}
                  btnProps={{
                    type: "submit",
                  }}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <Form.Check
                  defaultChecked
                  defaultValue={1}
                  id="parse-schema"
                  name="parse_schema"
                  label="Schema need parse"
                />
              </Form.Group>
            </Row>
          </Form>

          <hr className="mb-4" />

          <div className="objects-list">
            {form.isSubmitting ? (
              <>
                <b>Load objects...</b>
              </>
            ) : (
              ""
            )}

            {form.response?.message ? (
              <>
                <div
                  className={
                    form.response.success ? "text-success" : "text-danger"
                  }
                >
                  {form.response.message}
                </div>
              </>
            ) : (
              <></>
            )}

            {form.response?.success ? (
              <>
                <PackageObjects {...form.response.object} />
              </>
            ) : (
              <></>
            )}

            {/* {this.state.package?.model?.objects ? <ButtonSubmit className="btn btn-primary mt-4"/> : <></>} */}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

const InputActionField = (props) => {
  const {
    inputName = "",
    inputDefaultValue = "",
    onBtnClick = () => {},
    disabled = false,
    btnText = "",
    inputProps,
    btnProps,
  } = props;

  const [isBtnDisabled, setIsBtnDisabled] = useState(() => {
    return !inputDefaultValue || disabled;
  });

  const [isInputDisabled, setIsInputDisabled] = useState(() => {
    return disabled;
  });

  const handleInput = ({ currentTarget }) => {
    const value = currentTarget.value;

    setIsBtnDisabled(/^s*$/.test(value));
  };

  useEffect(() => {
    setIsBtnDisabled(disabled);
    setIsInputDisabled(disabled);
  }, [disabled]);

  return (
    <>
      <InputGroup>
        <Form.Control
          type="input"
          name={inputName}
          disabled={isInputDisabled}
          defaultValue={inputDefaultValue}
          onInput={handleInput}
          {...inputProps}
        />

        <Button
          variant="primary"
          disabled={isBtnDisabled}
          onClick={onBtnClick}
          {...btnProps}
        >
          {btnText}
        </Button>
      </InputGroup>
    </>
  );
};

const PackageObjects = (props) => {
  const { model, package_name } = props;

  const [btnCreateDisabled, setBtnCreateDisabled] = useState(false);

  const form = useForm({
    requestOptions: {
      params: {
        action: "mgr/extra/package/createObjects",
      },
    },
  });

  const handleCheckbox = () => {};

  const objects = [];
  for (let _class in model.objects) {
    let name = `package_object[${_class}]`;
    let object = model.objects[_class];

    objects.push(
      <Col md="4" key={_class}>
        <Form.Check
          defaultChecked
          disabled={form.isSubmitting}
          name={name}
          id={name}
          defaultValue={object.class}
          label={object.class}
          onChange={handleCheckbox}
        />

        <span className="text-muted">{_class}</span>
      </Col>
    );
  }

  if (!objects.length) {
    return <div className="text-muted">No objects loaded</div>;
  }

  return (
    <>
      <div className="h4">Objects</div>

      <Form onSubmit={form.submit}>
        <Form.Control
          type="hidden"
          name="package_name"
          defaultValue={package_name}
        />
        <Row className="mb-2">{objects}</Row>

        <div className="d-flex align-items-end" style={{ minHeight: 20 }}>
          {form.response?.message ? (
            <>
              <div
                className={
                  form.response.success ? "text-success" : "text-danger"
                }
              >
                {form.response.message}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <hr className="mt-2" />
        <Button disabled={form.isSubmitting} variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </>
  );
};

const sendRequest = async (action, data) => {
  this.setRequestState({});

  const req = new Request();

  if (data instanceof HTMLFormElement) {
    data = new FormData(data);
    data.set("target", "extra");
  } else {
    data.target = "extra";
  }

  const response = await req.sendConnector(action, data);

  this.setRequestState(response);

  return response;
};

const getPackagePathsList = async () => {
  const response = await axios({
    url: this.url,
    data: {
      action: "package/getPaths",
    },
  });

  return response.list;
};

const setRequestState = (response) => {
  this.setState({ request: { response } });
};

const setPackageState = (packageData) => {
  this.setState({ package: packageData });
};

const getPackageObjects = async () => {
  this.setPackageState({});

  const response = await this.sendRequest("package/getObjects", {
    schema_parse: this.checkboxSchemaParse.current?.value,
    pkg_path: this.inputPkgPath.current?.value,
  });

  this.setPackageState(response.object);
};

const changeParseSchema = (event) => {
  event.target.value = event.target.checked ? 1 : 0;
};

const submitForm = async (e) => {
  e.preventDefault();

  const response = await this.sendRequest("package/createObjects", e.target);
};

const ButtonSubmit = (props) => {
  return (
    <button className="btn btn-primary" type="submit" {...props}>
      Create
    </button>
  );
};

const FormAlert = (props) => {
  if (props.message) {
    if (props.success) {
      return (
        <>
          <div className={"alert alert-success"}>
            <i className="icon-check"></i> {props.message}
          </div>
        </>
      );
    }

    return (
      <>
        <div className={"alert alert-danger"}>
          <i className="icon-alert-triangle"></i> {props.message}
        </div>
      </>
    );
  }

  return <></>;
};

export default App;
