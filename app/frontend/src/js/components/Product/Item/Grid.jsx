import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import Image from "@js/components/Image";
import { ActionInCart, ActionButtonFavorite } from "../ActionButtons";

export default (props) => {
  const {
    parentProps,
    image,
    uri,
    id,
    discount,
    price_format,
    pagetitle,
    measure_unit,
    inFavorite,
    inCart,
  } = props;

  return (
    <Col md="3" {...parentProps} data-product={id}>
      <div className="rounded bg-white p-2 position-relative">
        <div
          className="text-end"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            padding: 20,
            color: "#dddddd",
          }}
        >
          {discount > 0 ? (
            <Badge className="float-start" bg="danger">
              -{discount}%
            </Badge>
          ) : (
            <></>
          )}

          <ActionButtonFavorite active={inFavorite === true} product_id={id} />
        </div>

        <Link className="text-dark text-decoration-none" to={`/${uri}`}>
          <Image className="mb-2" src={image} rounded />
          <div className="fs-6 mb-3">{pagetitle}</div>
          <div className="fs-5 text-end" style={{ fontWeight: 500 }}>
            {price_format} / {measure_unit}
          </div>
        </Link>
        <hr />

        <ActionInCart inCart={inCart?.count > 0} product_id={id} />
      </div>
    </Col>
  );
};
