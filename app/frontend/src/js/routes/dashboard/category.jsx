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
import Media from "@js/components/Media";
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
          to={"/dashboard/categories"}
        >
          <Icon name="arrow-left-short" /> Назад
        </Button>
      </div>

      <Page.Title>
        Категория <span className="text-muted">{data.pagetitle}</span>
      </Page.Title>

      <Row>
        <Col md={8}>
          <Media className="mb-2x">
            <Media.Image
              className="mr-4"
              src={data.logo}
              width={150}
              defaultSrc="/assets/imgs/lateres_no.jpg"
              rounded
            />
            <Media.Body>
              <Media.Heading>{data.longtitle}</Media.Heading>
              <p>{data.description}</p>
              <p>{data.content}</p>
              <p>
                <Link to={`/dashboard/category/edit?id=${data.id}`}>
                  Редактировать
                </Link>
              </p>
            </Media.Body>
          </Media>

          <h5>Подкатегории</h5>
          <FetchList
            list={async () => getCategories(data.id)}
            Item={(item) => (
              <Card className="mb-2 shadow-sm border-0">
                <Card.Body>
                  <Media>
                    <Media.Image
                      src={item.image}
                      width={70}
                      defaultSrc="/assets/imgs/lateres_no.jpg"
                    />
                    <Media.Body>
                      <Media.Heading className="fs-6 fw-bolder">
                        <Link to={`/dashboard/category?id=${item.id}`}>
                          {item.pagetitle}
                        </Link>
                      </Media.Heading>
                      <Row className="text-muted">
                        <Col className="text-truncate" md={10}>
                          {item.longtitle}
                        </Col>
                        {/* <div className="text-truncate">{item.content}</div> */}
                      </Row>
                      <Link to={`/dashboard/category/edit?id=${item.id}`}>
                        Редактировать
                      </Link>
                    </Media.Body>
                  </Media>
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

const getCategories = async (parent) => {
  const { results } = await sendRequest("mgr/category/getList", {
    parent,
  });
  return results;
};

export default Index;
