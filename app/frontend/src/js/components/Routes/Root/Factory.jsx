import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Outlet } from "react-router-dom";
import Context from "@js/contexts/context";
import { QueryData, useRequest } from "@js/components/Request";
import Preloader from "@js/components/Preloader";
import Menu from "@js/components/Page/Menu";

const FactoryRoot = (props) => {
  const context = useContext(Context);
  const request = useRequest({
    action: "routes/factory",
  });

  const menu = request.response?.menu || [];
  const parent = request.response?.parent || {};

  return (
    <QueryData
      request={request}
      Loading={<Preloader show />}
      Error={({ error }) => <>{error.message}</>}
    >
      <Context.Provider value={{ ...context, parent }}>
        <Row>
          <Col md={3}>
            <div className="sticky-top offset-top-1">
              <h5>{parent.pagetitle}</h5>
              <hr />

              <Menu menu={menu} />
            </div>
          </Col>
          <Col md={9}>
            <Outlet />
          </Col>
        </Row>
      </Context.Provider>
    </QueryData>
  );
};

export default FactoryRoot;
