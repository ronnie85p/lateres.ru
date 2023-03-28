import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Page from "@js/components/Page";
// import { Outlet, Link } from "react-router-dom";

const Aside = ({ children }) => {
  return (
    <>
      <Row className="mb-3x">{children}</Row>
    </>
  );
};

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes, Route, Outlet, Link } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "",
//   },
// ]);

const Menu = (props) => {
  const { items } = props;

  return (
    <>
      <Col className="aside-menu">
        <ul className="list-unstyled">
          {items.map((item) => (
            <li key={item.id}>
              <Link to={item.url}>{item.pagetitle}</Link>
            </li>
          ))}
        </ul>
      </Col>

      <Outlet />
    </>
  );
};

const About = (props) => {
  return <>{props.pagetitle}</>;
};

const Content = (props) => {
  const { children, title, titleProps, contentProps, items } = props;

  return (
    <>
      <Col className="aside-content" md={9}>
        <Page.Title {...titleProps}>{title}</Page.Title>
        <Page.Content {...contentProps}>
          <Routes>
            <Route path="/" element={<Menu {...props} />}>
              {items?.map((item) => (
                <Route
                  key={item.id}
                  path={item.url}
                  element={
                    <React.Suspense fallback={<>...</>}>
                      <About {...item} />
                    </React.Suspense>
                  }
                  errorElement={() => <div>error</div>}
                />
              ))}
              {/* <Route path="*" element={<NoMatch />} /> */}
            </Route>
          </Routes>
        </Page.Content>
      </Col>
    </>
  );
};

Aside.Menu = Menu;
Aside.Content = Content;

export default Aside;
