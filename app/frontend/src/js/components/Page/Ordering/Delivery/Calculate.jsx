import React from "react";

export default (props) => {
  const { car_id, distance, weight } = props;
  const Loading = <>Рассчитываем стоимость...</>;
  const ErrorFallback = ({ error }) => <>{error.message}</>;

  return (
    <FetchData
      loader={() =>
        sendRequest("web/delivery/calculate", { car_id, distance, weight })
      }
      Loading={Loading}
      ErrorFallback={ErrorFallback}
    >
      {({ data }) => (
        <FetchData
          loader={() =>
            sendRequest("web/ordering/save", { delivery: data.object })
          }
          Loading={Loading}
          ErrorFallback={ErrorFallback}
        />
      )}
    </FetchData>
  );
};
