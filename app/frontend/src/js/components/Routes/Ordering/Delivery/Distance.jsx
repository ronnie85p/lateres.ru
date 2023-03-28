import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Context from "@js/contexts/context";
import { useResource } from "@js/components/Request";
import { Maps, useGeocode, useRoute } from "@js/components/Yandex/Maps";

const fallback = <>Вычисляем расстояние...</>;
const errorFallback = ({ error }) => <>{error.message}</>;
const routeOptions = {
  mapStateAutoApply: true,
  routingMode: "auto",
};

export default (props) => {
  const { form } = React.useContext(Context);

  return (
    <ErrorBoundary ErrorComponent={errorFallback}>
      {form.values.distance ? (
        <ViewDistance distance={form.values.distance} />
      ) : (
        <CalculateDistance {...props} />
      )}
    </ErrorBoundary>
  );
};

const ViewDistance = (props) => {
  const { distance } = props;

  return (
    <div>
      <div className="fst-italic text-muted">
        Расстояние до склада {distance} км
      </div>
      <a href="#">Посмотреть маршрут</a>
    </div>
  );
};

const CalculateDistance = (props) => {
  const { text: address } = props;

  return (
    <Maps fallback={fallback}>
      <Geocode address={address}>
        {(props) => (
          <Routing {...props}>{(props) => <Result {...props} />}</Routing>
        )}
      </Geocode>
    </Maps>
  );
};

const Geocode = (props) => {
  const { children: Children, address } = props;
  const geocoder = useGeocode(address, { results: 1 });
  const resource = useResource(geocoder);

  const Output = () => {
    const data = resource.read();

    return Children ? <Children data={data} /> : <></>;
  };

  return (
    <React.Suspense fallback={fallback}>
      <Output />
    </React.Suspense>
  );
};

const Routing = (props) => {
  const { data, children: Children } = props;
  const { config } = React.useContext(Context);
  const startPoint = config.config["app.contacts_factory_coords"]
    ?.split(",")
    .map((item) => parseFloat(item));

  const finishObject = data.geoObjects.get(0);
  const finishPoint = finishObject.geometry.getCoordinates();

  const route = useRoute([startPoint, finishPoint], routeOptions);
  const resource = useResource(route);

  const Output = () => {
    const data = resource.read();

    return Children ? <Children data={data} /> : <></>;
  };

  return (
    <React.Suspense fallback={fallback}>
      <Output />
    </React.Suspense>
  );
};

const Result = (props) => {
  const { form, updateParams } = React.useContext(Context);
  const { data: router } = props;
  const distance = (router.getLength() / 1000).toFixed(2);

  useEffect(() => {
    form.setFieldValue("distance", distance);
    updateParams({ distance });
  }, []);

  return <ViewDistance distance={distance} />;
};
