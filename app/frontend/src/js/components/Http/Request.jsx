import React, { useState, useEffect } from "react";
import axios from "axios";

const defaultOptions = {
  url: "/app/connector.php",
  method: "post",
  responseType: "json",
  mode: "no-cors",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  // transformRequest: [],
  onBeforeSend: (options) => {
    return true;
  },
  onSuccess: (response, options) => {},
  onError: (error, options) => {},
  onDone: (response, options) => {},
};

const appendFormFiles = (fd, files) => {
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    fd.append(`file_${i}`, file, file.name);
  }
};

const appendFormObject = (fd, object) => {
  for (let key in object) {
    let value = object[key];
    value = value instanceof Object ? JSON.stringify(value) : value;

    fd.append(key, value);
  }
};

const getFormData = (data) => {
  var fd;

  if (data instanceof HTMLElement && data.nodeName === "FORM") {
    fd = new FormData(data);
  } else {
    fd = new FormData();

    if (data instanceof FileList) {
      appendFormFiles(fd, data);
    } else {
      if (data instanceof Object || data instanceof Array) {
        appendFormObject(fd, data);
      }
    }
  }

  return fd;
};

const useRequest = (options = {}) => {
  options = { ...defaultOptions, ...options };

  const [result, setResult] = useState({});
  const { onBeforeSend, onSuccess, onError, onDone } = options;

  const controller = new AbortController();

  const handleBeforeSend = () => {
    if (!onBeforeSend(options)) {
      setResult({ state: "canceled" });

      return false;
    }

    setResult({ state: "sending" });
    return true;
  };

  const handleSuccess = (response) => {
    if (
      typeof response.data === "object" &&
      "success" in response.data &&
      !response.data.success
    ) {
      return handleError({ message: response.data.message }, response.data);
    }

    setResult({ state: "success", response: response.data });
    return onSuccess(response, options);
  };

  const handleError = (error, response = null) => {
    setResult({ state: "error", error, response });

    return onError(error, options);
  };

  const handleDone = (response) => {
    return onDone(response, options);
  };

  const send = (data = null) => {
    if (!handleBeforeSend()) {
      return false;
    }

    const promise = axios({ ...options, data: data || options.data });
    promise.then(handleSuccess).catch(handleError).finally(handleDone);

    return promise;
  };

  const abort = () => {
    if (result.state == "sending") {
      controller.abort();
    }
  };

  return {
    abort,
    send,
    getFormData,
    result,
    state: result.state,
    response: result.response,
    error: result.error,
  };
};

const Suspense = (props) => {
  const {
    request,
    children,
    LoadingComponent = () => <></>,
    ErrorComponent = () => <></>,
    AbortComponent = () => <></>,
  } = props;

  useEffect(() => {
    request.send();
  }, []);

  let content;
  switch (request.state) {
    case "sending":
      content = <LoadingComponent {...request} />;
      break;
    case "error":
      content = <ErrorComponent {...request} />;
      break;
    case "abort":
      content = <AbortComponent {...request} />;
      break;
    case "success":
      content = typeof children === "function" ? children(request) : children;
      break;
  }

  return content;
};

const useUrl = (
  location = document.location.href,
  base = document.location.origin
) => {
  return new URL(location, base);
};

const sendRequest = (opts = {}) => {
  const options = { ...defaultOptions, ...opts };
  const { onSuccess, onError, onDone } = options;

  const handleSuccess = (response) => {
    if (
      typeof response.data === "object" &&
      "success" in response.data &&
      !response.data.success
    ) {
      return handleError({ message: response.data.message }, response.data);
    }

    return onSuccess(response, options);
  };

  const handleError = (error, response = null) => {
    return onError(error, options);
  };

  const handleDone = (response) => {
    return onDone(response, options);
  };

  const promise = axios(options);
  promise.then(handleSuccess).catch(handleError).finally(handleDone);

  return promise;
};

export { useRequest, useUrl, Suspense, sendRequest };
