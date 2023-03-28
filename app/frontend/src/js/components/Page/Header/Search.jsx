import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";

import { Form, useForm } from "@js/components/Form";

const Search = (props) => {
  const action = "";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      return false;
    },
  });

  return (
    <div className="site-search" style={{ width: "100%" }}>
      <Form className="m-0" onSubmit={form.handleSubmit}>
        <InputGroup>
          <Form.Input
            name="query"
            placeholder="Искать на сайте"
            style={{ zIndex: 12345 }}
          />
        </InputGroup>
      </Form>
    </div>
  );
};

export default Search;
