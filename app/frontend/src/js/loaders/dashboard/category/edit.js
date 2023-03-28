import { sendRequest, useSearchParams } from "@js/components/Request";

const getCategory = async ({ request }) => {
  const params = useSearchParams(request);
  const { success, message, object } = await sendRequest(
    "mgr/category/get",
    params
  );

  if (!success) {
    throw new Error(message);
  }

  return object;
};

export default getCategory;
