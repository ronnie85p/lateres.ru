import React from "react";
import { sendRequest } from "@js/components/Request";

const defaultProps = {
  context: document.body,
  multiple: false,
  mime: "",
  name: "file",
  types: "jpeg, jpg, png, gif",
  accept: "",
  minCount: 1,
  maxCount: 100,
  minSize: 0,
  maxSize: Math.pow(1024, 2) * 100,
};

const useSelectFiles = (props) => {
  const { context, multiple, accept, types, minSize, maxSize } = {
    ...defaultProps,
    ...props,
  };
  const inputs = React.useMemo(() => [], []);

  const createInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.hidden = true;
    input.accept = accept;
    input.multiple = multiple === true;

    return input;
  };

  const removeInputs = (event) => {
    setTimeout(() => {
      inputs.forEach((el, idx) => {
        if (!el.files.length) {
          el.remove();
          inputs.splice(idx, 1);
        }
      });
    }, 500);
  };

  const appendInput = (input) => {
    context.append(input);
    inputs.push(input);
  };

  const openDialog = () => {
    return new Promise((resolve, reject) => {
      try {
        const input = createInput();
        appendInput(input);

        input.click();
        input.addEventListener("change", resolve, false);
      } catch (e) {
        reject(e);
      }
    });
  };

  const dropFilesTo = (container) => {
    return new Promise((resolve, reject) => {
      try {
        container.addEventListener(
          "dragover",
          (event) => {
            event.stopPropagation();
            event.preventDefault();
          },
          false
        );

        container.addEventListener(
          "dragenter",
          (event) => {
            event.stopPropagation();
            event.preventDefault();
          },
          false
        );

        container.addEventListener(
          "dragleave",
          (event) => {
            event.stopPropagation();
            event.preventDefault();
          },
          false
        );

        container.addEventListener(
          "drop",
          (event) => {
            event.stopPropagation();
            event.preventDefault();

            const data = event.dataTransfer;
            data.dropEffect = "copy";

            resolve(data);
          },
          false
        );
      } catch (e) {
        reject(e);
      }
    });
  };

  const validateFiles = (files) => {
    for (let file of files) {
      if (!types.contains(file.type)) {
        file.error = 1;
        continue;
      }

      if (file.size < minSize) {
        file.error = 2;
        continue;
      }

      if (file.size > maxSize) {
        file.error = 3;
        continue;
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener("focus", removeInputs, false);
  }, []);

  return { openDialog, dropFilesTo, validateFiles, inputs };
};

const useActionFiles = (props) => {
  const {
    checkRequest = () => {},
    uploadRequest = () => {},
    removeRequest = () => {},
  } = props;

  const checkFiles = (files) => {
    const data = [];
    for (let file of files) {
      data.push({ name: file.name, size: file.size, type: file.type });
    }

    return checkRequest(data);
  };

  const uploadFiles = (files) => {
    for (let file of files) {
      uploadFile(file);
    }
  };

  const uploadFile = (file) => {
    let fd = new FormData();
    fd.append(0, file, file.name);
    return uploadRequest(fd);
  };

  const removeFile = (path) => {
    return removeRequest(path);
  };

  const removeFiles = (paths) => {
    for (let i in paths) {
      let path = paths[i];
      removeFile(path);
    }
  };

  return { checkFiles, uploadFiles, uploadFile, removeFile, removeFiles };
};

export { useSelectFiles, useActionFiles };
