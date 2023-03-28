import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Form from "@js/components/Form";

export default (props) => {
  const { data, form } = React.useContext(Context);
  const { values, errors, handleChange, handleBlur } = form;

  return (
    <>
      <input type="hidden" name="is_default" value="1" />

      <Row>
        <Form.Group as={Col} md="8">
          <Form.Label htmlFor="region">
            Регион
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="region"
            // autoComplete="off"
            defaultValue={values.region}
            isInvalid={!!errors.region}
            onChange={handleChange}
          />
          <Form.FieldError>{errors.region}</Form.FieldError>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md="8">
          <Form.Label htmlFor="district">
            Район
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="district"
            // autoComplete="off"
            defaultValue={values.district}
            isInvalid={!!errors.district}
            onChange={handleChange}
          />
          <Form.FieldError>{errors.district}</Form.FieldError>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md="8">
          <Form.Label htmlFor="city">
            Населенный пункт
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="city"
            // autoComplete="off"
            defaultValue={values.city}
            isInvalid={!!errors.city}
            onChange={handleChange}
          />
          <Form.FieldError>{errors.city}</Form.FieldError>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md="6">
          <Form.Label htmlFor="street">
            Улица
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="street"
            // autoComplete="off"
            defaultValue={values.street}
            isInvalid={!!errors.street}
            onChange={handleChange}
          />
          <Form.FieldError>{errors.street}</Form.FieldError>
        </Form.Group>
        <Form.Group as={Col} md="2">
          <Form.Label htmlFor="building">
            Строение
            <Form.Asterix />
          </Form.Label>
          <Form.Input
            name="building"
            // autoComplete="off"
            defaultValue={values.building}
            isInvalid={!!errors.building}
            onChange={handleChange}
          />
          <Form.FieldError>{errors.building}</Form.FieldError>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md="8">
          <Form.Label htmlFor="comment">Детали</Form.Label>
          <Form.TextArea
            name="comment"
            placeholder="Дополнительные подробности"
            height={100}
            defaultValue={values.comment}
            isInvalid={!!errors.comment}
            onChange={handleChange}
          />
          <Form.FieldError>{errors.comment}</Form.FieldError>
        </Form.Group>
      </Row>

      <Form.Check
        className="mt-1"
        id="is-default"
        name="is_default"
        value="1"
        label="По умолчанию"
        disabled={data.id && values.is_default}
        defaultChecked={values.is_default}
      />
    </>
  );
};
