import { sendRequest } from "@js/components/Request";

export default async (action, params) => {
  const { object } = await sendRequest(action, params);

  return object;
};
