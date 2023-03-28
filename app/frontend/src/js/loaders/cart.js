import { getResource, getResults } from "./request";

export default (props) => {
  return Promise.all([
    getResource(props),
    getResults("web/cart/getList", { all: true }),
  ]);
};
