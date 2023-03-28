import { sendRequest, useSearchParams } from "@js/components/Request";
const orders = require("@js/fakes/orders.json");

const getOrder = async ({ request }) => {
  const params = useSearchParams(request);
  const order = orders.find((order) => order.id == params.id);

  if (!order) {
    throw new Error("Not found");
  }

  return order;

  return order;
  const { success, message, object } = await sendRequest(
    "mgr/orders/getList",
    params
  );

  if (!success) {
    throw new Error(message);
  }

  return object;
};

export default getOrder;
