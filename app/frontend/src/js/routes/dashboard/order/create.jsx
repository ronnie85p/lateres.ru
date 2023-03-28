import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Placeholder from "react-bootstrap/Placeholder";
import { useLoaderData, Link, useLocation } from "react-router-dom";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import Media from "@js/components/Media";
import Button from "@js/components/Form/Button";
import InputCounter from "@js/components/Form/InputCounter";
import { Form, useForm } from "@js/components/Form";
import {
  sendRequest,
  useRequest,
  fetchData,
  useSuspenseResource,
  usePromise,
} from "@js/components/Request";
import { Page } from "@dashboard/components/Dashboard";
import FetchList from "@js/components/FetchList";
import { ErrorBoundary } from "react-error-boundary";

const Index = (props) => {
  const data = useLoaderData();
  const deliveriesResource = useSuspenseResource(() =>
    sendRequest("web/delivery/getList").then((response) => response.results)
  );

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

      <Page.Title>Новый заказ</Page.Title>
      <Row>
        <Col md={8}>
          <ErrorBoundary>
            <React.Suspense fallback={<>Loading</>}>
              <Content resource={deliveriesResource} />
            </React.Suspense>
          </ErrorBoundary>
        </Col>
      </Row>
    </Context.Provider>
  );
};

const Content = (props) => {
  const { resource } = props;
  const defaultDelivery = 1;
  const deliveries = resource.read();
  const carsResource = useSuspenseResource(getCars());

  return (
    <>
      <Row>
        <Form.Group as={Col} md="12">
          {deliveries.map((item) => (
            <Form.Check
              key={item.id}
              type="radio"
              name="delivery"
              id={`delivery-${item.id}`}
              label={item.name}
              defaultChecked={item.id === defaultDelivery}
              defaultValue={1}
              inline
            />
          ))}
        </Form.Group>
      </Row>

      <div className="h5">Товары</div>
      <ProductsLayer />

      <div className="mb-4"></div>

      <div className="h5">Получатель</div>
      <Form.Input name="" placeholder="username, email, phone, fullname" />
      <Button>
        <Icon name="plus" /> Добавить получателя
      </Button>

      <CustomerForm />

      <div className="h5">Адрес</div>
      <a href="">Построить маршрут</a>
      {/* <AddressForm /> */}

      <div className="h5 mt-4">Транспорт</div>

      <ErrorBoundary>
        <React.Suspense fallback={<>Loading...</>}>
          <DeliveryCars resource={carsResource} />
        </React.Suspense>
      </ErrorBoundary>
    </>
  );
};

const ProductsLayer = (props) => {
  return (
    <>
      <ProductForm />

      {/* <Products /> */}
    </>
  );
};

const ProductForm = (props) => {
  const action = "";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[product] adding...");
      return false;
    },
  });

  return (
    <>
      <Form onSubmit={form.handleSubmit}>
        <input type="hidden" name="product_id" value="" />

        <Row>
          <Col>
            <Autocomplete
              items={[{ value: "Item 1", text: "Item Text 1" }]}
              onSelect={(eventKey, event) =>
                console.log("[onSelect] eventKey, event", eventKey, event)
              }
              // MenuItem={({ item }) => <>{item.text}</>}
            >
              <Form.Input name="name" placeholder="" autoComplete="off" />
            </Autocomplete>
          </Col>
          <Col md={4}>
            <InputCounter name="count" disabled={1} />
          </Col>
          <Col md={2}>
            <Button
              type="submit"
              disabled={1}
              loading={form.isSubmitting}
              loadingText="Добавляем..."
            >
              Добавить
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const Autocomplete = (props) => {
  const {
    children,
    items = [],
    showMenu = false,
    inputTimeout = 600,
    onSelect,
    MenuItem = (item) => (
      <Dropdown.Item
        eventKey={item.value}
        data-data={JSON.stringify(item.data || "{}")}
      >
        {item.text || item.value}
      </Dropdown.Item>
    ),
    Loading = (
      <Dropdown.Item style={{ cursor: "pointer" }}>Loading...</Dropdown.Item>
    ),
  } = props;

  const [isMenuShown, setMenuShown] = useState(showMenu);
  const [promise, setPromise] = useState(false);
  const parentRef = React.createRef();

  var timeoutId;

  const handleInput = (event) => {
    let _this = event.currentTarget;

    if (_this.value.trim() == "") {
      setMenuShown(false);
    }

    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      if (_this.value.trim() != "") {
        setMenuShown(true);
      }
    }, inputTimeout);
  };

  const handleSelect = (eventKey, event) => {
    let _this = event.currentTarget;
    let _parent = _this.closest(".dropdown");

    _parent.querySelector("input").value = eventKey;
    setMenuShown(false);

    onSelect && onSelect(eventKey, event);
  };

  const Items = () => {
    return (
      <>
        {items?.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </>
    );
  };

  useEffect(() => {
    parentRef.current
      .querySelector("input")
      .addEventListener("input", handleInput, false);
  }, []);

  return (
    <>
      <Dropdown ref={parentRef} show={isMenuShown} onSelect={handleSelect}>
        {children}

        <Dropdown.Menu
          className="shadow-sm py-0 overflow-hidden"
          style={{
            width: "100%",
            marginTop: 4,
          }}
        >
          <ErrorBoundary>
            <React.Suspense fallback={<>Loading...</>}>
              <Items />
            </React.Suspense>
          </ErrorBoundary>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const Products = (props) => {
  return <></>;
};

const CustomerForm = (props) => {
  const { defaultUserType = 0 } = props;
  const [isUserJuristicType, setUserJuristicType] = useState(
    defaultUserType == 1
  );

  const handleChange = (event) => {
    const _this = event.currentTarget;

    setUserJuristicType(_this.checked);
  };

  return (
    <>
      <Form.Check
        type="switch"
        name="user_type"
        id="user_type"
        label="Юр лицо"
        className="mb-4"
        defaultValue={1}
        defaultChecked={isUserJuristicType}
        onChange={handleChange}
      />

      <Row>
        <Form.Group as={Col} md={8}>
          <Form.Label htmlFor="fullname">
            Полное имя<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input name="fullname" placeholder="Фамилия Имя Отчество" />
        </Form.Group>

        <Form.Group as={Col} md={4}>
          <Form.Label htmlFor="mobilephone">Телефон</Form.Label>
          <Form.Input name="mobilephone" maskAlias="phone" />
        </Form.Group>

        <Form.Group as={Col} md={5}>
          <Form.Label htmlFor="email">
            E-mail<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input name="email" placeholder="user@domain.ru" />
        </Form.Group>
      </Row>

      {isUserJuristicType ? <CompanyForm /> : <></>}
    </>
  );
};

const AddressForm = (props) => {
  return (
    <>
      <Form.Group as={Col} md={5}>
        <Form.Input name="address" placeholder="" />
      </Form.Group>
    </>
  );
};

const CompanyForm = (props) => {
  const [isAddressRequired, setAddressRequired] = useState(0);

  return (
    <>
      <div className="h5">Компания</div>
      <Row>
        <Form.Group as={Col} md={12}>
          <Form.Label htmlFor="name">
            Название<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input name="name" placeholder="" />
        </Form.Group>

        <Form.Group as={Col} col={4}>
          <Form.Label htmlFor="company_inn">
            ИНН<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input name="company_inn" placeholder="" />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label htmlFor="company_kpp" col={4}>
            КПП<span className="text-danger">*</span>
          </Form.Label>
          <Form.Input name="company_kpp" placeholder="" />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label htmlFor="company_ogrn">ОГРН (ИП)</Form.Label>
          <Form.Input name="company_ogrn" placeholder="" />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md={4}>
          <Form.Label htmlFor="company_phone">Телефон</Form.Label>
          <Form.Input name="company_phone" maskAlias="phone" />
        </Form.Group>
      </Row>

      {isAddressRequired ? <CompanyAddressForm /> : <></>}

      <Row>
        <Col>
          <Form.Check
            name="company_address_required"
            id="company_address_required"
            label="Заполнить адрес"
            defaultChecked={isAddressRequired}
            onChange={({ currentTarget }) =>
              setAddressRequired(currentTarget.checked)
            }
          />
        </Col>
      </Row>
    </>
  );
};

const CompanyAddressForm = (props) => {
  return (
    <>
      <div className="h6">Юридический адрес</div>

      <Row>
        <Form.Group as={Col} md={9}>
          <Form.Label htmlFor="company_address_country">Страна</Form.Label>
          <Form.Input name="company_address_country" placeholder="" />
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="company_address_index">Индекс</Form.Label>
          <Form.Input name="company_address_index" placeholder="" />
        </Form.Group>

        <Form.Group as={Col} md={12}>
          <Form.Label htmlFor="company_address_region">Регион</Form.Label>
          <Form.Input name="company_address_region" placeholder="" />
        </Form.Group>

        <Form.Group as={Col} md={12}>
          <Form.Label htmlFor="company_address_city">
            Населенный пункт
          </Form.Label>
          <Form.Input name="company_address_city" placeholder="" />
        </Form.Group>

        <Form.Group as={Col} md={10}>
          <Form.Label htmlFor="company_address_street">Улица</Form.Label>
          <Form.Input name="company_address_street" placeholder="" />
        </Form.Group>

        <Form.Group as={Col} md={2}>
          <Form.Label htmlFor="company_address_building">Строение</Form.Label>
          <Form.Input name="company_address_building" placeholder="" />
        </Form.Group>
      </Row>
    </>
  );
};

const DeliveryCars = (props) => {
  const { resource, defaultCar = 0 } = props;
  const [car, setCar] = useState(defaultCar);
  const cars = resource.read();

  const handleChange = (event) => {
    const _this = event.currentTarget;

    setCar(_this.value);
  };

  return (
    <>
      <Row>
        <Form.Group className="" as={Col}>
          <Form.Select
            name="car"
            defaultValue={defaultCar}
            onChange={handleChange}
          >
            <option value="">--Не выбран</option>
            {cars?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <div className="mt-2" style={{ minHeight: 100 }}>
        {car > 0 ? <CarInfo car={car} /> : <div>Выберите транспорт</div>}
      </div>
    </>
  );
};

const CarInfo = (props) => {
  const { car } = props;
  const resource = useSuspenseResource(() =>
    sendRequest("web/delivery/car/get", { id: car }).then(
      (response) => response.object
    )
  );

  const Output = (props) => {
    const data = resource.read();

    return (
      <>
        <Media className="mb-2 border rounded px-2 py-3 overflow-hidden">
          <Media.Image className="mr-4" src={data.image} width="150" />
          <Media.Body>
            <div className="fw-bolder">{data.description}</div>
            <div className="">
              <span className="text-muted">Длина борта {data.length} м</span>
            </div>
            <div className="">
              <span className="text-muted">Грузоподьемность</span> {data.weight}{" "}
              кг
            </div>
          </Media.Body>
        </Media>

        <Row>
          <Col className="text-start">
            <a href="">Редактировать</a>
          </Col>
        </Row>

        <CalculatingDelivery car_id={data.id} />
      </>
    );
  };

  return (
    <>
      <ErrorBoundary>
        <React.Suspense fallback={<>Loading...</>}>
          <Output />
        </React.Suspense>
      </ErrorBoundary>
    </>
  );
};

const CalculatingDelivery = (props) => {
  const { distance = 5, weight, car_id } = props;
  const resource = useSuspenseResource(() =>
    sendRequest("mgr/delivery/calculate", { car_id, distance, weight }).then(
      (response) => response.object
    )
  );

  const Output = () => {
    const data = resource.read();

    return (
      <>
        <Row className="mt-4">
          <Col>
            <div className="fs-5 mb-2">{data.zone.name}</div>
            <div className="">
              Область доставки{" "}
              {data.zone.distanceof > 0 ? `${data.zone.distanceof} км` : ""} до{" "}
              {data.zone.distanceup} км
            </div>
            <div>Мин цена {data.zone.minprice} руб</div>
            <div>Макс цена {data.zone.maxprice} руб.</div>
            <div>Фикс цена {data.zone.fixprice} руб.</div>
            <div>
              <a href="">Редактировать</a>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col className="fs-6">Кол-во рейсов {data.cars}</Col>
          <Col className="text-end">
            <div className="fs-6">
              Стоимость рейса{data.is_min_cost ? " от" : ""} {data.car_cost} руб{" "}
            </div>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      <ErrorBoundary>
        <React.Suspense fallback={<>Calculating...</>}>
          <Output />
        </React.Suspense>
      </ErrorBoundary>
    </>
  );
};

const getCars = (data) => {
  return sendRequest("web/delivery/car/getList", data).then(
    (response) => response.results
  );
};

export default Index;
