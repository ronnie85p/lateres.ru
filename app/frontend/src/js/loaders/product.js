import { sendRequest } from "@js/components/Request";

export default async function getProduct({ request }) {
  const url = new URL(request.url);
  const response = await sendRequest("web/product/get", { uri: url.pathname });
  if (!response.success) {
    throw new Response("", {
      status: 404,
      statusText: response.message,
    });
  }

  return response;
}
