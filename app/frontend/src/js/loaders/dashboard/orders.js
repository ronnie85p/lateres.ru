import { sendRequest, useSearchParams } from "@js/components/Request";

const getOrders = async ({ request }) => {
  return [];
  const params = useSearchParams(request);
  const { success, message, object } = await sendRequest(
    "mgr/orders/getList",
    params
  );

  if (!success) {
    throw new Error(message);
  }

  return object;
};

export default getOrders;
