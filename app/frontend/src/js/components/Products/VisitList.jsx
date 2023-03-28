import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import { useRequest } from "../Request";
import FetchList from "../Fetch/List";

const { Context, React } = global;
const { useContext, useState, useEffect } = React;

const VisitProductsList = (props) => {
  const request = useRequest({
    params: {
      action: "products/visits/getList",
    },
  });

  return (
    <>
      <FetchList
        request={request}
        // LoadingComponent={}
        // ErrorComponent={}
        // IfEmptyComponent={}

        OuterComponent={({ children }) => (
          <Row className="mb-2">{children}</Row>
        )}
        ItemComponent={(item) => <ProductItem {...item} key={item.id} />}
      />
    </>
  );
};

const ProductItem = (props) => {
  const { pagetitle, id, url, image } = props;

  return (
    <>
      <Col md={2}>
        <div className="shadow-sm rounded p-2">
          <Image src={image} alt={pagetitle} rounded />
          <div className="">{pagetitle}</div>
        </div>
      </Col>
    </>
  );
};

export default VisitProductsList;
