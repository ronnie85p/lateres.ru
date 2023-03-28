import { useParams } from "@js/components/Request";
import { getResource, getResults } from "../request";

export default async (props) => {
  const results = await Promise.all([
    getResource(props),
    getResults("web/profile/company/getList"),
  ]);

  return results;
};
