import React, {
  useEffect,
  useContext,
  useState,
  createRef,
  Children,
} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { useRequest, Suspense, sendRequest } from "@js/components/Http/Request";
import { useForm } from "@js/components/Form";
import { useFile } from "@js/components/Files/File";
import Button from "@js/components/Form/Button";
import Aside from "../Aside";
import LoadContent from "../LoadContent";

const UploadFiles = (props) => {
  const { ButtonUpload, children } = props;
  const Component = children;

  const file = useFile({});

  const requestList = useRequest({
    params: {
      action: "web/profile/passport/file/getList",
    },
  });

  const uploadFile = (file, rank) => {
    const fd = new FormData();
    fd.append("file_0", file, file.name);
    sendRequest({
      params: {
        action: "web/profile/passport/file/upload",
        rank,
      },
      data: fd,
    })
      .then((response) => response.data)
      .then((response) => {
        console.log("uploaded", file);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const sendValidate = (files) => {
    const data = [];
    for (let file of files) {
      data.push({
        name: file.name,
        type: file.type,
        size: file.size,
      });
    }
    console.log("data", data);
    sendRequest({
      params: {
        action: "web/profile/passport/file/check",
      },
      data: { data },
    })
      .then((response) => response.data)
      .then(({ success, object }) => {
        if (success) {
          for (let idx in object.valids) {
            const valid = object.valids[idx];
            for (let file of files) {
              if (file.name === valid.name) {
                uploadFile(file, object.count + 1);
              }
            }
          }
        } else {
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const chooseFilesWithComputer = (event) => {
    file
      .openDialog()
      .then(({ target }) => {
        console.log("files", target.files);

        sendValidate(target.files);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  useEffect(() => {
    requestList.send();
  }, []);

  return (
    <>
      <div className="">
        <Row>
          {requestList.response?.results?.map((item) => (
            <Col key={item.id} md={4}>
              <Image src={item.url} rounded thumbnail />
            </Col>
          ))}
        </Row>

        <Button
          className="mt-2"
          variant="light"
          onClick={chooseFilesWithComputer}
        >
          <Icon name="file-earmark-arrow-up" /> Выбрать с компьютера
        </Button>
      </div>
    </>
  );
};

const FormEdit = (props) => {
  const { response } = props;
  const { object } = response || {};

  const form = useForm({
    request: useRequest({
      params: {
        action: "web/profile/passport/update",
      },
    }),
  });

  return (
    <>
      <Form onSubmit={form.handleSubmit}>
        <Row>
          <Form.Group className="form-group" as={Col} md={5}>
            <label htmlFor="fullname">Фамилия Имя Отчество</label>
            <Form.Control defaultValue={object?.fullname} disabled />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="form-group" as={Col} md={2}>
            <label htmlFor="seria">Серия</label>
            <Form.Control name="seria" defaultValue={object?.seria} />
          </Form.Group>

          <Form.Group className="form-group" as={Col} md={3}>
            <label htmlFor="num">Номер</label>
            <Form.Control name="num" defaultValue={object?.num} />
          </Form.Group>

          <Form.Group className="form-group" as={Col} md={8}>
            <label htmlFor="dep_issued">Кем выдан</label>
            <Form.Control name="dep_issued" defaultValue={object?.dep_issued} />
          </Form.Group>

          <Form.Group className="form-group" as={Col} md={4}>
            <label htmlFor="date_issued">Дата выдачи</label>
            <Form.Control
              type="datetime-local"
              name="date_issued"
              defaultValue={object?.date_issued}
            />
          </Form.Group>

          <Form.Group className="form-group" as={Col} md={5}>
            <label htmlFor="sitizenship">Гражданство</label>
            <Form.Select name="sitizenship">
              <option value="">{object?.sitizenship}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="form-group" as={Col} md={3}>
            <label htmlFor="gender">Пол</label>
            <Form.Control defaultValue={object?.gender} />
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group className="form-group" as={Col} md={8}>
            <label htmlFor="place_of_birth">Место рождения</label>
            <Form.Control
              name="place_of_birth"
              defaultValue={object?.place_of_birth}
            />
          </Form.Group>

          <Form.Group className="form-group" as={Col} md={4}>
            <label htmlFor="date_of_birth">Дата рождения</label>
            <Form.Control
              type="datetime-local"
              name="date_of_birth"
              defaultValue={object?.dob}
            />
          </Form.Group>
        </Row>

        <hr className="" />

        <Row className="mb-2x">
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

        <h4>Сканы</h4>
        <UploadFiles></UploadFiles>
      </Form>
    </>
  );
};

export default (props) => {
  const { resource, user } = useContext(Context);

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
                  <LoadContent
                    params={{ action: "web/profile/passport/get" }}
                  />
                  <FormEdit {...request} />
                </Card.Body>
              </Card>
            </Aside.Content>
          </Aside>
        )}
      </Suspense>
    </>
  );
};
