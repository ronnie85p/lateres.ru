import React, { Suspense, lazy } from "react";

const LazyElement = (props) => {
  const { from } = props;
  const Element = from ? lazy(from) : <></>;

  return (
    <Suspense {...props}>
      <Element {...props} />
    </Suspense>
  );
};

export default LazyElement;
