import React, { useContext } from "react";

import Context from "../context";

const Title = (props) => {
  const { data } = useContext(Context);

  return (
    <>
      <h1 className="h3 mb-2" style={{ fontWeight: 500 }}>
        {data.object.pagetitle}
      </h1>
    </>
  );
};

export default Title;
