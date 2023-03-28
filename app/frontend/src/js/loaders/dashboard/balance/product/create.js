import { sendRequest } from "@js/components/Request";

const getProductCreate = async (props) => {
  const response = await sendRequest("routes/product/create");

  return response || {};
};

export default getProductCreate;
