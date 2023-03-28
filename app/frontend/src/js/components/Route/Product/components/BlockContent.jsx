import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";

import RawHTML from "@js/components/RawHTML";
import Context from "../context";

const BlockContent = (props) => {
  const { id, title, option } = props;

  const { data } = useContext(Context);
  const content = data.object[id];

  return (option === true && content) || !option ? (
    <>
      <Card className="mb-2">
        <Card.Body>
          <h2 className="h4 fw-bolder" id={id}>
            {title}
          </h2>

          <RawHTML>{content}</RawHTML>
        </Card.Body>
      </Card>
    </>
  ) : (
    <></>
  );
};

export default BlockContent;
