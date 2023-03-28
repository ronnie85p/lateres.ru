import React, { useEffect, useContext } from "react";
import { useLoaderData } from "react-router-dom";

import Context from "@js/contexts/context";

const Services = (props) => {
  const data = useLoaderData();
  const context = useContext(Context);
  context.data = data;

  return <>Services</>;
};

export default Services;
