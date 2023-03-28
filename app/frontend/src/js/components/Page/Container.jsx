import React from "react";

const Container = (props) => {
  const { className, children } = props;

  return (
    <div
      {...props}
      className={"container" + (className ? ` ${className}` : "")}
    >
      {children}
    </div>
  );
};

export default Container;
