import React, {
  useEffect,
  useContext,
  useState,
  useMemo,
  useReduce,
} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import Context from "@js/contexts/context";
import { useForm } from "@js/components/Form";
import FormInput from "@js/components/Form/Input";
import Button from "@js/components/Form/Button";
import FetchList from "@js/components/Fetch/List";
import { useRequest, Suspense } from "@js/components/Http/Request";
import Icon from "@js/components/Icon";
import Aside from "../Aside";
import LoadContent from "../LoadContent";

const PhoneFormAdd = (props) => {
  const { onBeforeSave, onAfterSave } = props;
  const form = useForm({
    request: useRequest({
      params: {
        action: "web/profile/phone/create",
      },
    }),
    onSubmit() {
      if (onBeforeSave) {
        return onBeforeSave();
      }
    },
    onSuccess(response) {
      if (onAfterSave) {
        onAfterSave(response);
      }
    },
  });

  return (
    <>
      <Form onSubmit={form.handleSubmit}>
        <InputGroup className="mb-1">
          <FormInput
            name="phone"
            maskAlias={"phone"}
            autoComplete="off"
            autoFocus
          />
          <Button type="submit" loading={form.isSubmitting} loadingText={""}>
            Сохранить
          </Button>
        </InputGroup>
        <Form.Check
          defaultChecked
          name="bydef"
          id="bydef"
          label="По умолчанию"
        />
      </Form>
    </>
  );
};

const PhoneItem = (props) => {
  const { id, text, as_default, onBeforeRemove, onAfterRemove } = props;

  const form = useForm({
    request: useRequest({
      params: {
        action: "web/profile/phone/remove",
      },
    }),
    onSubmit() {
      if (onBeforeRemove) {
        return onBeforeRemove();
      }
    },
    onSuccess(response) {
      if (onAfterRemove) {
        onAfterRemove(response);
      }
    },
  });

  return (
    <>
      <div className="mb-2">
        <Form onSubmit={form.handleSubmit}>
          <input type="hidden" name="id" value={id} />

          <InputGroup>
            <Form.Control defaultValue={text} disabled />
            <Button
              type="submit"
              variant="secondary"
              loading={form.isSubmitting}
              loadingText={""}
            >
              Удалить
            </Button>
          </InputGroup>
          {as_default ? (
            <>
              <Form.Text>По умолчанию</Form.Text>
            </>
          ) : (
            <></>
          )}
        </Form>
      </div>
    </>
  );
};

const PhoneGetList = (props) => {
  const request = useRequest({
    params: {
      action: "web/profile/phone/getList",
    },
  });

  return (
    <FetchList
      request={request}
      ItemComponent={(item) => <PhoneItem key={item.id} {...item} />}
    />
  );
};

const PhonesList = (props) => {
  const [showNewField, setShowNewField] = useState(false);

  const handleNewItemAdd = (event) => {
    event.preventDefault();
    setShowNewField(true);
  };

  const handleAfterSave = () => {
    // setShowNewField(false);
  };

  return (
    <>
      <PhoneGetList />

      <div className="mt-2" style={{ height: 70 }}>
        {showNewField ? (
          <PhoneFormAdd onAfterSave={handleAfterSave} />
        ) : (
          <>
            <div className="text-primary">
              <Icon name="plus" size="1.5em" />
              <a href="#" onClick={handleNewItemAdd}>
                Добавить
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const FormEdit = (props) => {
  const { object } = props;

  return (
    <>
      <div className="h5">Телефоны</div>
      <Row>
        <Col md={4}>
          <PhonesList {...object} />
        </Col>
      </Row>

      <div className="h5 mt-1x">Email</div>
      <Row>
        <Col md={6}>
          <InputGroup>
            <Form.Control
              type="email"
              name="email"
              defaultValue={object.email}
              placeholder=""
            />
            <Button>Отправить код</Button>
          </InputGroup>
        </Col>
      </Row>
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
                  <LoadContent params={{ action: "web/profile/contacts/get" }}>
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
