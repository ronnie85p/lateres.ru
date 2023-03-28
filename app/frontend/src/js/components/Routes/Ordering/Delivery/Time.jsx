import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

import Context from "@js/contexts/context";
import { useLocation } from "@js/components/Request";
import Form from "@js/components/Form";

const defaultProps = {
  options: [],
  label: "",
  defaultOption: "чч:мм",
};

export default (props) => {
  const { label, defaultOption, options } = { ...defaultProps, ...props };
  const { form, handleFieldChange } = React.useContext(Context);

  return (
    <Row className="mt-2x">
      <Col md={5}>
        <Form.Group className="form-group mb-0">
          <Form.Label htmlFor="delivery_datetime">{label}</Form.Label>
          <InputGroup>
            <Form.Control
              name="delivery_date"
              type="date"
              min=""
              style={{ width: "40%" }}
              isInvalid={"delivery_date" in form.errors}
              defaultValue={form.values.delivery_date}
              onChange={handleFieldChange}
            />

            <Form.Select
              name="delivery_time"
              isInvalid={"delivery_time" in form.errors}
              defaultValue={form.values.delivery_time}
              onChange={handleFieldChange}
            >
              <option value="0">{defaultOption}</option>
              {options.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </InputGroup>

          <Form.FieldError>{form.errors.delivery_date}</Form.FieldError>
          <Form.FieldError>{form.errors.delivery_time}</Form.FieldError>
        </Form.Group>
      </Col>
    </Row>
  );
};
