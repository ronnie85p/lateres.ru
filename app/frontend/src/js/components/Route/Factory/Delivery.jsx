import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Aside from "@js/components/Page/Aside";
import { useYandexMaps, YandexMapsMap } from "@js/components/Yandex/Maps";
import { useRequest } from "@js/components/Http/Request";
import { useForm } from "@js/components/Form";
import RawHTML from "@js/components/RawHTML";

export default (props) => {
  const { resource, topPanel } = global.App?.config || {};

  const menuList = [
    {
      pagetitle: "Сертификаты и лицензии",
      id: 1,
      url: "/factory/certs",
    },
    {
      pagetitle: "Индивидуальные составы",
      id: 2,
      url: "/factory/custom",
    },
    {
      pagetitle: "Колорирование изделий",
      id: 3,
      url: "/factory/colors",
    },
    {
      pagetitle: "Любая форма оплаты",
      id: 4,
      url: "/factory/anypay",
    },
    {
      pagetitle: "Доставка и Самовывоз",
      id: 5,
      url: "/factory/delivery",
    },
    {
      pagetitle: "Лабораторные исследования",
      id: 6,
      url: "/factory/research",
    },
    {
      id: 7,
      pagetitle: "Возврат",
      url: "/factory/return",
    },
  ];

  const url = new URL(location.href);

  return (
    <>
      <Aside>
        <Aside.Menu items={menuList} />
        <Aside.Content title={resource.pagetitle}>
          <RawHTML>{resource.content}</RawHTML>

          <YandexMapsMap containerProps={{ style: { height: 400 } }} />
          <DeliveryCalculatorForm />

          <Form></Form>
        </Aside.Content>
      </Aside>
    </>
  );
};

const DeliveryCalculatorForm = (props) => {
  const { distance } = props;

  const form = useForm({
    request: useRequest({
      params: {
        action: "web/delivery/calculate",
      },
    }),
    onSubmit({ event, formData, options }) {
      console.log("[form][submit]", event, formData, options);

      return true;
    },
  });

  console.log("[DeliveryCulcualtorForm][form]", form);

  return (
    <>
      <Form onSubmit={form.handleSubmit}>
        <input type="hidden" name="distance" value={10} />

        {/* <Card className="mt-2x mb-2">
          <Card.Body> */}
        <div className="mb-2 fs-6">Выберите транспорт</div>
        <Row className="mb-1x">
          <Col md={4}>
            <DeliveryCars name="car_id" />
          </Col>
        </Row>

        <div className="mb-2 fs-6">Вес груза, кг.</div>
        <Row>
          <Col md={3}>
            <Form.Control type="number" name="weight" />
          </Col>
        </Row>
        {/* </Card.Body>
        </Card> */}

        <div className="mb-1x mt-1x text-danger">
          {form.message ? form.message : null}
        </div>

        {form.isSuccess ? (
          <>
            <div className="">
              <div>Рейсов {form.request?.response?.object.cars}</div>
              <div>
                Стоимость за рейс: {form.request?.response?.object.car_cost}
              </div>
              <div>
                Стоимость доставки: {form.request?.response?.object.cost}
              </div>
            </div>
          </>
        ) : null}

        <Button type="submit">Рассчитать стоимость</Button>
      </Form>
    </>
  );
};

const DeliveryCars = (props) => {
  const request = useRequest({
    params: {
      action: "web/delivery/car/getList",
    },
  });

  useEffect(() => {
    request.send();
  }, []);

  console.log("request", request);

  if (!request.state) return <></>;

  switch (request.state) {
    case "sending":
      return <>Getting list of cars...</>;
    case "error":
      return <>{request.error.message}</>;
  }

  return (
    <>
      <Form.Select {...props}>
        {request.response?.results?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

{
  /* <input type="hidden" name="action" value="delivery/getcost" />
              <input type="hidden" name="distance" value="" />

              <div className="h4">Адрес</div>

              <Form.Group className="form-group mb-1">
                <div class="input-group">
                  <span class="input-group-addon icon-search"></span>
                  <input
                    class="msdom-address form-control"
                    type="search"
                    name="address"
                    placeholder="Введите адрес доставки"
                    value=""
                  />
                </div>
                <span class="form-error"></span>
              </Form.Group> */
}

{
  /* <div id="msdom-map" class="mt-2 border bg-light d-flex align-items-center" style="min-height: 400px">
      <i class="msdom-map__placeholder icon-map text-muted m-auto" style="font-size: 7em"></i>
      <div class="msdom-map__preloader">
        <table border="0"><tr><td class="msdom-map__route-msg">Прокладываем маршрут</td><td class="msdom-map__alert-msg"></td></tr></table>
      </div>
    </div>
        
    <div class="d-flex p-3 border border-top-0 bg-light">
      <div class="flex-fill"><a class="msdom-map__geolocation" href="#"><i class="icon-map-pin"></i>&nbsp;Мое местоположение</a></div>
      <div class="flex-fill text-right text-muted"><span class="msdom-delivery__coords"></span></div>
    </div>
      
    <div class="row margin-top-1x">
      <div class="col-md-6">
    
      </div>
      <div class="col-md-6 text-right">
        <div class="h6">До склада: <span class="msdom-delivery__distance">0</span>км</div>
      </div>
    </div>
    
    <hr class="mb-4" />
    
    <div class="h4">Транспорт</div>
    <select class="form-control custom-select msdom-car" name="car" data-title="<div class='text-lg'>--Не выбран</div>">
      {$cars}
    </select>
    
    <div class="row margin-top-1x">
      <div class="col-md-2">
        
        <div class="custom-control custom-checkbox custom-control-inline">
          <input class="custom-control-input" type="checkbox" name="custom_weight" value="1" id="ex-check-1" data-toggle="collapse" data-target="#delivery-weight">
          <label class="custom-control-label" for="ex-check-1">Указать вес</label>
        </div>
        
      </div>
    </div>
    
    <hr class="mt-2 mb-4" />
    
    <div class="collapse" id="delivery-weight">
      <div class="row margin-top-2x">
        <div class="col-md-4"></div>
        <div class="col-md-4 text-center">
          <div class="h4">Вес, кг.</div>
          <input class="text-center h3 p-2" value="" name="weight" data-mask="number" />
        </div>
        <div class="col-md-4"></div>
      </div>
      <hr class="margin-top-2x mb-4" />
    </div>
    
    <div class="msdom-delivery_cost">
      <div class="h6 text-primary d-flex align-items-center justify-content-center"></div>
    </div>
      
    <div class="form-group text-center">
      <button class="btn btn-lg btn-outline-primary" type="submit">Рассчитать доставку</button>
    </div> */
}

{
  /* {'!uDelivery' | snippet : [
  'params' => [
    'zoom' => 15,
    'country' => 'Россия',
    'countryHidden' => true,
    'region' => 'Московская область, Москва, Тверская область',
    'autoCalculate' => true,
    'noResolveAddressMessage' => '<span class="text-primary">Пожалуйста, укажите правильный адрес!</span>',
    'messageTimeout' => 5000
  ],
  'tplDeliveryCost' => '@FILE chunks/udelivery/deliverycost.html'
]}

{set $cars = 'uDeliveryCars' | snippet : [
  'tpl' => '@INLINE 
            
    {set $html = \'
      <div class="row p-3">
        <div class="col-2">
          <img class="car-image" src="\'~$image~\'">
        </div>
        <div class="col-10">
          <div class="car-name h6">\'~$name~\'</div>
          <div class="car-length">Длина борта: \'~$length~\'м.&nbsp;Макс. вес: \'~$volume~\'кг.</div>
          <span class="car-description text-muted">\'~$description~\'</span>
        </div>
      </div>
    \'}
            
    <option class="car-item" id="car-item-{$id}" value="{$id}" data-content=\'{$html}\'></option>
    <option class="divider"></option>
    
  '
]} */
}
