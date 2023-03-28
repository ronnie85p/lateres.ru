import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Placeholder from "react-bootstrap/Placeholder";
import { useLoaderData, Link, useLocation } from "react-router-dom";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import Image from "@js/components/Image";
import Button from "@js/components/Form/Button";
import { Form, useForm } from "@js/components/Form";
import { sendRequest, useRequest } from "@js/components/Request";
import { Page } from "@dashboard/components/Dashboard";
import FetchList from "@js/components/FetchList";

const Index = (props) => {
  const context = useContext(Context);
  const data = useLoaderData();

  return (
    <Context.Provider value={{ data }}>
      <div className="mb-2x">
        <Button
          variant={"outline-secondary"}
          className="border"
          as={Link}
          to={"/dashboard/fabricators"}
        >
          <Icon name="arrow-left-short" /> Назад
        </Button>
      </div>

      <Page.Title>
        Производитель <span className="text-muted">{data.pagetitle}</span>
      </Page.Title>

      <Row>
        <Col md={8}>
          <div className="media mb-2x">
            <Image
              className="mr-4"
              src={data.logo}
              width={150}
              defaultSrc="/assets/imgs/lateres_no.jpg"
              rounded
            />
            <div className="media-body">
              <p>{data.longtitle}</p>
              <p>{data.description}</p>
              <p>{data.content}</p>
              <p>
                <Link to={`/dashboard/fabricator/edit?id=${data.id}`}>
                  Редактировать
                </Link>
              </p>
            </div>
          </div>

          <h5>Торговые марки</h5>
          <Button
            as={Link}
            className="mb-2"
            variant={"outline-secondary"}
            to="/dashboard/trademark/create"
          >
            <Icon name="plus" />
            Добавить
          </Button>
          <FetchList
            list={async () => getTrademarks(data.id)}
            Item={(item) => (
              <Card className="mb-2">
                <Card.Body>
                  <div className="fw-bolder">{item.pagetitle}</div>
                  <div className="text-muted">
                    <div>{item.longtitle}</div>
                    <div>{item.description}</div>
                    <div className="text-truncate">{item.content}</div>
                  </div>
                  <div className="text-end">
                    <Link to={`/dashboard/trademark/edit?id=${item.id}`}>
                      Редактировать
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            )}
            Empty={() => <>Empty list</>}
          />
        </Col>
      </Row>
    </Context.Provider>
  );
};

const getTrademarks = async (fabricator) => {
  const { results } = await sendRequest("mgr/trademark/getList", {
    fabricator,
  });
  return results;
};

export default Index;
