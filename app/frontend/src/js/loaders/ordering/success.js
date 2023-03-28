import { useParams } from "@js/components/Request";
import { getObject, getResource } from "../request";

export default async (props) => {
  const params = useParams();
  const results = await Promise.all([
    getResource(props),
    getObject("web/order/get", params),
  ]);

  return results;
};
