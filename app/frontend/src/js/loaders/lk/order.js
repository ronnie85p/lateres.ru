import { useSearchParams } from "@js/components/Request";
import { getObject, getResource } from "../request";

export default async (props) => {
  const searchParams = useSearchParams(props.request.url);
  const results = await Promise.all([
    getResource(props),
    getObject("web/order/get", { id: searchParams.get("id") }),
  ]);

  return results;
};
