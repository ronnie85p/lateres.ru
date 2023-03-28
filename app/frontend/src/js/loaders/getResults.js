import { sendRequest } from "@js/components/Request";

export default async (action, data) => {
  const { results } = await sendRequest(action, data);

  return results || [];
};
