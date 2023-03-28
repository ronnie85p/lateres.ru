import React, { useEffect, useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Placeholder from "react-bootstrap/Placeholder";

import Context from "@js/contexts/context";
import { sendRequest, useRequest, Suspense } from "@js/components/Request";
import RawHTML from "@js/components/RawHTML";
import Icon from "@js/components/Icon";
import { useForm, Form } from "@js/components/Form";
import { useModal, Modal } from "@js/components/Modal";
import { useMaps } from "@js/components/Yandex/Maps";

const FormPage = (props) => {
  const { children } = props;
  const context = useContext(Context);
  const [response, setResponse] = useState(null);
  const [delivery, setDelivery] = useState();

  const form = useForm({
    actionRequest: (data) =>
      sendRequest("web/ordering/create", data, { return: "data" }),
    initialValues: {},
    onSubmit: (values, methods) => {
      console.log("[useForm] onsubmit", values, methods);

      return true;
    },
  });

  const fetchData = async () => {
    const response = await sendRequest(
      "web/ordering/get",
      {},
      { return: "data" }
    );

    setResponse(response);
    setDelivery(response?.settings?.delivery);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!response) {
    return <>Loading</>;
  }

  if (!response.success) {
    return response.message;
  }

  return (
    <>
      <Form>
        <Row>
          <Col>
            <Container>
              <div className="d-flex">
                {Object.values(response?.deliveries || {}).map((item) => (
                  <div
                    className="mr-4"
                    key={item.id}
                    style={{
                      cursor: "pointer",
                      opacity: delivery === item.id ? 1 : 0.9,
                      fontWeight: delivery === item.id ? "bolder" : "",
                    }}
                    onClick={() => setDelivery(item.id)}
                  >
                    <Image src={item.logo} width="35" />
                    <span className="flex-fill ml-2 fs-6">{item.name}</span>
                  </div>
                ))}
              </div>

              <Section>
                <Delivery
                  work_times={response?.work_times}
                  object={response?.deliveries[delivery]}
                  address={response?.address}
                  delivery_car_id={response?.delivery_car_id}
                />
              </Section>

              <Divider />

              <Section>
                <Recipient {...response?.recipient} />
              </Section>

              <Divider />

              <Section>
                <Comment />
              </Section>

              <div className="mb-4"></div>
            </Container>

            <div className="h5 mt-2x">Товары</div>
            <Products className="mb-2x" {...response} />

            <Payments {...response} />
          </Col>

          <Col md={4}>
            <div className="sticky-top offset-top-1">
              <Card>
                <Card.Body>
                  <SummaryLayer />
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};

// ----------------- Delivery -----------------
// const Delivery = (props) => {
//   const { object = {} } = props;
//   const { id, description } = object;

//   const components = {
//     1: (props) => <DeliveryPickup {...props} />,
//     2: (props) => <DeliveryCompany {...props} />,
//   };

//   const Component = components[id];

//   return (
//     <>
//       <div className="mb-2x">{description}</div>

//       {Component ? <Component {...props} /> : <></>}
//     </>
//   );
// };

// const DeliveryPickup = (props) => {
//   const { object, work_times } = props;

//   return (
//     <>
//       <Row>
//         <Col md={4}>
//           <DeliveryTime times={work_times} label="Дата и время получения" />
//         </Col>
//       </Row>
//     </>
//   );
// };

// const DeliveryCompany = (props) => {
//   const { object, delivery_car, work_times, address } = props;

//   return (
//     <>
//       <Address object={address} />
//       <Divider />

//       <DeliveryCarLayer {...props} object={delivery_car} />

//       <Row className="mt-2x">
//         <Col md={4}>
//           <DeliveryTime times={work_times} label="Дата и время доставки" />
//         </Col>
//       </Row>
//     </>
//   );
// };

const DeliveryCarLayer = (props) => {
  const { delivery_car_id } = props;
  const [object, setObject] = useState(props.object);

  const modal = useModal({
    titleText: "Выберите транспорт",
    titleIcon: "truck",
    minBodyHeight: 350,
  });

  const handlerClick = async (e) => {
    modal.open();

    modal.setBody(() => {
      return () => <div>Loading</div>;
    });

    const results = await getDeliveryCars();

    modal.setBody(() => {
      return () => (
        <>
          <CarsList list={results} />

          <div className="mt-2x text-muted" style={{ fontSize: ".8em" }}>
            W - Грузоподьемность <RawHTML>&bull;</RawHTML> L - Длина борта
          </div>
        </>
      );
    });
  };

  const CarsList = (props) => {
    const { list } = props;
    const [carActive, setCarActive] = useState();

    const handleClick = async (car_id) => {
      let distance = 5;

      setCarActive(car_id);

      try {
        let calculated = await getDeliveryCost({ distance, car_id });

        await saveDeliveryData({
          delivery_car_id: car_id,
          delivery_cost: calculated.cost,
          delivery_cars: calculated.cars,
          delivery_car_cost: calculated.car_cost,
          delivery_is_min_cost: calculated.is_min_cost,
        });

        getDeliveryCar(car_id);

        modal.close();
      } catch (e) {
        console.log("error", e);
      }
    };

    return (
      <>
        {list?.map((item) => (
          <CarItem
            {...item}
            key={item.id}
            active={carActive === item.id}
            onClick={() => handleClick(item.id)}
          />
        ))}
      </>
    );
  };

  const getDeliveryCar = async (id) => {
    let response = await sendRequest(
      "web/delivery/car/get",
      { id },
      {
        return: "data",
      }
    );

    if (response.success === false) {
      throw new Error(response.message);
    }

    setObject(response.object);
  };

  const getDeliveryCost = async (data) => {
    let response = await sendRequest("web/delivery/calculate", data, {
      return: "data",
    });

    if (response.success === false) {
      throw new Error(response.message);
    }

    return response.object;
  };

  const saveDeliveryData = async (data) => {
    let response = await sendRequest("web/ordering/save", data, {
      return: "data",
    });

    if (response.success === false) {
      throw new Error(response.message);
    }

    return response;
  };

  const CarItem = (props) => {
    const { name, description, image, weight, length, onClick, active } = props;

    return (
      <>
        <Card
          className={"mb-2" + (active ? " bg-primary text-white" : "")}
          style={{ cursor: "pointer" }}
          onClick={onClick}
        >
          <Card.Body className="d-flex">
            <Image src={image} width={80} />
            <div className="flex-fill">
              <div className="fs-6">{name}</div>
              <div className={active ? "text-white" : "text-muted"}>
                {description}
              </div>
              <div className="mt-2">
                W {weight} кг <RawHTML>&bull;</RawHTML> L {length} м
              </div>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  };

  const getDeliveryCars = async () => {
    const response = await sendRequest(
      "web/delivery/car/getList",
      {},
      { return: "data" }
    );

    return response.results;
  };

  useEffect(() => {
    if (delivery_car_id) {
      console.log("del car id", delivery_car_id);
      getDeliveryCar(delivery_car_id);
    }
  }, []);

  return (
    <>
      <Modal {...modal} />

      {object ? (
        <DeliveryCar object={object} onClick={handlerClick} />
      ) : (
        <Button variant="outline-primary" onClick={handlerClick}>
          Выберите транспорт
        </Button>
      )}
    </>
  );
};

const DeliveryCar = (props) => {
  const { object = {}, onClick } = props;
  const { name, description, image, length, weight } = object;

  return (
    <>
      <Section onClick={onClick}>
        <Title>Транспорт</Title>

        <Row className="mt-3">
          <Col className="mr-4" md={2}>
            <Image src={image} />
          </Col>
          <Col>
            <div className="fs-6 mb-2">{name}</div>
            <div className="text-muted">{description}</div>
          </Col>
          <Col>
            <div className="rounded border border-secondary p-2">
              <div className="mb-2">Грузоподьемность до {weight} кг</div>
              <div>Длина борта {length}</div>
            </div>
          </Col>
        </Row>
      </Section>
    </>
  );
};

// const DeliveryTime = (props) => {
//   const { label, selectDefaultOption = "чч:мм", times } = props;

//   const Option = ({ value }) => {
//     return <option value={value}>{value}</option>;
//   };

//   return (
//     <>
//       <Form.Group className="mb-0">
//         <Form.Label htmlFor="delivery_datetime">{label}</Form.Label>
//         <InputGroup>
//           <Form.Control
//             name="delivery_date"
//             type="date"
//             min=""
//             style={{ width: "40%" }}
//           />

//           <Form.Select name="delivery_time">
//             <option value="0">{selectDefaultOption}</option>

//             {times?.map((time) => (
//               <Option key={time} value={time} />
//             ))}
//           </Form.Select>
//         </InputGroup>
//       </Form.Group>
//     </>
//   );
// };
// END ----------------- Delivery -----------------

// ----------------- Address -----------------
// const Address = (props) => {
//   const request = useRequest({
//     action: "web/profile/address/get",
//   });

//   const Comment = ({ text }) => {
//     return (
//       <>
//         <div className="text-muted">
//           <div className="fst-italic">{text}</div>
//         </div>
//       </>
//     );
//   };

//   const { comment, text } = request.response?.object || {};

//   return (
//     <>
//       <Title>Адрес доставки</Title>

//       <Suspense request={request} FallbackComponent={() => <>Loading...</>}>
//         <Row className="mb-2">
//           <Col>
//             <div className="d-flex text-muted">
//               <Icon name="geo-alt" className="mr-3 mt-1" />
//               <div>{text}</div>
//             </div>
//           </Col>
//           <Col className="text-end" md={2}>
//             <a href="#">Изменить</a>
//           </Col>
//         </Row>

//         {comment ? <Comment text={comment} /> : <></>}

//         <AddressDistance />
//       </Suspense>
//     </>
//   );
// };

// const AddressDistance = (props) => {
//   const [reflect, setReflect] = useState({ state: "pending" });
//   const maps = useMaps({
//     async onReady() {
//       setReflect({ state: "pending" });

//       const router = await maps.getRouter(
//         [56.2213078, 36.9487177],
//         [54.2213078, 36.9487177]
//       );

//       if (!router) {
//         throw new Error("Расстояние не определено");
//       }

//       let distance = maps.getRouterLength(router);
//       setReflect({ state: "done", distance });
//     },
//     onError(error) {
//       setReflect({ state: "error", error });
//     },
//   });

//   if (reflect.state === "pending") {
//     return <>Вычисляем расстояние...</>;
//   }

//   if (reflect.state === "error") {
//     return <>{reflect.error.message}</>;
//   }

//   return (
//     <>
//       <div className="">До склада: {reflect.distance} км</div>
//     </>
//   );
// };
// END ----------------- Address -----------------

// ----------------- Recipient -----------------
// const Recipient = (props) => {
//   const { fullname, mobilephone, user_type } = props;

//   return (
//     <>
//       <Title>Получатель</Title>

//       <Row className="">
//         <Col>
//           <div className="d-flex fs-6 mb-3">
//             <Icon name="person-circle" className="mr-3 mt-1" />{" "}
//             <div>
//               {fullname}
//               {mobilephone ? `, ${mobilephone}` : ""}
//             </div>
//           </div>

//           {user_type === 1 ? <RecipientCompany {...props} /> : <></>}
//         </Col>
//         <Col md={2} className="text-end">
//           <a href="#">Изменить</a>
//         </Col>
//       </Row>
//     </>
//   );
// };

// const RecipientCompany = (props) => {
//   const { company, delivery_cars } = props;

//   const Address = () => {
//     return (
//       <>
//         {company.address_text !== "" ? (
//           <>
//             <div className="d-flex text-muted">
//               <Icon name="geo-alt" className="mr-3 mt-1" />{" "}
//               <div>{company.address_text}</div>
//             </div>
//           </>
//         ) : (
//           <></>
//         )}
//       </>
//     );
//   };

//   return (
//     <>
//       {company ? (
//         <>
//           <div className="d-flex text-muted mb-1">
//             <Icon name="house-exclamation" className="mr-3 mt-1" />{" "}
//             <div>{company.text}</div>
//           </div>

//           <Address />
//         </>
//       ) : (
//         <>
//           <div className="text-danger">Добавить организацию</div>
//         </>
//       )}
//     </>
//   );
// };

// END ----------------- Recipient -----------------

// const Comment = (props) => {
//   return (
//     <>
//       <Form.Group>
//         <Form.Label htmlFor="comment">Комментарий</Form.Label>

//         <Form.Control
//           as="textarea"
//           name="comment"
//           placeholder="Leave a comment here"
//           style={{ height: "100px" }}
//         />
//       </Form.Group>
//     </>
//   );
// };

// ---------------- Payments ----------------
// const Payments = (props) => {
//   const { settings } = props;
//   const [active, setActive] = useState(settings.payment);

//   const activeClasses = "bg-light border-primary"; //"bg-primary text-white";
//   const inActiveClasses = "bg-white";

//   const request = useRequest({
//     action: "web/delivery/payment/getList",
//     data: {
//       delivery_id: settings.delivery,
//     },
//   });

//   const Item = (props) => {
//     const { active, logo, name, onClick } = props;
//     const classes = active ? activeClasses : inActiveClasses;

//     return (
//       <>
//         <Col md={3}>
//           <div
//             className={
//               "rounded border p-2 d-flex align-items-center " + classes
//             }
//             style={{ cursor: "pointer", height: 50 }}
//             onClick={onClick}
//           >
//             <Image src={logo} />
//             <div className="payment-name">{name}</div>
//           </div>
//         </Col>
//       </>
//     );
//   };

//   const handleClick = (id) => {
//     setActive(id);

//     sendRequest("web/ordering/save", {
//       payment_id: id,
//     });
//   };

//   const getPayments = () => {
//     request.send();
//   };

//   useEffect(() => {
//     getPayments();
//   }, [settings.delivery]);

//   const payments = request.response?.results;

//   return (
//     <>
//       <Title className="h4">Cпособ оплаты</Title>

//       <Container>
//         {request.isPending ? <>Loading...</> : <></>}

//         {request.isSuccess ? (
//           <>
//             <Row className="mb-4">
//               {payments?.map((item) => (
//                 <Item
//                   key={item.id}
//                   {...item}
//                   active={active === item.id}
//                   onClick={() => handleClick(item.id)}
//                 />
//               ))}
//             </Row>

//             <PaymentInfo id={active} />
//           </>
//         ) : (
//           <></>
//         )}
//       </Container>
//     </>
//   );
// };

// const PaymentInfo = (props) => {
//   const { id } = props;
//   const [reflect, setReflect] = useState({});

//   const getPayment = async () => {
//     setReflect({ state: "pending" });
//     const response = await sendRequest(
//       "web/payment/get",
//       { id },
//       { return: "data" }
//     );

//     if (response.success === false) {
//       throw new Error(response.message);
//     }

//     setReflect({ state: "done", object: response.object });
//   };

//   useEffect(() => {
//     try {
//       getPayment();
//     } catch (error) {
//       setReflect({ state: "error", error });
//     }
//   }, [id]);

//   if (reflect.state === "pending") {
//     return <>Pending...</>;
//   }

//   if (reflect.state === "error") {
//     return <>{reflect.error.message}</>;
//   }

//   const components = {
//     1: PaymentCardInfo,
//     2: PaymentCashInfo,
//     3: PaymentNoCashInfo,
//   };

//   const Component = components[reflect?.object?.id];

//   return <>{Component ? <Component {...reflect?.object} /> : <></>}</>;
// };

// const PaymentCardInfo = (props) => {
//   const { description } = props;

//   return <div className="">{description}</div>;
// };

// const PaymentCashInfo = (props) => {
//   const { description } = props;

//   return <div className="">{description}</div>;
// };

// const PaymentNoCashInfo = (props) => {
//   const { description, settings } = props;
//   const [pending, setPending] = useState(false);
//   const [active, setActive] = useState(settings?.payment_nocash_variant);
//   const [error, setError] = useState(null);

//   const methods = [
//     {
//       id: 1,
//       name: "С НДС",
//       checked: true,
//     },

//     {
//       id: 2,
//       name: "Без НДС",
//     },
//   ];

//   const handleChange = async (event) => {
//     const number = parseInt(event.currentTarget.value);
//     setActive(number);

//     try {
//       setPending(true);

//       const response = await sendRequest(
//         "web/ordering/save",
//         {
//           payment_nocash_variant: number,
//         },
//         { return: "data" }
//       );

//       if (response.success === false) {
//         throw new Error(response.message);
//       }
//     } catch (error) {
//       setError(error);
//     }

//     setPending(false);
//   };

//   return (
//     <div className="">
//       <div className="mb-2">{description}</div>

//       {methods.map((item) => (
//         <Form.Check
//           type="radio"
//           name="nocash_method"
//           key={item.id}
//           id={item.id}
//           label={item.name}
//           value={item.id}
//           checked={item.id === active}
//           disabled={pending}
//           onChange={handleChange}
//         />
//       ))}
//     </div>
//   );
// };

// END ---------------- Payments ----------------

// ---------------- Products ----------------
// const Products = (props) => {
//   const { cart } = props;

//   return (
//     <div {...props}>
//       {cart?.map((item) => (
//         <ProductItem {...item} key={item.id} />
//       ))}
//     </div>
//   );
// };

// const ProductItem = (props) => {
//   const {
//     id,
//     image,
//     name,
//     price,
//     currency_html_code,
//     count,
//     count_unit,
//     weight,
//     weight_unit,
//     cost,
//   } = props;

//   return (
//     <>
//       <div className="rounded bg-white p-2 mb-2">
//         <Row>
//           <Col className="d-flex">
//             <Image className="mr-4" src={image} width="50px" rounded />
//             <div>
//               <div className="fs-6 mb-2">{name}</div>
//               <div>
//                 Цена {price} <RawHTML>{currency_html_code}</RawHTML> x {count}{" "}
//                 {count_unit}
//               </div>
//             </div>
//           </Col>

//           <Col className="d-flex align-items-center justify-content-end" md={4}>
//             <div>
//               <div className="text-muted">
//                 Вес {weight} {weight_unit}
//               </div>
//               <div className="fs-6 fw-bolder mt-2">
//                 = {cost} <RawHTML>{currency_html_code}</RawHTML>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// };
// ---------------- Products ----------------

// ---------------- Summary ----------------
const SummaryLayer = (props) => {
  const request = useRequest({
    action: "web/ordering/summary",
  });

  const getSummary = () => {
    request.send();
  };

  useEffect(() => {
    getSummary();
  }, []);

  if (request.isPending) {
    return <>Pending...</>;
  }

  if (request.isError) {
    return <>{request.error.message}</>;
  }

  return <Summary {...request.response} />;
};

// const Summary = (props) => {
//   const {
//     old_cart_cost,
//     cart_cost,
//     delivery_cost,
//     sales_tax,
//     cost,
//     discount,
//     weight,
//     weight_unit,
//     count,
//     items_count,
//     currency_html,
//   } = props;

//   return (
//     <div className="">
//       <Row className="mb-4">
//         <Col md="8">
//           <div className="fw-bolder fs-3 text-dark">Ваш заказ</div>
//         </Col>
//         <Col className="d-flex align-items-end justify-content-end">
//           {items_count} <RawHTML>&nbsp;&bull;&nbsp;</RawHTML> {weight}{" "}
//           {weight_unit}
//         </Col>
//       </Row>

//       <Row className="mb-1 fs-6">
//         <Col md="6">Товары</Col>
//         <Col md="6 text-end">
//           {old_cart_cost} <RawHTML>{currency_html}</RawHTML>
//         </Col>
//       </Row>

//       <Row className="text-danger mb-1 fs-6">
//         <Col md="6">Скидка</Col>
//         <Col md="6 text-end">
//           -{discount} <RawHTML>{currency_html}</RawHTML>
//         </Col>
//       </Row>

//       <Row className="mb-4 fs-6">
//         <Col md="6">Налог</Col>
//         <Col md="6 text-end">
//           {sales_tax > 0 ? (
//             <>
//               {sales_tax} <RawHTML>{currency_html}</RawHTML>
//             </>
//           ) : (
//             "Без НДС"
//           )}
//         </Col>
//       </Row>

//       <Row className="mb-4 fs-6">
//         <Col md="6">Доставка</Col>
//         <Col md="6 text-end">
//           {delivery_cost > 0 ? (
//             <>
//               {delivery_cost} <RawHTML>{currency_html}</RawHTML>
//             </>
//           ) : (
//             0
//           )}
//         </Col>
//       </Row>

//       <hr className="" />

//       <Row className="fw-bolder fs-4">
//         <Col md="6">Итого</Col>
//         <Col md="6 text-end">
//           {cost} <RawHTML>{currency_html}</RawHTML>
//         </Col>
//       </Row>

//       <Button className="btn-block btn-lg" variant="primary" type="submit">
//         Сделать заказ
//       </Button>

//       <div className="mt-2 text-muted">
//         Нажимая на кнопку, вы соглашаетесь с Условиями обработки перс. данных, а
//         также с Условиями продажи
//       </div>
//     </div>
//   );
// };
// END ---------------- Summary ----------------

// ----------------- Components -----------------
const Container = (props) => {
  const { children } = props;

  return (
    <>
      <div className="shadow-sm rounded bg-white p-3 mb-2x" {...props}>
        {children}
      </div>
    </>
  );
};

const Section = (props) => {
  const { children } = props;

  return (
    <section className="mt-4" {...props}>
      {children}
    </section>
  );
};

// const Title = (props) => {
//   const { children } = props;

//   return (
//     <div className="h6" {...props}>
//       {children}
//     </div>
//   );
// };

const Divider = (props) => {
  return <hr {...props} />;
};

// END ----------------- Components -----------------

export default FormPage;
