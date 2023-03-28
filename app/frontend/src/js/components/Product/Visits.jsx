import React from "react";
import ProductList from "./List";

const Visits = (props) => {
  const { title = "Вы смотрели" } = props;

  return (
    <ProductList
      title={title}
      action="web/resource/visit/getList"
      params={null}
    />
  );
};

export default Visits;
