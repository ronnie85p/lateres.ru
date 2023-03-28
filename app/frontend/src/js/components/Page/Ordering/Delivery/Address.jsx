import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import Form from "@js/components/Form";
import { useResource } from "@js/components/Request";
import { useRoute, useGeocode, Maps } from "@js/components/Yandex/Maps";

export default (props) => {
  const { data, form } = React.useContext(Context);
  const { address } = data;

  return (
    <>
      {address?.id ? (
        <>
          <Row className="mb-4">
            <Col md="10">
              <div className="mb-2">
                <Icon name="geo-alt" className="mr-2" /> {address.text}
              </div>
              <Routes />
            </Col>
            <Col className="text-end" md="2">
              <Link to="/lk/addresses" title="Изменить адрес">
                <Icon name="pencil-square" />
              </Link>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label htmlFor="address_comment">Дополнительно</Form.Label>
            <Form.TextArea
              name="address_comment"
              defaultValue={address.comment}
              placeholder="Дополнительная информация по адресу"
              onChange={form.handleChange}
            />
          </Form.Group>
        </>
      ) : (
        <Link to="/lk/addresses">Добавить адрес</Link>
      )}
    </>
  );
};

const cache = new Map();

const Routes = (props) => {
  const { data, config, form } = React.useContext(Context);
  const address = data.address;
  const startPoint = config.config["app.contacts_factory_coords"]
    ?.split(",")
    .map((item) => parseFloat(item));
  const loading = <>Вычисляем маршрут...</>;

  const handleShowMap = () => {};

  const Route = ({ resource }) => {
    const data = resource.read();
    const distance = (data.getLength() / 1000).toFixed(2);

    console.log("form", form);

    return (
      <>
        <div>
          <div className="fst-italic text-muted">
            Расстояние до склада {distance} км
          </div>
          <a href="#" onClick={handleShowMap}>
            Посмотреть маршрут
          </a>
        </div>
      </>
    );
  };

  const Geocode = ({ resource }) => {
    const { geoObjects } = resource.read();
    const finishPoint = geoObjects.get(0).geometry.getCoordinates();
    const route = useRoute([startPoint, finishPoint], {
      mapStateAutoApply: true,
      routingMode: "auto",
    });
    const routeResource = useResource(route);

    return (
      <React.Suspense fallback={loading}>
        <Route resource={routeResource} />
      </React.Suspense>
    );
  };

  const Map = () => {
    const geocode = useGeocode(address.text, { results: 1 });
    const resource = useResource(geocode);

    return (
      <React.Suspense fallback={loading}>
        <Geocode resource={resource} />
      </React.Suspense>
    );
  };

  return (
    <Maps
      fallback={loading}
      ErrorFallback={({ error }) => <>{error.message}</>}
    >
      <Map />
    </Maps>
  );
};
