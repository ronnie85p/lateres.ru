import React from "react";
import { sendRequest } from "../components/Request";

export default async () => {
  const url = new URL(window.location.href);
  const response = await sendRequest("web/category/get", {
    uri: url.pathname,
  }).then((response) => response.data);

  return response;
};
