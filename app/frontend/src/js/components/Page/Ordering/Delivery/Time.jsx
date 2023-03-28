import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

import Context from "@js/contexts/context";
import { useLocation } from "@js/components/Request";
import Form from "@js/components/Form";

export default (props) => {
  const { label, defaultTimeOption = "чч:мм", times } = props;
  const { form } = React.useContext(Context);
  const { updateParams } = useLocation();

  const handleChange = (event) => {
    let _this = event.currentTarget;

    form.handleChange(event);
    updateParams({ [_this.name]: _this.value });
  };

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
              onChange={handleChange}
            />

            <Form.Select
              name="delivery_time"
              isInvalid={"delivery_time" in form.errors}
              defaultValue={form.values.delivery_time}
              onChange={handleChange}
            >
              <option value="0">{defaultTimeOption}</option>

              {times?.map((time) => (
                <option key={time} value={time}>
                  {time}
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
