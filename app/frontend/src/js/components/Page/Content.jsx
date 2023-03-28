import React from "react";
import Container from "./Container";

const Content = (props) => {
  const { children } = props;

  return (
    <div className="site-content bg-white p-4" {...props}>
      {children}
    </div>
  );
};

export default Content;
