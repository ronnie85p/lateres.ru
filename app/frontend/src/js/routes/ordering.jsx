import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Context from "@js/contexts/context";
import { useLocation, useParams, sendRequest } from "@js/components/Request";

import Preloader from "@js/components/Preloader";
import Form, { useForm } from "@js/components/Form";
import Container from "@js/components/Page/Container";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";

import Delivery from "@js/components/Routes/Ordering/Delivery";
import Recipient from "@js/components/Routes/Ordering/Recipient";
import Comment from "@js/components/Routes/Ordering/Comment";
import Summary from "@js/components/Routes/Ordering/Summary";
import Payments from "@js/components/Routes/Ordering/Payments";
import { OfferButton } from "@js/components/Routes/Ordering/Buttons";

export default (props) => {
  const context = React.useContext(Context);
  const [resource, data] = useLoaderData();

  return (
    <Context.Provider value={{ ...context, data: data.object }}>
      <Container className="ordering">
        <Title>
          <Title.Text>{resource.pagetitle}</Title.Text>
        </Title>

        {data.success ? <Content /> : data.message}
      </Container>
    </Context.Provider>
  );
};

const Content = (props) => {
  const context = React.useContext(Context);
  const params = { ...context.data.settings, ...useParams() };
  const { updateParams } = useLocation();
  const navigate = useNavigate();
  const [data, updateData] = React.useReducer(
    (state, action) => {
      let fields = action.fields || [];
      if (action.field) {
        fields.push(action.field);
      }

      let data = state;
      for (let i in fields) {
        let field = fields[i];
        if (field in state) {
          let value = action[field];
          data = { ...data, [field]: value };
        }
      }

      return data;
    },
    {
      total: {},
      error: null,
      preloader: false,
      status: "changing",
    }
  );

  const form = useForm({
    actionRequest: (values) => sendRequest("web/ordering/create", values),
    initialValues: {
      delivery_car: 0,
      ...params,
    },
    onSubmit(values) {
      console.log("[order] creating...", values);
      return true;
    },
    onSuccess({ object, success }) {
      if (success) {
        navigate(`/lk/order?id=${object.id}&status=success`);
      }
    },
  });

  const handleFieldChange = (event) => {
    let _this = event.currentTarget;

    form.handleChange(event);
    updateData({
      field: "status",
      status: "changing",
    });
    updateParams({ [_this.name]: _this.value });
  };

  const sendValidate = () => {
    updateData({ field: "preloader", preloader: true });
    return sendRequest("web/ordering/validate", form.values)
      .then((response) => {
        if (!response.success) {
          form.setResponseErrors(response.errors);
          form.setResponse(response);

          throw new Error(response.message);
        }
      })
      .finally(() => {
        updateData({ field: "preloader", preloader: false });
      });
  };

  React.useEffect(() => {}, [form.values]);

  return (
    <Context.Provider
      value={{
        ...context,
        order: context.data,
        params,
        data,
        form,
        updateData,
        updateParams,
        handleFieldChange,
        sendValidate,
      }}
    >
      <Preloader show={data.preloader === true || form.isSubmitting} />
      <Form onSubmit={form.handleSubmit}>
        <Row>
          <Col md={8}>
            <Form.Alert
              className="mb-2"
              variant={form.response.success ? "success" : "danger"}
              text={form.response.message}
            />

            <Layer>
              <div className="h6">Получатель</div>
              <Recipient />
              <hr />

              <div className="h6">Доставка</div>
              <Deliveries />
              <hr />

              <div className="h6">Комментарий</div>
              <Comment />
            </Layer>

            <Layer>
              <div className="h6">Способ оплаты</div>

              <Payments />
            </Layer>

            {/* <div className="h6">Товары</div> */}

            <Row className="mb-4">
              <Col className="text-end">
                <OfferButton />
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Summary />
          </Col>
        </Row>
      </Form>
    </Context.Provider>
  );
};

const Deliveries = (props) => {
  const { order, params, handleFieldChange } = React.useContext(Context);
  const delivery =
    order.deliveries.find((item) => item.id == params.delivery) ||
    order.deliveries[0];

  return (
    <>
      <Form.Group>
        {order.deliveries.map((item) => (
          <Form.Check
            type="radio"
            key={item.id}
            id={`delivery-${item.id}`}
            name="delivery"
            label={item.name}
            defaultValue={item.id}
            defaultChecked={delivery.id == item.id}
            onChange={handleFieldChange}
            inline
          />
        ))}
      </Form.Group>

      <Delivery {...delivery} />
    </>
  );
};
