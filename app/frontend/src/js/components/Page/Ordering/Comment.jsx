import React from "react";
import { Form } from "@js/components/Form";
import { Title, Layer } from "./Components";

export default (props) => {
  return (
    <>
      <Title>Комментарий</Title>
      <Layer>
        <Form.TextArea
          name="comment"
          placeholder="Leave a comment here"
          style={{ height: 100 }}
        />
      </Layer>
    </>
  );
};
