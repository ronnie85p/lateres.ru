import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Placeholder from "react-bootstrap/Placeholder";
import {
  useLoaderData,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Context from "@js/contexts/context";
import Button from "@js/components/Form/Button";
import InputCounter from "@js/components/Form/InputCounter";
import { Select, Option } from "@js/components/Form/Select";
import Icon from "@js/components/Icon";
import Media from "@js/components/Media";
import FetchList from "@js/components/FetchList";
import { Form, useForm } from "@js/components/Form";
import { sendRequest, useRequest } from "@js/components/Request";
import { Page } from "@dashboard/components/Dashboard";

const Index = (props) => {
  const data = useLoaderData();

  return (
    <Context.Provider value={{ data }}>
      <div className="mb-2x">
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
      </div>

      <Row>
        <Col>
          <h1 className="h4 mb-2" style={{ fontWeight: 500 }}>
            Заказ №{data.num}
          </h1>

          <div className="text-muted">
            от {data.createdon}{" "}
            <a href="#" onClick={(event) => event.preventDefault()}>
              {data.user.fullname}
            </a>
          </div>

          <Link to={`/dashboard/order/edit?id=${data.id}`}>Редактировать</Link>
        </Col>
        <Col className="text-end">
          <Select
            name="status"
            defaultValue={5}
            toggleBtnProps={{ size: "sm" }}
            onChange={(event) => console.log("changed", this.value)}
          >
            <Option value="1" toggleBtnProps={{ variant: "dark" }}>
              Новый
            </Option>
            <Option value="2">В обработке</Option>
            <Option value="3" toggleBtnProps={{ variant: "warning" }}>
              Передан на доставку
            </Option>
            <Option value="4" toggleBtnProps={{ variant: "success" }}>
              Выполнен
            </Option>
            <Option value="5" toggleBtnProps={{ variant: "danger" }}>
              Отменен
            </Option>
          </Select>
        </Col>
      </Row>

      <hr className="mt-2 mb-1x" />

      <Card className="border mb-2">
        <Card.Body>
          <Row>
            <Col>
              <div className="h6">{data.delivery.name}</div>
              <div className="mb-1">
                <Icon name="person" className="mr-3" />
                {data.customer.fullname},{data.customer.mobilephone}
              </div>
              <div className="mb-1">
                <Icon name="building" className="mr-3" />
                {data.customer.company.text}
              </div>
              <div className="mb-1">
                {data.customer.company.address_text}{" "}
                {/* <div>
                  <a href="#" onClick={(event) => event.preventDefault()}>
                    Показать на карте
                  </a>
                </div> */}
              </div>
              <div className="mb-1">
                <Icon name="geo-alt" className="mr-3" />
                {data.address.text}{" "}
                {/* <div>
                  <a href="#" onClick={(event) => event.preventDefault()}>
                    Показать на карте
                  </a>
                </div> */}
              </div>
              <div className="">Расстояние до склада 15 км</div>
            </Col>
            <Col>
              <div className="fs-6 mb-2 fw-bolder text-decoration-underline">
                {data.payment.name}
              </div>
              <div className="mb-1 d-flex">
                <span className="" style={{ width: 100 }}>
                  Товары
                </span>
                <span className="">{data.cart_cost}</span>
              </div>
              <div className="mb-1 d-flex text-danger">
                <span className="" style={{ width: 100 }}>
                  Cкидка
                </span>
                <span className="">- {data.discount_value}</span>
              </div>
              <div className="mb-1 d-flex">
                <span className="" style={{ width: 100 }}>
                  НДС
                </span>
                <span className="">{data.sales_tax}</span>
              </div>
              <div className="mb-1 d-flex">
                <span className="" style={{ width: 100 }}>
                  Доставка
                </span>
                <span className="">{data.delivery_cost}</span>
              </div>
              <div className="mb-1 mt-2 d-flex fs-5">
                <span className="" style={{ width: 100 }}>
                  Сумма
                </span>
                <span className="">{data.cost}</span>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Body>
          <div className="h6">Доставка</div>
          <div className="mb-1">Транспорт Малотонажный до 1.5т</div>
          <div className="mb-1">Кол-во рейсов 7</div>
          <div className="mb-1">Дата и время доставки 2023-05-04 14:05</div>
        </Card.Body>
      </Card>

      <Row className="mb-2x">
        <Col>
          <div className="mb-2 fs-5">Оплата</div>

          <Dropdown className="d-inline-block mr-2">
            <Dropdown.Toggle variant="outline-secondary">Счет</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Распечатать (.PDF)</Dropdown.Item>
              <Dropdown.Item>Отправить менеджеру</Dropdown.Item>
              <Dropdown.Item>Отправить пользователю</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="d-inline-block">
            <Dropdown.Toggle variant="outline-secondary">
              Квитанция
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Распечатать (.PDF)</Dropdown.Item>
              <Dropdown.Item>Отправить менеджеру</Dropdown.Item>
              <Dropdown.Item>Отправить пользователю</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="text-end">
          <a href="#" onClick={(event) => event.preventDefault()}>
            Сделать скидку
          </a>
        </Col>
      </Row>

      <hr className="mb-2x" />

      <h4 className="mb-1x">Товары</h4>
      {data.products.map((item) => (
        <div key={item.id}>
          <div className="">
            <Media>
              <Media.Image src={item.image} width={130} rounded />
              <Media.Body>
                <Row>
                  <Col>
                    <h6>
                      <Link
                        className="text-truncate"
                        to={`/${item.uri}`}
                        target="blanc_"
                      >
                        {item.name}
                      </Link>
                    </h6>
                    <div className="text-muted text-truncate">
                      {item.description}
                    </div>
                  </Col>
                  <Col md={3}>
                    <Form>
                      <Form.Group>
                        <InputCounter
                          name="count"
                          value={item.count}
                          onChange={(event) => console.log("changed", event)}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex align-items-end">
                    <div className="fs-6">
                      Цена {item.price} руб, Вес {item.weight} кг
                    </div>
                    <div>
                      {" "}
                      Нач. цена{" "}
                      {item.purchase_price
                        ? `${item.purchase_price} руб`
                        : "не указана"}
                    </div>
                  </Col>
                  <Col md={3}>
                    <div>Стоимость {item.cost} руб</div>
                    <div>Вес {item.weight} кг</div>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <a className="text-danger mr-3" href="#">
                      Удалить
                    </a>
                    <a className="" href="#">
                      Сделать скидку
                    </a>
                  </Col>
                </Row>
              </Media.Body>
            </Media>
          </div>

          <hr className="mb-4" />
        </div>
      ))}
    </Context.Provider>
  );
};

export default Index;
