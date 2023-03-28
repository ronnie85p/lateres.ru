import React, { useEffect, useContext, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Placeholder from "react-bootstrap/Placeholder";
import { useLoaderData, Link, useLocation } from "react-router-dom";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import Image from "@js/components/Image";
import Media from "@js/components/Media";
import { useMaps } from "@js/components/Yandex/Maps";
import Button from "@js/components/Form/Button";
import { Select, Option } from "@js/components/Form/Select";
import { Form, useForm } from "@js/components/Form";
import {
  sendRequest,
  useRequest,
  fetchData,
  usePromise,
} from "@js/components/Request";
import { Page } from "@dashboard/components/Dashboard";
import FetchList from "@js/components/FetchList";

const Index = (props) => {
  const data = useLoaderData();
  const [tab, setTab] = useState("1");

  return (
    <Context.Provider value={{ data }}>
      <div className="mb-2x">
        <Button
          as={Link}
          to="/dashboard/orders"
          variant="outline-secondary"
          className="border"
        >
          <Icon name="arrow-left-short" /> Назад
        </Button>
      </div>

      <Row>
        <Col>
          <h1 className="h4 mb-2" style={{ fontWeight: 500 }}>
            Заказ № {data.num}
          </h1>

          <div className="text-muted">
            от {data.createdon}{" "}
            <a href="#" onClick={(event) => event.preventDefault()}>
              {data.user.fullname}
            </a>
          </div>
        </Col>
        <Col className="text-end">
          <Select
            name="status"
            defaultValue={5}
            toggleBtnProps={{ size: "sm", align: "end" }}
            onChange={(event) => console.log("changed", this.value)}
          >
            <Option value="1" toggleBtnProps={{ variant: "dark" }}>
              <Icon name="exclamation-lg" className="mr-2" />
              Новый
            </Option>
            <Option value="2">
              <Icon name="clock" className="mr-2" />В обработке
            </Option>
            <Option value="3" toggleBtnProps={{ variant: "warning" }}>
              <Icon name="truck" className="mr-2" />
              Передан на доставку
            </Option>
            <Option value="4" toggleBtnProps={{ variant: "success" }}>
              <Icon name="check-lg" className="mr-2" />
              Выполнен
            </Option>
            <Option value="5" toggleBtnProps={{ variant: "danger" }}>
              <Icon name="x" className="mr-2" />
              Отменен
            </Option>
          </Select>
        </Col>
      </Row>

      <hr className="mt-2 mb-1x" />

      <Nav
        variant="tabs"
        className="mb-4"
        activeKey={tab}
        onSelect={(selectedKey) => setTab(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="1">Заказ</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2">Получатель</Nav.Link>
        </Nav.Item>
      </Nav>

      <Row>
        <Col md={12}>
          {tab == 1 ? <IndexForm /> : <></>}
          {tab == 2 ? <CustomerForm /> : <></>}
        </Col>
      </Row>
    </Context.Provider>
  );
};

const CustomerForm = (props) => {
  const [customerType, setCustomerType] = useState(1);

  const action = "";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[CustomerForm] saving...");
      return false;
    },
  });

  return (
    <>
      <Form onSubmit={form.handleSubmit}>
        <Row className="mb-4">
          <Col>
            <Form.Check
              defaultValue={1}
              checked={!!customerType}
              onChange={(event) => setCustomerType(!!!customerType)}
              type="switch"
              id="customer-type"
              name="customer_type"
              label="Юридическое лицо"
            />
          </Col>
        </Row>

        <Row>
          <Form.Group as={Col} md={6}>
            <Form.Label htmlFor="fullname">Полное имя</Form.Label>
            <Form.Input name="fullname" defaultValue={""} />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={3}>
            <Form.Label htmlFor="fullname">Телефон</Form.Label>
            <Form.Input name="mobilephone" maskAlias="phone" />
          </Form.Group>
        </Row>

        {customerType ? <CustomerCompany /> : <></>}

        <hr />

        <Button
          type="submit"
          loading={form.isSubmitting}
          loadingText={"Сохраняем..."}
        >
          Сохранить
        </Button>
      </Form>
    </>
  );
};

const CustomerCompany = (props) => {
  return (
    <>
      <h5 className="mt-4">Компания</h5>

      <Row>
        <Form.Group as={Col} md={6}>
          <Form.Label htmlFor="company_name">Название</Form.Label>
          <Form.Input name="company_name" defaultValue={""} />
        </Form.Group>
      </Row>

      {/* <Row>
        <Form.Group as={Col} md={6}>
          <Form.Label htmlFor="company_name">ИНН</Form.Label>
          <Form.Input name="company_name" defaultValue={""} />
        </Form.Group>
      </Row> */}
    </>
  );
};

const IndexForm = (props) => {
  const deliveries = require("@js/fakes/deliveries.json");
  const payments = require("@js/fakes/payments.json");

  const [delivery, setDelivery] = useState(1);
  const [payment, setPayment] = useState(1);

  const action = "mgr/order/update";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[order] updating...");
      return false;
    },
  });

  return (
    <>
      <Form onSubmit={form.handleSubmit}>
        <Row>
          <Col md={6}>
            <Row>
              <Form.Group as={Col}>
                <Form.Label htmlFor="delivery">Доставка</Form.Label>
                <Form.Select
                  name="delivery"
                  defaultValue={delivery}
                  onChange={({ currentTarget }) =>
                    setDelivery(parseInt(currentTarget.value))
                  }
                >
                  {deliveries.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>

            <DeliveryContent delivery={delivery} />

            <hr />

            <Row>
              <Form.Group as={Col}>
                <Form.Label htmlFor="payment">Способ оплаты</Form.Label>
                <Form.Select
                  name="payment"
                  defaultValue={payment}
                  onChange={({ currentTarget }) =>
                    setPayment(currentTarget.value)
                  }
                >
                  <option value="">--Не выбран</option>

                  {payments.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="comment">
                Комментарий (для менеджера)
              </Form.Label>
              <Form.TextArea name="comment"></Form.TextArea>
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <Button
          type="submit"
          loading={form.isSubmitting}
          loadingText="Сохраняем..."
        >
          Сохранить
        </Button>
      </Form>
    </>
  );
};

const Payments = (props) => {
  return;
};

const DeliveryContent = (props) => {
  const { delivery } = props;

  switch (delivery) {
    case 1:
      return <DeliveryPickup />;
    case 2:
      return <DeliveryCompany />;
  }

  return <></>;
};

const DeliveryPickup = (props) => {
  return <DeliveryTime label="Дата и время получения" />;
};

const DeliveryCompany = (props) => {
  const resource = fetchData("web/delivery/car/getList");

  return (
    <>
      <Address {...props} />

      <ErrorBoundary>
        <React.Suspense fallback={<>loading...</>}>
          <DeliveryCars resource={resource} distance={12.0} />
        </React.Suspense>
      </ErrorBoundary>

      <DeliveryTime label="Дата и время доставки" />
    </>
  );
};

const CarZone = (props) => {
  const { car_id, distance } = props;
  const resource = fetchData("mgr/delivery/calculate", {
    car_id,
    distance,
    weight: 10000,
  });

  const CarZoneInfo = () => {
    const { object } = resource.read();

    return (
      <>
        <Row>
          <Col>
            <div className="mb-4">
              <div className="fs-5 mb-2">{object.zone.name}</div>
              {/* <div className="text-muted mb-2">{object.zone.description}</div> */}
              <div className="">
                <span className="border-bottom">
                  Зона доставки от {object.zone.distanceof} -{" "}
                  {object.zone.distanceup} км
                </span>
              </div>
            </div>

            <div className="mb-4">
              <Row>
                <Form.Group as={Col} md={4}>
                  <Form.Label htmlFor="car_cost">Цена за рейс</Form.Label>
                  <InputGroup>
                    <Form.Input
                      size="sm"
                      name="car_cost"
                      defaultValue={object.car_cost}
                      maskAlias="currency"
                    />
                    <InputGroup.Text>руб</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Row>

              <div className="">Кол-во рейсов {object.cars}</div>
              <div className="">Общая стоимость {object.cost}руб</div>
            </div>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<>loading...</>}>
        <CarZoneInfo resource={resource} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

const Address = (props) => {
  const { address } = props;
  const [coords, setCoords] = useState([]);
  console.log("coords", coords);
  return (
    <>
      <Form.Group>
        <Form.Label htmlFor="address">Адрес</Form.Label>
        <Form.Input
          name="address"
          defaultValue={address}
          autoFocus={!!!address}
          onChange={() => setCoords([54.2213078, 36.9487177])}
        />
        <a href="#" className="mr-3">
          Показать на карте
        </a>
        <a href="#">Выбрать другой</a>
      </Form.Group>

      {coords.length ? <AddressDistance finishPoint={coords} /> : <></>}
    </>
  );
};

const usePromiseEx = (promise) => {
  const [object, setObject] = useState({ state: "pending", result: null });

  useEffect(() => {
    promise.then(
      (result) => {
        setObject({ state: "success", result });
      },
      (error) => {
        setObject({ state: "error", error });
      }
    );
  }, []);

  return object;
};

const AddressDistance = (props) => {
  const {
    startPoint = [56.2213078, 36.9487177],
    finishPoint = [54.2213078, 36.9487177],
  } = props;

  const [distance, setDistance] = useState(0);
  const [pending, setPending] = useState(false);
  const maps = useMaps();

  const Calculate = async () => {
    if (maps.isReady) {
      setPending(true);

      await maps.getRouter(startPoint, finishPoint).then(
        (router) => {
          const distance = maps.getRouterLength(router);
          setDistance(distance);
        },
        (error) => {
          // throw error;
        }
      );

      setPending(false);
    }
  };

  const Distance = () => {
    console.log("distance", distance);
    return <>{distance}</>;
  };

  useEffect(() => {
    Calculate();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={({ error }) => <>{error.message}</>}>
      {pending ? (
        <>Calclating...</>
      ) : (
        <>
          <Distance />
        </>
      )}
      <React.Suspense fallback={<>Calculating...</>}></React.Suspense>
    </ErrorBoundary>
  );
};

const AddressDistance_ = (props) => {
  const [reflect, setReflect] = useState({ state: "pending" });
  const maps = useMaps({
    async onReady() {
      setReflect({ state: "pending" });

      const router = await maps.getRouter(
        [56.2213078, 36.9487177],
        [54.2213078, 36.9487177]
      );

      if (!router) {
        throw new Error("Расстояние не определено");
      }

      let distance = maps.getRouterLength(router);
      setReflect({ state: "done", distance });
    },
    onError(error) {
      setReflect({ state: "error", error });
    },
  });

  if (reflect.state === "pending") {
    return <>Вычисляем расстояние...</>;
  }

  if (reflect.state === "error") {
    return <>{reflect.error.message}</>;
  }

  return (
    <>
      <div className="">До склада: {reflect.distance} км</div>
    </>
  );
};

const DeliveryCars = (props) => {
  const { resource, distance } = props;
  const [car, setCar] = useState(1);
  const { results: cars } = resource.read();

  return (
    <>
      <Row>
        <Form.Group as={Col} md={6}>
          <Form.Label htmlFor="car">Транспорт</Form.Label>
          <Form.Select
            name="car"
            defaultValue={car}
            onChange={({ currentTarget }) => setCar(currentTarget.value)}
          >
            <option value="">--Не выбран</option>

            {cars.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>

      {car > 0 ? <DeliveryCar car={car} distance={distance} /> : <></>}
    </>
  );
};

const DeliveryCar = (props) => {
  const { car: id, distance } = props;
  const resource = fetchData("web/delivery/car/get", { id });

  return (
    <>
      <ErrorBoundary FallbackComponent={({ error }) => <>{error.message}</>}>
        <React.Suspense fallback={<>loading...</>}>
          <DeliveryCarInfo resource={resource} />
        </React.Suspense>
      </ErrorBoundary>

      <CarZone car_id={id} distance={distance} />
    </>
  );
};

const DeliveryCarInfo = (props) => {
  const { resource } = props;
  const { object } = resource.read();

  return (
    <div className="mt-2 mb-2x">
      <Media>
        <Media.Image src={object.image} width="150" />
        <Media.Body className="ml-3">
          <div className="fw-bolder mb-2">{object.description}</div>
          <div>
            <span className="text-muted">Длина борта</span> {object.length} м
          </div>
          <div>
            <span className="text-muted">Грузоподьемность</span> {object.weight}
            кг
          </div>
        </Media.Body>
      </Media>
    </div>
  );
};

const DeliveryTime = (props) => {
  const { label } = props;
  const times = require("@js/fakes/work_times.json");

  return (
    <>
      <Row>
        <Form.Group as={Col} md={6} className="mb-0 form-group">
          <Form.Label htmlFor="delivery_datetime">{label}</Form.Label>
          <InputGroup>
            <Form.Control
              name="delivery_date"
              type="date"
              min=""
              style={{ width: "40%" }}
            />

            <Form.Select name="delivery_time">
              <option value="0">чч:мм</option>

              {times?.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Form.Group>
      </Row>
    </>
  );
};

export default Index;
