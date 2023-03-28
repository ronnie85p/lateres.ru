import { sendRequest, useSearchParams } from "@js/components/Request";

const getTrademark = async ({ request }) => {
  const params = useSearchParams(request);
  const { success, message, object } = await sendRequest(
    "mgr/trademark/get",
    params
  );

  if (!success) {
    throw new Error(message);
  }

  return object;
};

export default getTrademark;
