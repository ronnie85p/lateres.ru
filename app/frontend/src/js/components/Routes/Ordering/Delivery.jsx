import React from "react";
import Card from "react-bootstrap/Card";

import Context from "@js/contexts/context";
import Form from "@js/components/Form";
import Icon from "@js/components/Icon";
import { Line } from "./Components";
import PickupContent from "./Delivery/Content/Pickup";
import CompanyContent from "./Delivery/Content/Company";

const components = {
  1: PickupContent,
  2: CompanyContent,
};

export default (props) => {
  const { id } = props;
  const { config } = React.useContext(Context);
  const Component = components[id];

  return (
    <>
      <div className="form-control mb-4">
        <div className="">Пункт выдачи</div>
        <div className="text-muted">
          {config.config["app.contacts_factory_address"]}
        </div>
      </div>

      <Component {...props} />
    </>
  );
};
