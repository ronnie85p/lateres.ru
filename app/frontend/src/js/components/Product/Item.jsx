import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Link } from "@js/components/Router";
import RatingStars from "@js/components/Rating/Stars";

import ItemGrid from "./Item/Grid";
import ItemRow from "./Item/Row";

export default (props) => {
  const { view = "grid" } = props;

  switch (view) {
    case "grid":
      return <ItemGrid {...props} />;
    case "row":
      return <ItemRow {...props} />;
  }

  return <></>;
};

const Container = (props) => {
  const { children } = props;

  return <Row {...props}>{children}</Row>;
};

export { Container };
