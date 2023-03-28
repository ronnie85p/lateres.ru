import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Form from "@js/components/Form";

export default (props) => {
  const { order, form, params, handleFieldChange } = React.useContext(Context);
  const { delivery_cars } = order;
  const car = delivery_cars.find((item) => item.id == params.delivery_car);

  return (
    <>
      <Row>
        <Col md={5}>
          <Form.Select
            name="delivery_car"
            isInvalid={!!form.errors.delivery_car}
            defaultValue={car?.id}
            onChange={handleFieldChange}
          >
            <option value="0">--Не выбран</option>
            {delivery_cars.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
          <Form.FieldError>{form.errors.delivery_car}</Form.FieldError>
        </Col>
      </Row>

      {car ? <Car {...car} /> : <></>}
    </>
  );
};

const Car = (props) => {
  const { description } = props;

  return <div className="mt-2">{description}</div>;
};
