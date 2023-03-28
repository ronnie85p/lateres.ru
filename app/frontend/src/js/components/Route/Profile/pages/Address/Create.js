import ReactDOM from "react-dom";

import {
  Card,
  Row,
  Col,
  InputGroup,
  ButtonGroup,
  Button,
  Form,
  Badge,
  Spinner,
  Image,
  Modal,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import { useForm } from "../../../../../../src/js/components/Form";
import { useYaMaps } from "../../../../../../src/js/components/YaMaps";

const { useEffect, useState, useReducer, createRef } = React;

const AddressCreatePage = (props) => {
  const [geolocationIsRunning, setGeolocationIsRunnning] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState({
    title: "Мой адрес",
    rank: 0,
    map_zoom: 5,
    coords: "",
    country: "Россия",
    country_code: "RU",
    region: "Москва и Московская область",
    district: "",
    city: "",
    street: "",
    building: "",
    comment: "",
  });

  const yaMaps = useYaMaps({
    onReady({ ymaps }) {
      console.log("[useYaMaps][onReady]", ymaps);
    },

    onError({ error }) {
      console.log("[useYaMaps][onError]", error);
      setError(error);
    },
  });

  const form = useForm({
    onSubmit() {
      console.log("submit");

      return false;
    },
  });

  const [modalShow, setModalShow] = useState(false);

  const {} = props;

  const showMap = (event) => {
    event.preventDefault();

    console.log("[showMap]");

    setModalShow(true);
  };

  const defineGeolocation = (event) => {
    event.preventDefault();
    setGeolocationIsRunnning(true);

    yaMaps.getGeolocation().then(
      (result) => {
        setAddress(yaMaps.fromGeoObject(result.geoObjects.get(0)));
        setGeolocationIsRunnning(false);
      },
      (error) => {
        console.log("[yaMaps.getGeolocation][error]", error);
        setError(error);
        setGeolocationIsRunnning(false);
      }
    );
  };

  useEffect(() => {
    yaMaps.ready();
  }, []);

  return (
    <>
      <Row>
        <Col md={8}>
          <Row className="mb-3">
            <Col className="">
              <Button
                disabled={!yaMaps.isReady}
                className="mr-2 btn-sm"
                onClick={showMap}
              >
                <Icon.Map /> Указать на карте
              </Button>

              <Button
                disabled={!yaMaps.isReady || geolocationIsRunning}
                className="btn-sm"
                onClick={defineGeolocation}
              >
                <Icon.Geo /> Мое местоположение
              </Button>
            </Col>
          </Row>

          <div className="bg-white mb-2 p-4 rounded">
            <Form onSubmit={form.submit} onKeyDown={form.preventInputSubmit}>
              <input
                type="hidden"
                name="map_zoom"
                defaultValue={address.map_zoom}
              />
              <input
                type="hidden"
                name="coords"
                defaultValue={address.coords}
              />
              <input
                type="hidden"
                name="address_text"
                defaultValue={address.address_text}
              />
              <input
                type="hidden"
                name="country"
                defaultValue={address.country}
              />
              <input
                type="hidden"
                name="country_code"
                defaultValue={address.country_code}
              />

              <Row>
                <Form.Group as={Col}>
                  <Form.Control
                    type="input"
                    name="title"
                    defaultValue={address.title}
                  />
                </Form.Group>
              </Row>

              <hr className="mb-2x" />

              <Row>
                <Form.Group as={Col} md={12} className="form-group">
                  <label htmlFor="region">
                    Регион<span className="text-danger">*</span>
                  </label>
                  <Form.Select name="region" disabled={geolocationIsRunning}>
                    <option value={address.region}>{address.region}</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} md={12} className="form-group">
                  <label htmlFor="district">Район</label>
                  <Form.Control
                    disabled={geolocationIsRunning}
                    type="input"
                    name="district"
                    defaultValue={address.district}
                    placeholder="Например: Солнечногорский район"
                  />
                </Form.Group>

                <Form.Group as={Col} md={12} className="form-group">
                  <label htmlFor="city">
                    Населенный пункт<span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    disabled={geolocationIsRunning}
                    type="input"
                    name="city"
                    defaultValue={address.city}
                    placeholder="Например: Солнечногорск"
                  />
                </Form.Group>

                <Form.Group as={Col} md={10} className="form-group">
                  <label htmlFor="street">
                    Улица<span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    disabled={geolocationIsRunning}
                    type="input"
                    name="street"
                    defaultValue={address.street}
                    placeholder="Например: улица Баранова"
                  />
                </Form.Group>

                <Form.Group as={Col} md={2} className="form-group">
                  <label htmlFor="building">
                    Дом<span className="text-danger">*</span>
                  </label>
                  <Form.Control
                    disabled={geolocationIsRunning}
                    type="input"
                    name="building"
                    defaultValue={address.building}
                    placeholder=""
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md={12} className="form-group">
                  <label htmlFor="comment">Дополнительные инструкции</label>
                  <Form.Control
                    disabled={geolocationIsRunning}
                    as="textarea"
                    name="comment"
                    placeholder="Если необходимо, то предоставьте подробную информацию по доставке или оставьте комментарий"
                    maxLength={1500}
                    style={{ height: "100px" }}
                    defaultValue={address.comment}
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col}>
                  <Form.Check
                    inline
                    defaultChecked={address.rank === 0}
                    type="checkbox"
                    name="bydef"
                    id="bydef"
                    label={"По умолчанию"}
                    defaultValue={1}
                  />
                </Form.Group>
              </Row>

              <hr className="" />

              <Row>
                <Col className="text-center">
                  <Button
                    disabled={geolocationIsRunning}
                    type="submit"
                    variant="primary"
                  >
                    Сохранить
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>

          <AppModal
            show={modalShow}
            title={"Адрес доставки"}
            modalProps={{
              animation: false,
              fullscreen: true,
            }}
            onHide={() => setModalShow(false)}
          />
        </Col>
      </Row>
    </>
  );
};

const defaultProps = {
  title: "Title",
  titleIcon: "",
  content: "Content",
  headerProps: {
    closeButton: true,
  },
  titleProps: {},
  bodyProps: {},
  footerProps: {},
};

const AppModal = (props) => {
  const [isShown, setIsShown] = useState(false);

  const {
    show,
    title,
    titleIcon,
    content,
    modalProps,
    headerProps,
    titleProps,
    bodyProps,
    footerProps,
    onHide,
  } = { ...defaultProps, ...props };

  const handleHide = (event) => {
    handleDisplay(false);

    if (onHide) {
      onHide(event);
    }
  };

  const handleShow = (event) => {
    handleDisplay(true);
  };

  const handleDisplay = (show) => {
    setIsShown(show === true);
  };

  useEffect(() => {
    handleDisplay(show);
  }, [show]);

  return (
    <>
      <Modal {...modalProps} show={isShown} onHide={handleHide}>
        <Modal.Header {...headerProps}>
          <Modal.Title
            {...titleProps}
            className={
              "m-0" + (titleProps?.className ? " " + titleProps?.className : "")
            }
          >
            {titleIcon} {title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body {...bodyProps}>{content}</Modal.Body>

        <Modal.Footer {...footerProps}>
          <Button variant="outline-secondary" onClick={handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

/**
 * that.Message.warning(
                    '<i class="icon-alert-circle"></i>&nbsp;Вы запретили передачу Ваших геоданных сайту или Ваше местоположение не было определено!<br/>' + 
                    'Разрешите передачу Ваших геоданных сайту или укажите адрес вручную!'
                  );
 */

export default AddressCreatePage;
