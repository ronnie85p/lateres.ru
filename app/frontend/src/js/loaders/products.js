import getResults from "./getResults";

const getProducts = (data) => {
  return getResults("web/product/getList", data);
};

const getVisitProducts = (data) => {
  return getResults("web/product/getList", data);
};

export { getProducts, getVisitProducts };
