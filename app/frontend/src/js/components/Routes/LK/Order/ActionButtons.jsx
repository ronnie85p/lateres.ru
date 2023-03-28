import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRequest, useNavigate } from "@js/components/Request";
import Button from "@js/components/Form/Button";
import Preloader from "@js/components/Preloader";

export default (props) => {
  const { status, id } = props;
  const navigate = useNavigate();
  const cancelRequest = useRequest({
    action: "web/order/action/status",
    data: { id },
    onSuccess() {
      navigate(window.location.href);
    },
  });

  const returnRequest = useRequest({
    action: "web/order/action/return",
    data: { id },
  });

  const handleActionCancel = () => {
    if (!confirm("Отменить заказ?")) return false;
    cancelRequest.send({ status: 4 });
  };

  const handleActionReturn = () => {
    return true;
  };

  return (
    <Row className="mb-2x">
      <Col className="text-end">
        <Preloader show={cancelRequest.state === "pending"} />
        {/* {status.id === 6 ? <ActionButtonReturn onClick={handleActionReturn} /> : <></>} */}
        {status.id === 1 ? (
          <ActionButtonCancel onClick={handleActionCancel} />
        ) : (
          <></>
        )}
      </Col>
    </Row>
  );
};

const ActionButtonCancel = (props) => {
  return (
    <Button variant="warning ml-2" {...props}>
      Отменить
    </Button>
  );
};

const ActionButtonReturn = (props) => {
  return (
    <Button variant="secondary ml-2" {...props}>
      Возврат
    </Button>
  );
};
