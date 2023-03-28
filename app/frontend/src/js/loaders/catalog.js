import { getResource } from "./request";

export default (props) => {
  return Promise.all([getResource({ ...props, action: "web/category/get" })]);
};
