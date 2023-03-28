import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Context from "@js/contexts/context";

export default function useDataContext() {
  const data = useLoaderData();
  const context = useContext(Context);

  return { ...context, data };
}
