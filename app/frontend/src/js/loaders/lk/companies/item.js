import { sendRequest } from "@js/components/Request";

const getCompany = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id > 0) {
    const response = await sendRequest("web/profile/company/get", {
      id,
    });

    return response?.object || {};
  }

  return {};
};

export default getCompany;
