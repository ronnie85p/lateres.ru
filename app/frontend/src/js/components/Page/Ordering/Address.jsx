import React, { useContext, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { Form } from "@js/components/Form";
import { FetchData, sendRequest, usePromise } from "@js/components/Request";
import {
  useMaps,
  Maps,
  Map,
  SuggestView,
  AddressInput,
} from "@js/components/Yandex/Maps";
import { ModalContainer, useModal } from "@js/components/Modal";

const useFetchAction = (props) => {
  const { loader } = props;
  const [state, setState] = React.useState({ status: "none" });

  const run = () => {
    const promise = loader();

    setState({ status: "pending" });
    promise
      .then((response) => setState({ status: "complete", response }))
      .catch((error) => setState({ status: "error", error }));
  };

  const response = () => {
    return state.response;
  };

  const error = () => {
    return state.error;
  };

  return { state, run, response, error };
};

const FetchLoader = (props) => {
  const { action, children, fallback, ErrorFallback } = props;

  React.useEffect(() => {
    console.log("run action", action);
    action.run();
  }, []);

  let component = <></>;
  if (action.state.status === "pending" && fallback) {
    component = fallback;
  }

  if (action.state.status === "complete") {
    component = children;
  }

  return (
    <ErrorBoundary ErrorFallback={ErrorFallback}>{component}</ErrorBoundary>
  );
};

const Address = (props) => {
  const { order } = useContext(Context);

  const modal = useModal({
    title: <>Адрес доставки</>,
    titleIcon: "geo-alt",
    animation: false,
    fullscreen: true,
    bodyClassName: "p-0",
    body: () => {
      return (
        <Maps fallback={<>Maps loading...</>}>
          <Map ErrorFallback={({ error }) => <>{error.message}</>}>
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 20,
                zIndex: 12356,
                width: "100%",
              }}
            >
              <Row>
                <Col md={5}>
                  <AddressInput name="address" suggest={{ enabled: true }} />
                </Col>
              </Row>
            </div>
          </Map>
        </Maps>
      );
    },
  });

  const handleMapClick = (event) => {
    event.preventDefault();

    modal.show();
  };

  return (
    <>
      <ModalContainer modal={modal} />

      <div className="">
        {order.address ? (
          <Row>
            <Col>
              <div className="mb-2">
                <Icon name="geo-alt" className="mr-2" /> {order.address.text}
              </div>
              <div>
                <a href="#" onClick={handleMapClick}>
                  Посмотреть маршрут
                </a>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            <a href="#">Указать адрес</a>
          </>
        )}
      </div>
    </>
  );

  const loader = () => sendRequest("web/profile/address/get");
  const Loading = <>Loading...</>;
  const ErrorFallback = ({ error }) => <>{error.message}</>;

  const Output = ({ data }) => {
    const { object } = data;

    return (
      <>
        <div className="mb-2">
          <Row>
            <Col>
              <div className="d-flex text-muted">
                <Icon name="geo-alt" className="mr-3 mt-1" />
                <div>{object.text}</div>
              </div>
            </Col>
            <Col className="text-end" md={2}>
              <a href="#">Изменить</a>
            </Col>
          </Row>

          <CalculateDistance
            startPoint={[56.2213078, 36.9487177]}
            finishPoint={[54.2213078, 36.9487177]}
          />
        </div>

        <Form.Group>
          <Form.Label htmlFor="address_comment">Детали</Form.Label>
          <Form.TextArea name="address_comment" defaultValue={object.comment} />
        </Form.Group>
      </>
    );
  };

  return (
    <FetchData loader={loader} Loading={Loading} ErrorFallback={ErrorFallback}>
      {(props) => <Output {...props} />}
    </FetchData>
  );
};

const CalculateDistance = (props) => {
  const { startPoint, finishPoint } = props;

  const maps = useMaps();
  const Loading = <>Вычисляем расстояние...</>;
  const ErrorFallback = ({ error }) => <>{error.message}</>;

  const Output = ({ data: router }) => {
    let distance = maps.getRouterLength(router);

    return (
      <>
        <div>
          До склада: ~ {distance} км{" "}
          <a className="text-danger" href="">
            <Icon name="info" />
          </a>
        </div>
      </>
    );
  };

  return (
    <FetchData
      loader={() => maps.init()}
      Loading={Loading}
      ErrorFallback={ErrorFallback}
    >
      <FetchData
        loader={() => maps.getRouter(startPoint, finishPoint)}
        Loading={Loading}
        ErrorFallback={ErrorFallback}
      >
        {(props) => <Output {...props} />}
      </FetchData>
    </FetchData>
  );
};

export { Address, CalculateDistance };
