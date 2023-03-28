import React, { useState, useEffect, createRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import RawHTML from "@js/components/RawHTML";
import Icon from "@js/components/Icon";
import { ErrorBoundary } from "react-error-boundary";

const defaultProps = {
  apiKey: "5ef0d5e8-302e-48ff-8666-1a7755486090",
  apiSource: "https://api-maps.yandex.ru/2.1/",
  apiSourceParams: {
    lang: "ru_RU",
    load: "package.full",
  },
};

const defaultMapProps = {
  state: {
    center: [56.2213499, 36.9488971],
    zoom: 15,
    type: "yandex#map",
    controls: ["zoomControl", "fullscreenControl"],
  },
  options: {},
  route: {
    options: {
      mapStateAutoApply: true,
      routingMode: "auto",
    },
  },
  points: [],
  placemark: [{}, {}],
};

const defaultGeolocationProps = {
  /*
    @timeout
    Время ожидания ответа в мс.
  */
  timeout: 30000,

  /*
    @provider
    'yandex' - геолокация по данным Яндекса на основе ip пользователя,
    'browser' - встроенная браузерная геолокация,
    'auto' - провести геолокацию всеми доступными способами и выбрать лучшее значение.
  */
  provider: "auto",

  /*
    @mapStateAutoApply
    при добавлении на карту автоматически выставить центр и уровень масштабрования карты так,
    чтобы показать текущее местоположение пользователя
  */
  mapStateAutoApply: true,

  /*
    @autoReverseGeocode
    true - автоматически прогеокодировать положение пользователя, false - вернуть как есть.
    В случае автоматического геокодирования объект, обозначающий текущее местоположение пользователя,
    будет иметь структуру, аналогичную результату выполнения geocode.
  */
  autoReverseGeocode: true,
};

const suggestProvider = {
  suggest(request, options) {
    request = request.trim();
    if (options.location) {
      const { country, region, district, locality } = options.location;
      request = [country, region, district, locality, request]
        .map((item) => item.trim())
        .filter((item) => item != "")
        .join(", ");
    }
    if (options.parent) {
      request = options.parent + ", " + request;
    }

    console.log("request", request, options);
    return ymaps
      .suggest(request)
      .then((items) =>
        items
          .map((item) => {
            let paths = item.displayName.split(",");

            let displayName = `<span class="">${paths.shift().trim()}</span>`;
            if (paths.length > 0) {
              displayName += `, <span class="text-muted">${paths.join(
                ","
              )}</span>`;
            }

            return {
              ...item,
              displayName,
            };
          })
          .filter((item) => item.value.trim() !== request.trim())
      )
      .catch(function (error) {});
  },
};

const defaultSuggestOptions = {
  timeout: 0,
  results: 5,
  boundedBy: [[], []],
  provider: suggestProvider,
};

const defaultSuggestViewProps = {
  enabled: false,
  timeout: 0,
  onSelect() {},
};

const ymapsLoad = (source) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = source;

    script.onload = () => {
      resolve(ymaps);
    };

    script.onerror = (e) => {
      reject(e);
    };

    document.head.append(script);
  });
};

const ymapsReady = (source) => {
  return new Promise((resolve, reject) => {
    if (typeof ymaps === "undefined") {
      ymapsLoad(source)
        .then((ymaps) => ymaps.ready(resolve, reject))
        .catch(reject);
    } else {
      ymaps.ready(resolve, reject);
    }
  });
};

/**
 *
 * @param {*} props
 * @returns
 */
const useMaps = (props) => {
  const { apiSource, apiKey, apiSourceParams, onReady, onError } = {
    ...defaultProps,
    ...props,
  };
  const [state, setState] = React.useState({ status: "none" });

  const getApiSource = () => {
    const url = new URL(apiSource);
    url.searchParams.set("apikey", apiKey);

    if (apiSourceParams) {
      for (let param in apiSourceParams) {
        let value = apiSourceParams[param];
        url.searchParams.append(param, value);
      }
    }

    return url;
  };

  const handleReady = (ymaps) => {
    onReady && onReady(ymaps);
    setState({ status: "ready", ymaps });

    return ymaps;
  };

  const handleError = (error) => {
    onError && onError(error);
    setState({ status: "error", error });
  };

  const ready = () => {
    return ymapsReady(getApiSource()).then(handleReady).catch(handleError);
  };

  return {
    state,
    ready,
  };
};

/**
 *
 * @param {*} props
 * @returns
 */
const Maps = (props) => {
  const { children, fallback = <></>, ErrorFallback } = props;
  const maps = useMaps(props);

  useEffect(() => {
    maps.ready();
  }, []);

  return (
    <ErrorBoundary ErrorFallback={ErrorFallback}>
      {maps.state.status === "pending" ? fallback : <></>}
      {maps.state.status === "ready" ? children : <></>}
    </ErrorBoundary>
  );
};

/**
 *
 * @param {*} points
 * @param {*} params
 * @returns
 */
const useRoute = (points, params) => {
  return ymaps.route(points, params);
};

const useGeocode = (position, options) => {
  return ymaps.geocode(position, options);
};

/**
 *
 * @param {*} geoObject
 * @return PLainObject
 * @docs
 * https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/geometry.Point.html
 * https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/GeocodeResult.html
 */
const useGeoObject = (geoObject) => {
  const administrativeAreas = geoObject.getAdministrativeAreas();
  const localities = geoObject.getLocalities();

  return {
    /**
     * @var {array<int>} coords
     */
    coords: geoObject.geometry.getCoordinates(),

    /**
     * @var {string|null} country
     * Государство, которому принадлежит топоним (если применимо).
     */
    country: geoObject.getCountry(),

    /**
     * @var {string|null} country_code
     * Код государства, которому принадлежит топоним (если применимо),
     * в виде двухбуквенного кода ISO 3166.
     */
    country_code: geoObject.getCountryCode(),

    /**
     * @var {array<string>} administrative_areas
     * Административно-территориальные образования,
     * в которые входит объект (федеральный округ, регион, район), не больше двух.
     */
    administrative_areas: administrativeAreas,

    /**
     * @var {string|null} region
     * Регион, область, край или штат
     */
    region: administrativeAreas[0],

    /**
     * @var {string|null} district
     * Округ, район и т.п.
     */
    district: administrativeAreas[1],

    /**
     * @var {array<string>} localities
     * Возвращает населённый пункт и, опционально,
     * образование внутри населённого пункта, которым принадлежит топоним.
     */
    localities: localities,

    /**
     * @var {string|null} locality
     * Город, поселок, деревня и т.п.
     */
    locality: localities[0],

    /**
     * @var {string|null} locality2
     * Образование внутри города, поселока, деревни и т.п.
     */
    locality2: localities[1],

    /**
     * @var {string|null} thoroughfare
     * Путь сообщения (улица, шоссе, проезд и т.д.),
     * которому принадлежит топоним (если применимо).
     */
    thoroughfare: geoObject.getThoroughfare(),

    /**
     * @var {string|null} premise
     * Наименование здания, если оно есть (например, название терминала аэропорта).
     */
    premise: geoObject.getPremise(),

    /**
     * @var {string|null} premise_number
     * Номер здания (включая корпус, владение и прочие дополнительные признаки).
     */
    premise_number: geoObject.getPremiseNumber(),

    /**
     * @var {string} address_line
     * Строка с адресом объекта.
     */
    address_text: geoObject.getAddressLine(),
  };
};

const useMap = (props) => {
  const { events, onInit, onError, onMapZoom, onPlacemarkDragEnd } = {
    ...defaultMapProps,
    ...props,
  };

  const pstate = { ...defaultMapProps.state, ...props.state };
  const poptions = { ...defaultMapProps.options, ...props.options };

  var Map;

  const init = (container) => {
    return new Promise((resolve, reject) => {
      try {
        Map = new ymaps.Map(container, pstate, poptions);

        for (let ev in events) {
          Map.events.add(ev, events[ev]);
        }

        Map.events.add("boundschange", (event) => {
          if (event.get("newZoom") !== event.get("oldZoom")) {
            onMapZoom && onMapZoom(event);
          }
        });

        resolve();
        onInit && onInit();
      } catch (error) {
        reject(error);
        onError && onError(error);
      }
    });
  };

  const setPoints = (points) => {
    points?.forEach(setPoint);
  };

  const setPoint = ({ position, placemark, alignCenter }) => {
    const Placemark = new ymaps.Placemark(position, placemark[0], placemark[1]);
    Placemark.events.add("dragend", (event) => {
      onPlacemarkDragEnd && onPlacemarkDragEnd(event);
    });

    Map.geoObjects.add(Placemark);

    if (alignCenter) {
      Map.setCenter(position, Map.getZoom(), {
        duration: 500,
        ...alignCenter,
      });
    }

    return Placemark;
  };

  const removePoint = (object) => {
    Map.geoObjects.remove(object);
  };

  return {
    Map,
    init,
  };
};

const useGeolocation = (props) => {
  props = { ...defaultGeolocationProps, ...props };

  const { onBefore, onSuccess, onError } = props;
  const [state, setState] = useState({ status: "" });

  const handleBefore = () => {
    setState({ status: "pending" });
    onBefore && onBefore();
  };

  const handleSuccess = (result) => {
    let geoObject = result.geoObjects.get(0);
    let position = geoObject.geometry.getCoordinates();
    let _result = { geoObject, position };

    setState({
      status: "complete",
      result: _result,
    });

    onSuccess && onSuccess(_result);
    return _result;
  };

  const handleError = (error) => {
    setState({ status: "error", error });
    onError && onError(error);

    throw new Error(error.message);
  };

  const get = () => {
    handleBefore();
    return ymaps.geolocation.get(props).then(handleSuccess).catch(handleError);
  };

  return {
    get,
    status: state.status,
    result: state.result,
    error: state.error,
  };
};

const useSuggest = (options) => {
  options = {
    ...defaultSuggestOptions,
    ...options,
  };

  const { results, boundedBy, provider, onBefore, onComplete, onError } =
    options;
  const [state, setState] = useState({ status: "none" });

  const handleBefore = (request) => {
    setState({ status: "pending" });
    onBefore && onBefore({ request, options });
  };

  const handleComplete = (items) => {
    setState({ status: "complete", items });
    onComplete && onComplete(items);

    return items;
  };

  const handleError = (error) => {
    setState({ status: "error", error });
    onError && onError(error);
  };

  const request = (request, options = {}) => {
    handleBefore(request);
    return ymaps
      .suggest(request, { results, boundedBy, provider, ...options })
      .then(handleComplete, handleError);
  };

  return {
    state,
    request,
  };
};

const Map = (props) => {
  const { children, ErrorFallback, className, height, width, style } = props;
  const ref = React.useRef();
  const map = useMap(props);

  useEffect(() => {
    map.init(ref.current);
  }, []);

  return (
    <ErrorBoundary ErrorFallback={ErrorFallback}>
      <MapContainer ref={ref} height={"100%"}>
        {children}
      </MapContainer>
    </ErrorBoundary>
  );
};

const GeolocationView = (props) => {
  const {
    fallback,
    children,
    geolocation,
    enabled,
    ErrorComponent = () => <></>,
    onComplete,
    onError,
  } = props;

  const getGeolocation = () => {
    geolocation.get().then(onComplete).catch(onError);
  };

  useEffect(() => {
    if (enabled) {
      getGeolocation();
    }
  }, [enabled]);

  switch (geolocation.status) {
    case "pending":
      return fallback;

    case "complete":
      return children;

    case "error":
      return <ErrorComponent error={geolocation.error} />;
  }

  return <></>;
};

const SuggestView = (props) => {
  const { children, timeout, onSelect } = {
    ...defaultSuggestViewProps,
    ...props,
  };

  const suggest = useSuggest(props);
  const [items, setItems] = React.useState([]);
  const parentRef = React.createRef();
  const inputRef = React.useMemo(() => {
    return { current: null };
  }, []);

  const clearItems = () => {
    setItems([]);
  };

  const getSuggest = (request) => {
    if (request.trim() !== "") {
      suggest
        .request(request, props)
        .then((items) => setItems(items))
        .catch((error) => {
          throw new Error(error.message);
        });
    } else {
      clearItems();
    }
  };

  var timeoutId;
  const handleInput = (event) => {
    let _this = event.currentTarget;

    clearTimeout(timeoutId);
    setTimeout(() => {
      getSuggest(_this.value);
    }, timeout);
  };

  const handleBlur = (event) => {
    setTimeout(clearItems, 100);
  };

  const handleFocus = (event) => {
    let _this = event.target;
    getSuggest(_this.value);
  };

  const handleSelectItem = (item, event) => {
    event.preventDefault();

    inputRef.current.value = item.value;
    inputRef.current.focus();

    onSelect && onSelect(item, event);
  };

  const ListItem = (props) => {
    const { displayName } = props;

    return (
      <Dropdown.Item onClick={(event) => handleSelectItem(props, event)}>
        <RawHTML>{displayName}</RawHTML>
      </Dropdown.Item>
    );
  };

  const ListView = (props) => {
    return (
      <Dropdown show={items.length > 0}>
        <Dropdown.Menu
          style={{
            top: -13,
            borderTop: "none",
            borderRadius: "0 0 4px 4px",
            width: "100%",
          }}
        >
          {items.map((item, index) => (
            <ListItem key={index} {...item} />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const addEvents = () => {
    inputRef.current = parentRef.current.querySelector("input");

    inputRef.current.addEventListener("input", handleInput, false);
    inputRef.current.addEventListener("focus", handleFocus, false);
    inputRef.current.addEventListener("blur", handleBlur, false);
  };

  useEffect(() => {
    addEvents();
  }, []);

  return (
    <div ref={parentRef}>
      {children}
      <ListView />
    </div>
  );
};

const AddressInput = React.forwardRef((props, ref) => {
  return (
    <SuggestView {...props.suggest}>
      <div style={{ position: "absolute", zIndex: 12323, top: 10, left: 10 }}>
        <Icon name="search" size="1.2em" />
      </div>

      <Form.Control ref={ref} {...props.input} style={{ paddingLeft: 33 }} />
    </SuggestView>
  );
});

const MapContainer = React.forwardRef((props, ref) => {
  const { className, height, width, style } = props;
  return (
    <div
      {...props}
      ref={ref}
      className={
        "ymaps-map bg-light d-flex align-items-center" +
        (className ? ` ${className}` : "")
      }
      style={{ width, height, ...style }}
    ></div>
  );
});

const InputAddress = () => <></>;

export {
  useMaps,
  useRoute,
  useGeocode,
  useMap,
  useSuggest,
  useGeolocation,
  useGeoObject,
  Maps,
  Map,
  SuggestView,
  GeolocationView,
  AddressInput,
  InputAddress,
  MapContainer,
};
