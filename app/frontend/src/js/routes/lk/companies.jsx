import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import { useLoaderData, Link, useLocation } from "react-router-dom";

import Profile from "@js/components/Page/Profile";
import FetchList from "@js/components/FetchList";
import Button from "@js/components/Form/Button";
import Icon from "@js/components/Icon";
import { sendRequest } from "@js/components/Request";

const Companies = (props) => {
  const handleActionAdd = (e) => {
    console.log("[new company] opening form...");
  };

  return (
    <>
      <Profile.Title>Мои компании</Profile.Title>

      <Profile.PanelActions>
        <Profile.PanelAction>
          <Button as={Link} variant={"secondary"} to={"/lk/companies/item"}>
            <Icon name="plus" /> Добавить
          </Button>
        </Profile.PanelAction>
      </Profile.PanelActions>

      <CompanyList />
    </>
  );
};

const getCompanies = () => {
  return sendRequest("web/profile/company/getList", null, { return: "data" });
};

const CompanyList = (props) => {
  return (
    <>
      <Row>
        <FetchList
          loader={getCompanies}
          ItemComponent={(item) => (
            <Col key={item.id} md={4} className="mb-2">
              <CompanyItem {...item} />
            </Col>
          )}
          FallbackComponent={() => <Loading />}
          EmptyComponent={() => <NotFound />}
        />
      </Row>
    </>
  );
};

const CompanyItem = (props) => {
  const { id, name, text, address_text, rank, comment } = props;

  const handleDelete = (e) => {
    e.preventDefault();

    console.log("[company] deleting...");
  };

  const handleSetRank = (e) => {
    e.preventDefault();

    console.log("[company] set ranking...");
  };

  return (
    <>
      <Card style={{ border: "1px solid rgb(237, 237, 237)" }}>
        <Card.Body>
          <Card.Title className="fs-5">{name}</Card.Title>

          <Card.Text className="text-muted">{text}</Card.Text>
          <Card.Text className="text-muted">{address_text}</Card.Text>

          <Card.Text
            className="fst-italic text-muted text-truncate"
            style={{ height: 25 }}
          >
            {comment}
          </Card.Text>

          <Link to={`/lk/companies/item?id=${id}`}>Edit</Link>
        </Card.Body>
        <Card.Footer
          className="bg-white d-flex justify-content-between"
          style={{ borderTop: "1px solid rgb(237, 237, 237)!important" }}
        >
          {!rank ? (
            <>
              <span className="text-warning">По умолчанию</span>
            </>
          ) : (
            <>
              <a href="#" onClick={handleSetRank}>
                По умолчанию
              </a>
            </>
          )}

          <a href="#" onClick={handleDelete}>
            Удалить
          </a>
        </Card.Footer>
      </Card>
    </>
  );
};

const NotFound = (props) => {
  return <>Нет адресов</>;
};

const Loading = (props) => {
  const items = [];

  for (let i = 0; i < 1; i++) {
    items.push(
      <Col key={i} md={4} className="mb-2">
        <CompanyPlaceholder />
      </Col>
    );
  }

  return <>{items}</>;
};

const CompanyPlaceholder = () => {
  return (
    <>
      <Card style={{ border: "1px solid rgb(237, 237, 237)" }}>
        <Card.Body>
          <Card.Title className="fs-5">
            <Placeholder animation="glow">
              <Placeholder xs={7} />
            </Placeholder>
          </Card.Title>

          <Card.Text className="">
            <Placeholder animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </Card.Text>

          <Card.Text style={{ height: 25 }}>
            <Placeholder animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </Card.Text>

          <Card.Text style={{ height: 25 }}>
            <Placeholder animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </Card.Text>
        </Card.Body>

        <Card.Footer
          className="bg-white"
          style={{ borderTop: "1px solid rgb(237, 237, 237)!important" }}
        >
          <Placeholder animation="glow">
            <Placeholder xs={4} />
            <Placeholder xs={4} className="float-end" />
          </Placeholder>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Companies;
