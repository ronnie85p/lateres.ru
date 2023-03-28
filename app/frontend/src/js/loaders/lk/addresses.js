import { getResource } from "../request";

export default async (props) => {
  const results = await Promise.all([getResource(props)]);

  return results;
};
