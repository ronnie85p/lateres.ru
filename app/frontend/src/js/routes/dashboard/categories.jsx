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
  return (
    <>
      <div className="mb-2x">
        <Button as={Link} to={"/dashboard/category/create"}>
          <Icon name="plus" /> Добавить
        </Button>
      </div>

      <Page.Title>Категории</Page.Title>

      <Row>
        <Col md={10}>
          <FetchList
            list={async () => await getCategories()}
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
                    </Media.Body>
                  </Media>
                </Card.Body>
              </Card>
            )}
            Empty={() => <>Empty list</>}
            Fallback={() => <>Loading...</>}
          />
        </Col>
      </Row>
    </>
  );
};

const getCategories = async () => {
  const { results } = await sendRequest("mgr/category/getList");
  return results;
};

export default Index;
