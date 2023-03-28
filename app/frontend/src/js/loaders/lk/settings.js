import { getResource, getObject } from "../request";

export default async (props) => {
  const results = await Promise.all([getObject("web/profile/settings/get")]);

  return results;
};
