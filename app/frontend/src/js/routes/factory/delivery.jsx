import React, {
  useEffect,
  useContext,
  createRef,
  forwardRef,
  useRef,
  Fragment,
} from "react";
import { ErrorBoundary } from "react-error-boundary";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { useLoaderData, Link } from "react-router-dom";

import Context from "@js/contexts/context";
import RawHTML from "@js/components/RawHTML";
import Icon from "@js/components/Icon";
import Title from "@js/components/Page/Title";
import { useForm, Form } from "@js/components/Form";
import Button from "@js/components/Form/Button";
import {
  useRequest,
  sendRequest,
  useParams,
  useLocation,
  QueryData,
} from "@js/components/Request";
import {
  useMap,
  useGeolocation,
  MapContainer,
  InputAddress,
  GeolocationView,
} from "@js/components/Yandex/Maps";
import { FetchData } from "../../components/Request";

const Delivery = (props) => {
  const context = useContext(Context);
  const data = useLoaderData();
  const params = useParams();
  const [distance, setDistance] = React.useState(0);

  const startPoint = {
    position: context.config.config["app.contacts_factory_coords"].split(","),
    placemark: [
      {
        iconContent: `Склад`,
        hintContent: context.config.config["app.contacts_factory_address"],
        balloonContentHeader: "Склад",
        balloonContentBody:
          context.config.config["app.contacts_factory_address"],
        balloonContentFooter:
          context.config.config["app.contacts_factory_coords"],
      },
      { preset: "islands#blueStretchyIcon", draggable: false },
    ],
    alignCenter: true,
  };

  const finishPoint = {
    alignCenter: true,
    placemark: [
      {
        iconContent: "Точка доставки",
      },
      {
        preset: "islands#redStretchyIcon",
        draggable: true,
      },
    ],
  };

  const route = {
    params: {
      mapStateAutoApply: true,
      routingMode: "auto",
    },
    line: {
      strokeWidth: 5,
      strokeColor: "0000ffff",
      opacity: 0.5,
    },
  };

  console.log("params", params, "from_cart", !!params.from_cart);
  return (
    <Context.Provider value={{ ...context, distance, setDistance, data }}>
      <Title>{data?.pagetitle}</Title>

      <RawHTML>{data?.content}</RawHTML>
      <hr />

      <Map route={route} startPoint={startPoint} finishPoint={finishPoint} />
      <hr />

      <Calculator />

      <hr />
      <Row>
        <Col>
          {"from_cart" in params ? (
            <Button as={Link} to="/cart" variant="secondary" className="mr-2">
              <Icon name="chevron-left" /> Вернуться в корзину
            </Button>
          ) : (
            <></>
          )}

          <OrderButton />
        </Col>
      </Row>
    </Context.Provider>
  );
};

const OrderButton = (props) => {
  const request = useRequest({
    action: "web/cart/getTotal",
  });

  const Output = () => {
    const { object } = request.response;

    let component = <></>;
    if (object.count > 0) {
      component = (
        <Button as={Link} to="/ordering" variant="primary">
          <Icon name="box-seam" /> Оформить заказ
        </Button>
      );
    }

    return component;
  };

  return (
    <QueryData request={request} Loading={<>Loading...</>}>
      <Output />
    </QueryData>
  );
};

const Map = (props) => {
  const { route, startPoint, finishPoint } = props;
  const { distance, setDistance } = useContext(Context);
  const params = useParams();
  const location = useLocation();
  const mapRef = useRef();
  const geolocation = useGeolocation({
    // provider: "browser",
  });
  const routeObject = React.useMemo(
    () => ({ start: null, finish: null, route: null }),
    []
  );

  const [mapFullSize, setMapFullSize] = React.useState(false);
  const inputRef = React.useRef();
  const state = {};

  if (!isNaN(params.zoom)) {
    state.zoom = params.zoom;
  }

  const map = useMap({
    state,

    onReady(ymaps) {
      console.log("[onReady]", ymaps);
    },
    onError({ error }) {
      console.log("[onError]", error);
    },

    onMapZoom(event) {
      location.updateParams({ zoom: event.get("newZoom") });
    },

    events: {
      click(event) {
        let coords = event.get("coords");
        setFinishPoint(coords, true);
      },

      sizechange(event) {
        let size = event.get("newSize");
        let full = size[0] > 1000;

        // location.updateParams({ full });
        setMapFullSize(full);
      },
    },
  });

  const setInputAddress = (geoObject) => {
    const address = geoObject.getAddressLine() + " ";
    inputRef.current.value = address;

    location.updateParams({ address });
  };

  const setStartPoint = () => {
    if (routeObject.start) {
      map._.Map.geoObjects.remove(routeObject.start);
    }

    routeObject.start = map.setPoint(startPoint);
  };

  const setFinishPoint = async (position) => {
    if (routeObject.finish) {
      map._.Map.geoObjects.remove(routeObject.finish);
    }

    routeObject.finish = map.setPoint({
      ...finishPoint,
      position,
    });

    map.getGeoObject(position).then((go) => {
      setInputAddress(go);
    });

    setupRoute([
      routeObject.start.geometry.getCoordinates(),
      routeObject.finish.geometry.getCoordinates(),
    ]);
  };

  const setupRoute = async (coords) => {
    if (routeObject.route) {
      map._.Map.geoObjects.remove(routeObject.route);
    }

    const router = await ymaps.route(coords, route.params);
    routeObject.route = router.getPaths();
    routeObject.route.options.set(route.line);

    map._.Map.geoObjects.add(routeObject.route);

    const length = router.getLength() / 1000;
    setDistance(length.toFixed(length >= 1 ? 1 : 3));
  };

  const handleSelectSuggestItem = (item) => {
    map.getGeoObject(item.value).then((geoObject) => {
      const position = geoObject.geometry.getCoordinates();
      setFinishPoint(position);
    });
  };

  useEffect(() => {
    map.ready(mapRef.current).then(() => {
      setStartPoint();

      if (params.address) {
        map.getGeoObject(params.address).then((geoObject) => {
          const position = geoObject.geometry.getCoordinates();
          setFinishPoint(position);
        });
      }
    });
  }, []);

  return (
    <>
      {map.isReady ? (
        <>
          <GeolocationView
            enabled={false}
            geolocation={geolocation}
            fallback={<>Определяем Ваше местоположение...</>}
            ErrorComponent={({ error }) => <>{error.message}</>}
            onComplete={({ position }) => setFinishPoint(position)}
          >
            {"Ваши координаты " + geolocation.result?.position.join(", ")}
          </GeolocationView>
        </>
      ) : (
        <></>
      )}

      <div className="position-relative">
        <div
          className=""
          style={
            mapFullSize
              ? {
                  position: "fixed",
                  zIndex: "1123454",
                  top: "30px",
                  left: "35px",
                  width: "100%",
                }
              : {}
          }
        >
          <Row>
            <Col md={mapFullSize ? 5 : 12}>
              <InputAddress
                ref={inputRef}
                input={{
                  name: "address",
                  defaultValue: "",
                  placeholder: "",
                  className: "mb-2",
                  placeholder: "Введите адрес",
                }}
                suggest={{
                  enabled: true,
                  onSelect: handleSelectSuggestItem,
                }}
              />
            </Col>
          </Row>
        </div>

        <MapContainer ref={mapRef} height={400} />

        <div className="mt-2">
          {distance ? <b>Расстояние до склада {distance} км</b> : <></>}
        </div>
      </div>
    </>
  );
};

const Calculator = (props) => {
  const { distance } = useContext(Context);
  const params = useParams();
  const location = useLocation();
  const [car, setCar] = React.useState(params.car);

  const action = "web/delivery/calculate";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      return true;
    },
  });

  const handleCarChange = (event) => {
    let { value: car } = event.currentTarget;

    location.updateParams({ car });
    setCar(car);
  };

  const handleWeightChange = (event) => {
    let { value: weight } = event.currentTarget;

    location.updateParams({ weight });
  };

  const data = form.response?.object;

  return (
    <Form onSubmit={form.handleSubmit}>
      <input type="hidden" name="distance" value={distance} />

      <Row>
        <Form.Group as={Col} md={5}>
          <Form.Label htmlFor="car_id">
            Транспорт<span className="text-danger">*</span>
          </Form.Label>
          <DeliveryCars defaultValue={params.car} onChange={handleCarChange} />
        </Form.Group>
        <Col md={7}>
          {data ? (
            <Row className="mt-2">
              <Col>
                <div>Рейсов {data.cars}</div>
                <div>
                  Цена за рейс {data.is_min_cost ? "от " : ""}
                  {data.car_cost}
                </div>
                <div>
                  Стоимость доставки {data.is_min_cost ? "от " : ""}
                  {data.cost}
                </div>
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </Col>
      </Row>

      <Row>
        <Form.Group as={Col} md={2}>
          <Form.Label htmlFor="weight">Вес, кг</Form.Label>
          <Form.Input
            name="weight"
            defaultValue={data?.weight || params.weight}
            maskAlias="number"
            onChange={handleWeightChange}
          />
        </Form.Group>
      </Row>

      <Row>
        <Col>
          <Button
            type="submit"
            variant="outline-primary"
            disabled={!(car && distance) || form.isSubmitting}
          >
            Рассчитать стоимость
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const DeliveryCars = (props) => {
  const { defaultValue, onChange } = props;
  const request = useRequest({
    action: "web/delivery/car/getList",
  });

  const Output = () => {
    const { results } = request.response;

    return (
      <Form.Select
        name="car_id"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        <option value="">--Не выбран</option>
        {results.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
    );
  };

  return (
    <QueryData request={request} Loading={<>Loading...</>}>
      <Output />
    </QueryData>
  );
};

export default Delivery;

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
