import { sendRequest, useSearchParams } from "@js/components/Request";

const getFabricator = async ({ request }) => {
  const params = useSearchParams(request);
  const { success, message, object } = await sendRequest(
    "mgr/fabricator/get",
    params
  );

  if (!success) {
    throw new Error(message);
  }

  return object;
};

export default getFabricator;
