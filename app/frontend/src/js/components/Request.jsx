import React, { useState } from "react";
import { useNavigate as useRouterNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import axios from "axios";

const defaultOptions = {
  url: "/app/connector.php",
  responseType: "json",
  method: "post",
  mode: "no-cors",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
};

const sendRequest = (action, data, options = {}) => {
  return axios({
    ...defaultOptions,
    ...options,
    data,
    params: {
      action,
      ...options.params,
    },
  }).then(({ data }) => data || {});
};

const useRequest = (props) => {
  const { action, data, options, onBefore, onSuccess, onError } = props;
  const [state, setState] = useState({ status: "none" });

  const handleBefore = (data) => {
    onBefore && onBefore(data);
    setState({ status: "pending", data });
  };

  const handleSuccess = (response) => {
    onSuccess && onSuccess(response);
    setState({ status: "success", response });
  };

  const handleError = (error) => {
    onError && onError(error);
    setState({ status: "error", error });
  };

  const send = async (object) => {
    object = { ...data, ...object };
    handleBefore(object);

    return sendRequest(action, object, options)
      .then((response) => {
        if (response.success === false) {
          throw new Error(JSON.stringify(response), { cause: "failure" });
        }

        handleSuccess(response);
        return response;
      })
      .catch((error) => {
        if (error.cause === "failure") {
          error = {
            response: JSON.parse(error.message),
            message: error.message,
            cause: error.cause,
          };
        }
        handleError(error);
      });
  };

  return {
    state: state.status,
    error: state.error,
    response: state.response,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    send,
  };
};

const useNavigate = (url) => {
  const navigate = useRouterNavigate();

  return function (url) {
    const origin = window.location.origin;
    const path = url.indexOf(origin) > -1 ? url.replace(origin, "") : url;

    navigate(path);
  };
};

const Suspense = (props) => {
  const {
    request,
    children = <></>,
    LoadingComponent = <></>,
    FallbackComponent = <></>,
    ErrorComponent,
  } = props;

  React.useEffect(() => {
    request.send();
  }, []);

  var ResultComponent = null;
  switch (request.state) {
    case "pending":
      ResultComponent = FallbackComponent || LoadingComponent;
      break;
    case "success":
      ResultComponent = children;
      break;
    case "error":
      ResultComponent = ErrorComponent;
      break;
  }

  return typeof ResultComponent === "function" ? (
    <ResultComponent {...request} />
  ) : (
    ResultComponent
  );
};

const useSearchParams = (url) => {
  url = url instanceof URL ? url : new URL(url);

  return url.searchParams;
};

const useResource = (resource) => {
  let status = "pending";
  let result;
  let suspender = resource.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );

  return {
    getResult: () => result,
    getStatus: () => status,
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};

const useSuspenseResource = (loader) => {
  var _loader = typeof loader === "function" ? loader() : loader;

  return useResource(_loader);
};

const fetchData = (action, params) => {
  const promise = sendRequest(action, params).then((response) => {
    const { success, message, errors } = response;
    if (response.hasOwnProperty("success") && success === false) {
      throw { type: "response", message, errors };
    }

    return response;
  });

  return useResource(promise);
};

const useParams = (href = window.location.href) => {
  const url = new URL(href);
  const params = {};

  for (let [key, value] of url.searchParams) {
    params[key] = value;
  }

  return params;
};

const FetchData = (props) => {
  const {
    loader,
    errorProps,
    children,
    Loading = <>Loading...</>,
    ErrorFallback = ({ error, resetErrorBoundary }) => <>{error.message}</>,
  } = props;

  const resource = useResource(
    typeof loader === "function" ? loader() : loader
  );

  const Output = () => {
    const data = resource.read();
    if ("success" in data) {
      if (!data.success && data.message !== "") {
        throw new Error(data.message);
      }
    }

    return typeof children === "function" ? children({ data }) : children;
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} {...errorProps}>
      <React.Suspense fallback={Loading}>
        <Output />
      </React.Suspense>
    </ErrorBoundary>
  );
};

const QueryData = (props) => {
  const { request, children, data, Loading, Error } = props;

  const query = async () => {
    const response = await request.send(data);
    if (typeof response === "object") {
      if (response.hasOwnProperty("success")) {
        if (!response.success) {
          return new Response("", {
            statusText: response.message,
          });
        }
      }
    }
  };

  React.useEffect(() => {
    query();
  }, []);

  const Output = request.response ? children : <></>;

  return (
    <ErrorBoundary ErrorFallback={Error}>
      {request.isPending ? Loading : Output}
    </ErrorBoundary>
  );
};

const useHistory = (props) => {
  const pushState = (url, state = {}) => {
    window.history.pushState(state, null, url);
  };

  return {
    pushState,
  };
};

const useLocation = (props) => {
  const url = new URL(window.location.href);

  const setParams = (params) => {
    for (let k in params) {
      url.searchParams.set(k, params[k]);
    }
  };

  const updateParams = (params) => {
    setParams(params);
    updateHistory();
  };

  const updateHistory = () => {
    window.history.pushState(null, null, url);
  };

  return {
    ...window.location,
    url,
    setParams,
    updateParams,
    updateHistory,
  };
};

export {
  useLocation,
  useHistory,
  useParams,
  sendRequest,
  useRequest,
  useResource,
  useNavigate,
  useSearchParams,
  useSuspenseResource,
  fetchData,
  FetchData,
  QueryData,
  Suspense,
};
