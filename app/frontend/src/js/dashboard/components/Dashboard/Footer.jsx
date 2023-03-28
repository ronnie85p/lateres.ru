import React from "react";
import Container from "./Container";

const Footer = (props) => {
  const { children } = props;

  return (
    <>
      <div
        className="dashboard-footer"
        style={{ height: "50px", backgroundColor: "#373636" }}
      >
        <Container {...props}></Container>
      </div>
    </>
  );
};

export default Footer;
