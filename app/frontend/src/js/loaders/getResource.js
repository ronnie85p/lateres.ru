import { sendRequest } from "@js/components/Request";

export default async function getResource({ request }) {
  const url = new URL(request.url);
  const { object, message, success } = await sendRequest("web/resource/get", {
    uri: url.pathname,
  });
  if (!success) {
    throw new Response("", {
      status: 404,
      statusText: message,
    });
  }

  return object;
}
