import { sendRequest } from "@js/components/Request";

const getResponse = async (action, params) => {
  const response = await sendRequest(action, params);

  return response || {};
};

const getObject = async (action, params) => {
  const { object } = await getResponse(action, params);

  return object || {};
};

const getResults = async (action, params) => {
  const { results } = await getResponse(action, params);

  return results || [];
};

const getResource = async (
  { request, action = "web/resource/get" },
  params
) => {
  const url = new URL(request.url);
  const { success, status, message, object } = await getResponse(action, {
    ...params,
    uri: url.pathname,
  });

  if (success === false) {
    throw new Response("", {
      status: status || 404,
      statusText: message || "",
    });
  }

  window.document.title = object.pagetitle;
  return object;
};

export { getResponse, getObject, getResults, getResource };
