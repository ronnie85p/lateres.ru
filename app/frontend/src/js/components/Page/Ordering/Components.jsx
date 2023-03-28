import React from "react";

const Title = (props) => {
  const { children, className } = props;
  return (
    <div {...props} className={"h6" + (className ? ` ${className}` : "")}>
      {children}
    </div>
  );
};

const Layer = (props) => {
  const { children, className } = props;
  return (
    <div
      {...props}
      className={
        "bg-white p-3 mb-2 rounded" + (className ? ` ${className}` : "")
      }
    >
      {children}
    </div>
  );
};
export { Title, Layer };
