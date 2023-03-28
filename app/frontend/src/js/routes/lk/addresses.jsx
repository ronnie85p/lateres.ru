import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLoaderData, Link } from "react-router-dom";

import Context from "@js/contexts/context";
import Button from "@js/components/Form/Button";
import Icon from "@js/components/Icon";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";
import { useRequest, QueryData } from "@js/components/Request";
import Preloader, { PreloaderSm } from "@js/components/Preloader";

export default (props) => {
  const context = React.useContext(Context);
  const [resource] = useLoaderData();

  return (
    <Context.Provider value={{ ...context, resource }}>
      <Title>
        <Title.Text>{resource.pagetitle}</Title.Text>
      </Title>

      <Content />
    </Context.Provider>
  );
};

const Content = (props) => {
  const context = React.useContext(Context);

  return (
    <>
      <Row className="mb-4">
        <Col>
          <Button as={Link} to="/lk/address/new">
            Добавить
          </Button>
        </Col>
      </Row>

      <AddressList />
    </>
  );
};

const AddressList = (props) => {
  const request = useRequest({
    action: "web/profile/address/getList",
  });
  const queryDataProps = {
    request,
    Loading: <PreloaderSm position="absolute" show />,
    ErrorFallback: () => <></>,
  };

  const Output = () => {
    const context = React.useContext(Context);
    const [list, setList] = React.useState(request.response.results);

    return (
      <Context.Provider value={{ ...context, list, setList }}>
        <Row>
          {list.map((item) => (
            <Col md={6} key={item.id}>
              <AddressItem {...item} />
            </Col>
          ))}
        </Row>
      </Context.Provider>
    );
  };

  return (
    <div className="position-relative">
      <QueryData {...queryDataProps}>
        <Output />
      </QueryData>
    </div>
  );
};

const AddressItem = (props) => {
  const { data, list, setList } = React.useContext(Context);
  const { id, title, text, comment, is_default } = props;

  const setDefaultRequest = useRequest({
    action: "web/profile/address/setDefault",
    data: { id },
  });

  const deleteRequest = useRequest({
    action: "web/profile/address/remove",
    data: { id },
  });

  const handleSetDefault = (event) => {
    event.preventDefault();

    setDefaultRequest.send();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (!confirm("Удалить адрес?")) return;

    let idx = list.findIndex((item) => item.id === id);
    if (idx !== -1) {
      list.splice(idx, 1);
      setList([...list]);
    }

    deleteRequest.send();
  };

  return (
    <Layer>
      <Preloader
        show={
          deleteRequest.state === "pending" ||
          setDefaultRequest.state === "pending"
        }
      />

      <div className="mb-1 text-truncate" title={text}>
        <Icon name="geo-alt" className="mr-2" /> {text}
      </div>
      <div className="text-muted text-truncate" title={comment}>
        {comment}
      </div>

      <hr />

      <Row>
        <Col className="text-end d-flex align-items-center justify-content-end">
          {is_default ? (
            <span className="text-success mr-2" title="По умолчанию">
              <Icon name="check2-circle" size="1.4em" />
            </span>
          ) : (
            <a
              className="text-dark mr-2"
              href="#"
              onClick={handleSetDefault}
              title="По умолчанию"
            >
              <Icon name="check2-circle" size="1.4em" />
            </a>
          )}

          <Link
            to={`/lk/address/edit?id=${id}`}
            className="mr-2"
            title="Редактировать"
          >
            <Icon name="pencil-square" size="1.2em" />
          </Link>
          <a
            className="text-danger"
            href="#"
            onClick={handleDelete}
            title="Удалить"
          >
            <Icon name="trash" size="1.2em" />
          </a>
        </Col>
      </Row>
    </Layer>
  );
};
