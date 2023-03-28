import React from "react";
import Context from "@js/contexts/context";

import CardContent from "./Card";
import CashContent from "./Cash";
import NoCashContent from "./NoCash";

const components = {
  1: CardContent,
  2: CashContent,
  3: NoCashContent,
};

export default (props) => {
  const { payment } = React.useContext(Context);
  const Component = components[payment.id];

  return <Component {...payment} />;
};
