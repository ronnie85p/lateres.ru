import { getResource, getObject } from "../request";

export default async (props) => {
  const results = await Promise.all([
    getResource(props),
    getObject("web/profile/get"),
  ]);

  return results;
};
