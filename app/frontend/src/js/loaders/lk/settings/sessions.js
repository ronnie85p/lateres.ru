import { getResource, getResponse } from "../../request";

export default async (props) => {
  const results = await Promise.all([
    getResource(props),
    getResponse("web/auth/login/getList"),
  ]);

  return results;
};
