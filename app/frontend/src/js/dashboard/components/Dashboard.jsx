import React from "react";
import Container from "./Dashboard/Container";
import Header from "./Dashboard/Header";
import Footer from "./Dashboard/Footer";
import Aside from "./Dashboard/Aside";

const Page = (props) => {
  const { children, className } = props;

  return (
    <>
      <div
        {...props}
        className={"dashboard " + (className || "")}
        style={{ height: "100vh" }}
      >
        {children}
      </div>
    </>
  );
};

const Title = (props) => {
  const { children, subtext } = props;

  return (
    <>
      <h1 className="h4 m-0" style={{ fontWeight: 500 }}>
        {children}
      </h1>
      {subtext ? (
        <>
          <div className="text-muted">{subtext}</div>
        </>
      ) : (
        <></>
      )}
      <hr className="mt-2 mb-1x" />
    </>
  );
};

Page.Header = Header;
Page.Footer = Footer;
Page.Title = Title;

export { Page, Aside, Container };
