import React, { useState, useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Placeholder from "react-bootstrap/Placeholder";

import Context from "@js/contexts/context";
import {
  QueryData,
  useRequest,
  useParams,
  useLocation,
} from "@js/components/Request";
import Image from "@js/components/Image";
import Icon from "@js/components/Icon";
import Media from "@js/components/Media";
import Preloader from "@js/components/Preloader";
import { Form } from "@js/components/Form";

import { Title, Layer } from "./Components";
import { Address } from "./Address";
import { Payments, PaymentItem, PaymentInfo } from "./Payments";

const components = {
  1: (props) => <DeliveryPickup {...props} />,
  2: (props) => <DeliveryCompany {...props} />,
};

export default (props) => {
  const { delivery } = props;
  const Component = components[delivery.id];

  return (
    <>
      <Title className="mb-0">Cпособ оплаты</Title>
      <DeliveryPayments delivery_id={delivery.id} />

      <div className="my-4"></div>

      <Title className="">Контактные данные</Title>
      <Component {...props} />
    </>
  );
};

const DeliveryPayments = (props) => {
  const { delivery_id } = props;
  const { settings } = useContext(Context);
  const request = useRequest({
    action: "web/delivery/payment/getList",
    data: {
      delivery_id,
    },
  });

  const queryDataProps = {
    request,
    Loading: (
      <Placeholder animation="grow">
        <Placeholder md="3" />
        <Placeholder md="3" />
        <Placeholder md="3" />
      </Placeholder>
    ),
    Error: ({ error }) => <>{error.message}</>,
  };

  useEffect(() => {
    request.send();
  }, [settings.delivery]);

  return (
    <div className="position-relative">
      <QueryData {...queryDataProps}>
        <PaymentMethods payments={request.response?.results} />
      </QueryData>
    </div>
  );
};

const PaymentMethods = (props) => {
  const { payments } = props;
  const { settings, setSettings } = useContext(Context);
  const location = useLocation();
  const payment =
    payments.find((item) => settings.payment == item.id) || payments[0];

  const handleChange = (event) => {
    let _this = event.currentTarget;
    let param = { include_tax: 0, [_this.name]: _this.value };

    location.updateParams(param);
    setSettings({ ...settings, ...param });
  };

  return (
    <>
      <Payments>
        {payments.map((item) => (
          <PaymentItem
            {...item}
            key={item.id}
            checked={payment.id == item.id}
            onChange={handleChange}
          />
        ))}
      </Payments>

      <Layer>
        <PaymentInfo payment={payment} />
      </Layer>
    </>
  );
};

const DeliveryPickup = (props) => {
  const { config, order } = useContext(Context);
  const { work_times } = order;

  return (
    <>
      <Layer>
        <Row>
          <Col>
            <div className="text-muted fw-bolder mb-2">Адрес выдачи товара</div>
            <div className="">
              <Icon name="geo-alt" className="mb-1 mr-2" />
              {config.config["app.contacts_factory_address"]}
            </div>
          </Col>
        </Row>
      </Layer>

      <Layer>
        <Row>
          <Col md={5}>
            <DeliveryTime times={work_times} label="Дата и время получения" />
          </Col>
        </Row>
      </Layer>
    </>
  );
};

const DeliveryCompany = (props) => {
  const { config, order } = useContext(Context);
  const { work_times } = order;

  return (
    <>
      <Layer>
        <Row>
          <Col>
            <div className="text-muted fw-bolder mb-2">
              Адрес отгрузки товара
            </div>
            <div className="">
              <Icon name="geo-alt" className="mb-1 mr-2" />
              {config.config["app.contacts_factory_address"]}
            </div>
          </Col>
        </Row>
      </Layer>

      <Layer>
        <Row>
          <Form.Group className="form-group mb-0" as={Col}>
            <Form.Label htmlFor="address">Адрес доставки</Form.Label>
            <Address />
          </Form.Group>
        </Row>

        <hr />

        <Row>
          <Form.Group as={Col}>
            <Form.Label htmlFor="delivery_car">Транспорт</Form.Label>
            <DeliveryCars />
          </Form.Group>
        </Row>
      </Layer>

      <Layer>
        <Row>
          <Col md={5}>
            <DeliveryTime times={work_times} label="Дата и время доставки" />
          </Col>
        </Row>
      </Layer>
    </>
  );
};

const DeliveryCars = (props) => {
  const { total, distance } = useContext(Context);
  const params = useParams();
  const location = useLocation();
  const queryDataProps = {
    request: useRequest({ action: "web/delivery/car/getList" }),
    Loading: <>Loading...</>,
    Error: ({ error }) => <>{error.message}</>,
  };

  const { request } = queryDataProps;

  const Output = () => {
    const { results } = request.response;
    const [value, setValue] = useState(params.delivery_car);

    const cars = {};
    for (let i in results) {
      let item = results[i];
      cars[item.id] = item;
    }

    const car = cars[value];

    const handleChange = (event) => {
      let _this = event.currentTarget;

      location.updateParams({ [_this.name]: _this.value });
      setValue(_this.value);
    };

    return (
      <>
        <Row>
          <Col md={5}>
            <Form.Select
              name="delivery_car"
              defaultValue={value}
              onChange={handleChange}
            >
              <option value="0">--Не выбран</option>
              {results.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <DeliveryCar {...car} />

        {car ? (
          <Row>
            <Col>
              {/* <DeliveryCalculate car_id={car.id} distance={distance} weight={total.weight} /> */}
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <QueryData {...queryDataProps}>
      <Output {...props} />
    </QueryData>
  );
};

const DeliveryCar = (props) => {
  return <></>;
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

const DeliveryCalculate = (props) => {
  const { car_id, distance, weight } = props;
  const Loading = <>Рассчитываем стоимость...</>;
  const ErrorFallback = ({ error }) => <>{error.message}</>;

  return (
    <FetchData
      loader={() =>
        sendRequest("web/delivery/calculate", { car_id, distance, weight })
      }
      Loading={Loading}
      ErrorFallback={ErrorFallback}
    >
      {({ data }) => (
        <FetchData
          loader={() =>
            sendRequest("web/ordering/save", { delivery: data.object })
          }
          Loading={Loading}
          ErrorFallback={ErrorFallback}
        />
      )}
    </FetchData>
  );
};

const DeliveryTime = (props) => {
  const { label, defaultTimeOption = "чч:мм", times } = props;
  const { form } = useContext(Context);

  const Option = ({ value }) => {
    return <option value={value}>{value}</option>;
  };
  console.log("form", form);
  return (
    <Form.Group className="form-group mb-0">
      <Form.Label htmlFor="delivery_datetime">{label}</Form.Label>
      <InputGroup>
        <Form.Control
          name="delivery_date"
          type="date"
          min=""
          style={{ width: "40%" }}
          isInvalid={"delivery_date" in form.errors}
        />

        <Form.Select
          name="delivery_time"
          isInvalid={"delivery_time" in form.errors}
        >
          <option value="0">{defaultTimeOption}</option>

          {times?.map((time) => (
            <Option key={time} value={time} />
          ))}
        </Form.Select>
      </InputGroup>

      <Form.FieldError>{form.errors.delivery_date}</Form.FieldError>
      <Form.FieldError>{form.errors.delivery_time}</Form.FieldError>
    </Form.Group>
  );
};
