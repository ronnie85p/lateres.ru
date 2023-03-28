import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Placeholder from "react-bootstrap/Placeholder";
import { useLoaderData, Link, useLocation } from "react-router-dom";

import Context from "@js/contexts/context";
import Button from "@js/components/Form/Button";
import { Form, useForm } from "@js/components/Form";
import { sendRequest, useRequest } from "@js/components/Request";
import { Page } from "@dashboard/components/Dashboard";
import FetchList from "@js/components/FetchList";

const Index = (props) => {
  return (
    <>
      <Page.Title>Товар</Page.Title>

      <Row>
        <Col md={10}></Col>
      </Row>
    </>
  );
};

export default Index;
