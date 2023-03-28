import { getResource, getResponse } from "./request";

export default (props) => {
  return Promise.all([getResource(props), getResponse("web/ordering/get")]);
};
