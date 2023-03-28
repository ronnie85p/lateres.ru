import React from "react";
import Row from "react-bootstrap/Row";
import FetchList from "@js/components/FetchList";
import getResults from "@js/loaders/getResults";
import ProductItem from "./Item";
import Preloader from "@js/components/Preloader";

const List = (props) => {
  const { title, action = "web/product/getList", params = {} } = props;

  return (
    <>
      <h3 className="h4 mt-3">{title}</h3>
      <Row>
        <FetchList
          loader={() => getProducts(action, params)}
          ItemComponent={(item) => <ProductItem key={item.id} data={item} />}
          EmptyComponent={() => "empty"}
          FallbackComponent={() => <Preloader show={true} />}
        />
      </Row>
    </>
  );
};

const getProducts = (action, data) => {
  return getResults(action, data);
};

export default List;
