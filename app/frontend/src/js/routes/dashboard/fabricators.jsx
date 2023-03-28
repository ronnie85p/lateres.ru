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
  return (
    <>
      <div className="mb-2x">
        <Button as={Link} to={"/dashboard/fabricator/create"}>
          <Icon name="plus" /> Добавить
        </Button>
      </div>

      <Page.Title>Производители</Page.Title>

      <Row>
        <Col md={10}>
          <FetchList
            list={async () => await getFabricators()}
            // list={[{ id: 1, pagetitle: "test" }]}
            Item={(item) => (
              <Card className="mb-2 shadow-sm border-0">
                <Card.Body>
                  <div className="media">
                    <Image
                      src={item.logo}
                      rounded
                      width={70}
                      className="mr-4"
                      defaultSrc="/assets/imgs/lateres_no.jpg"
                    />
                    <div className="media-body">
                      <div className="fw-bolder">
                        <Link to={`/dashboard/fabricator?id=${item.id}`}>
                          {item.pagetitle}
                        </Link>
                      </div>
                      <div className="text-muted">
                        <div>{item.longtitle}</div>
                        <div className="text-truncate">{item.content}</div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}
            Empty={() => <>Empty list</>}
            Fallback={() => <Loading />}
          />
        </Col>
      </Row>
    </>
  );
};

const Loading = () => {
  return <>Loading...</>;
};

const getFabricators = async () => {
  const { results } = await sendRequest("mgr/fabricator/getList");

  return results;
};

export default Index;
