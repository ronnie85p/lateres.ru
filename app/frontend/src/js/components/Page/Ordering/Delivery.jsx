import React from "react";

import Context from "@js/contexts/context";
import PickupContent from "./Delivery/Pickup";
import CompanyContent from "./Delivery/Company";
import Payments from "./Delivery/Payments";

const components = {
  1: PickupContent,
  2: CompanyContent,
};

export default (props) => {
  const { delivery } = React.useContext(Context);
  const Component = components[delivery.id];

  return (
    <>
      <Component {...delivery} />

      <hr />

      <div className="h6 mb-0">Cпособ оплаты</div>
      <Payments />
    </>
  );
};
