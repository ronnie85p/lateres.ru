import React from "react";

const FetchList = (props) => {
  const {
    list,
    Item = () => <></>,
    Empty = () => <></>,
    Fallback = () => <></>,
  } = props;

  const [pending, setPending] = React.useState(false);
  const [outList, setOutList] = React.useState([]);

  const beforeGet = () => {
    setPending(true);
  };
  const afterGet = () => {
    setPending(false);
  };

  const getList = async (list) => {
    beforeGet();

    let out = typeof list === "function" ? list() : list;
    out = out instanceof Promise ? await out : out;
    out = out instanceof Array ? out : [];

    afterGet();
    setOutList(out);
    return out;
  };

  // var outList = React.useMemo(() => getList(list), [list]);
  // outList = outList instanceof Promise ? outList.PromiseResult : outList;

  React.useEffect(() => {
    getList(list);
  }, []);

  if (pending) {
    return <Fallback />;
  }

  if (!outList?.length) {
    return <Empty />;
  }

  return (
    <>
      {outList?.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </>
  );
};

export default FetchList;
