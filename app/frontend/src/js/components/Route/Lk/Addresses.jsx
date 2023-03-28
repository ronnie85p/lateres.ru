import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import RawHTML from "@js/components/RawHTML";
import Loading from "@js/components/Loading";
import { useRequest, Suspense } from "@js/components/Http/Request";
import FetchList from "@js/components/Fetch/List";
import Aside from "./Aside";

import Context from "@js/contexts/context";

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
              <AddressList />
            </Aside.Content>
          </Aside>
        )}
      </Suspense>
    </>
  );
};

const AddressList = (props) => {
  const request = useRequest({
    params: {
      action: "web/profile/address/getList",
    },
  });

  const ItemComponent = ({ country, region, city }) => (
    <>
      <Card>
        <Card.Body>
          {country}, {region}, {city}
        </Card.Body>
      </Card>
    </>
  );

  //   const LoadingComponent = (props) => <div>Loading...</div>;
  const EmptyComponent = (props) => <div>Empty list</div>;
  const ErrorComponent = ({ error }) => <div>{error.message}</div>;

  return (
    <>
      <FetchList
        request={request}
        LoadingComponent={Loading}
        ErrorComponent={ErrorComponent}
        EmptyComponent={EmptyComponent}
        ItemComponent={ItemComponent}
      />
    </>
  );
};
