import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Media from "@js/components/Media";
import Form from "@js/components/Form";
import { useLocation } from "@js/components/Request";

export default (props) => {
  const { data, form } = React.useContext(Context);
  const { updateParams } = useLocation();

  const handleChange = (event) => {
    let _this = event.currentTarget;

    form.handleChange(event);
    updateParams({ [_this.name]: _this.value });
  };

  return (
    <>
      <Row>
        <Col md={5}>
          <Form.Select
            name="delivery_car"
            defaultValue={form.values.delivery_car}
            onChange={handleChange}
            isInvalid={!!form.errors.delivery_car}
          >
            <option value="0">--Не выбран</option>
            {data.delivery_cars.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
          <Form.FieldError>{form.errors.delivery_car}</Form.FieldError>
        </Col>
      </Row>

      {/* {deliveryCar ? <Car {...deliveryCar} /> : <></>} */}
    </>
  );
};

const Car = (props) => {
  const { image, description, length, weight } = props;

  return (
    <Media>
      <Media.Image src={image} width={120} />
      <Media.Body>
        <div className="fw-bolder mb-2 fs-6">{description}</div>
        <div className="text-muted">
          Длина {length}м Грузоподьемность {weight}кг
        </div>
      </Media.Body>
    </Media>
  );
};
