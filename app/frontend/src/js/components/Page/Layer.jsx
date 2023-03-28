import React from "react";

export default (props) => {
  const { children } = props;
  return (
    <div
      {...props}
      className={
        "rounded bg-white p-3 py-4 mb-2" +
        (props.className ? ` ${props.className}` : "")
      }
    >
      {children}
    </div>
  );
};
