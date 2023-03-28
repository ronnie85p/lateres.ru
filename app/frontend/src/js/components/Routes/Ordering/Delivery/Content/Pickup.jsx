import React from "react";

import Context from "@js/contexts/context";
import DeliveryTime from "../Time";
import { Line } from "../../Components";

export default (props) => {
  const { order } = React.useContext(Context);

  return (
    <>
      <DeliveryTime label="Дата и время получения" options={order.work_times} />
    </>
  );
};
