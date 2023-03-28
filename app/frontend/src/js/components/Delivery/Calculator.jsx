import React from "react";

const defaultProps = {
  startPoint: 0,
  startPointPlacemark: [
    { iconContent: "Склад" },
    { preset: "islands#blueStretchyIcon", draggable: false },
  ],
  finishPointPlacemark: [
    { iconContent: "Точка доставки", balloonContentHeader: "Пункт назначения" },
    { preset: "islands#redStretchyIcon", draggable: true },
  ],
  routeLine: {
    strokeWidth: 5,
    strokeColor: "0000ffff",
    opacity: 0.5,
  },
};

const useCalculator = (props = {}) => {
  props = { ...defaultProps, ...props };

  const {
    startPoint,
    beforeSetStartPoint,
    beforeSetFinishPoint,
    startPointPlacemark,
    finishPointPlacemark,
    afterSetFinishPoint,
    afterSetStartPoint,
  } = props;

  const maps = useMaps({});

  const calculateRoute = async () => {
    const router = await request("route", coords, {
      mapStateAutoApply: true,
      routingMode: "auto",
    });

    distance = Math.floor(router.getLength() / 1000);
    distance_m = Math.round(router.getLength()) / 1000;
  };

  return {};
};

const useCalculator_ = (props = {}) => {
  props = { ...defaultProps, ...props };

  const {
    startPoint,
    beforeSetStartPoint,
    beforeSetFinishPoint,
    startPointPlacemark,
    finishPointPlacemark,
    afterSetFinishPoint,
    afterSetStartPoint,
    onMapClick,
  } = props;

  var finishPoint;

  const init = () => {
    if (startPoint) {
      //   setStartPoint(startPoint);
    }

    // map.events.add("click", onClick);
  };

  const setStartPoint = async (coords) => {
    if (!beforeSetStartPoint({ coords, startPoint, finishPoint })) {
      return false;
    }

    if (startPoint) {
      startPoint.geometry.setCoordinates(coords);
    } else {
      startPoint = new ymaps.Placemark(
        coords,
        startPointPlacemark[0],
        startPointPlacemark[1]
      );

      //   map.geoObjects.add(startPoint);
    }

    // map.setCenter(coords, map.getZoom(), {
    //   duration: 500,
    // });

    var result = await request("geocode", position, { results: 1 });
    if (!result) {
      return false;
    }

    startGeoObject = result.geoObjects.get(0);
    if (!startGeoObject) {
      return false;
    }

    afterSetStartPoint({ coords, startPoint, finishPoint });

    return true;
  };

  const setFinishPoint = async (coords) => {
    if (
      !beforeSetFinishPoint({ coords, startPoint, finishPoint, startGeoObject })
    ) {
      return false;
    }

    if (finishPoint) {
      finishPoint.geometry.setCoordinates(coords);
    } else {
      finishPoint = new ymaps.Placemark(
        coords,
        finishPointPlacemark[0],
        finishPointPlacemark[1]
      );

      finishPoint.events.add("dragend", function (e) {
        onFinishDragEnd(e);
      });

      //   map.geoObjects.add(this._finishPoint);
    }

    map.setCenter(coords, this._map.getZoom(), {
      duration: 500,
    });

    if (startPoint) {
      var result = await request("geocode", coords, {
        results: 1,
      });
      if (!result) {
        return false;
      }

      finishGeoObject = result.geoObjects.get(0);
      if (!finishGeoObject) {
        return false;
      }

      var addressText = finishGeoObject.properties.get("text") || "";
      var coords = finishGeoObject.geometry.getCoordinates() || [];

      finishPoint.properties.set({
        balloonContentBody: addressText,
        balloonContentFooter: "Координаты: " + coords.join(", "),
      });

      setupRoute();
    }

    afterSetFinishPoint({ coords, startPoint, finishPoint, startGeoObject });

    return true;
  };

  const setupRoute = async () => {
    if (route) {
      map.geoObjects.remove(route);
    }

    if (!startPoint || !finishPoint) {
      return false;
    }

    var coords = [
      startPoint.geometry.getCoordinates(),
      finishPoint.geometry.getCoordinates(),
    ];

    if (
      !beforeSetRoute({
        coords,
        startPoint,
        startGeoObject,
        finishPoint,
        finishGeoObject,
      })
    ) {
      return false;
    }

    // $(".site-map-preloader").addClass("show");

    router = await request("route", coords, {
      mapStateAutoApply: true,
      routingMode: "auto",
    });

    // $(".site-map-preloader").removeClass("show");

    if (!router) {
      return false;
    }

    distance = Math.floor(router.getLength() / 1000);
    distance_m = Math.round(router.getLength()) / 1000;

    route = router.getPaths();
    route.options.set(routeLine);
    map.geoObjects.add(route);

    finishPoint.properties.set({
      balloonContentFooter:
        finishPoint.properties.get("balloonContentFooter") +
        " Расстояние: " +
        distance_m +
        "км.",
    });

    var routePaths = [];
    route.each(function (path) {
      routePaths = Array.prototype.concat(
        routePaths,
        path.geometry.getCoordinates()
      );
    });

    afterSetRoute();
    return true;
  };

  const onClick = (event) => {
    if (startPoint) {
      setFinishPoint(event.get("coords"));
      click(finishPoint);
    }
  };

  const onFinishDragEnd = (event) => {
    if (finishPoint) {
      setFinishPoint(finishPoint.geometry.getCoordinates());
      dragend(finishPoint);
    }
  };

  const clearFinishPoint = () => {
    if (finishPoint) {
      map.geoObjects.remove(finishPoint);
      finishPoint = null;
      clearRoute();
    }
  };

  const clearRoute = () => {
    if (route) {
      map.geoObjects.remove(route);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return {};
};

export { useCalculator };
