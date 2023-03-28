import React, { useEffect, createRef } from "react";
import Form from "react-bootstrap/Form";
import Inputmask from "@js/funcs/inputmask";

const Input = (props) => {
  const { mask, maskAlias, placeholder, children } = props;
  const inputRef = createRef(null);

  const setInputMask = () => {
    var im = new Inputmask({ alias: maskAlias, ...mask });
    if (
      typeof placeholder === "undefined" &&
      typeof im.opts.placeholder !== "undefined"
    ) {
      inputRef.current.setAttribute("placeholder", im.opts.placeholder);
    }

    im.mask(inputRef.current);
  };

  useEffect(() => {
    if (mask || maskAlias) {
      if (inputRef.current) {
        setInputMask();
      }
    }
  }, []);

  const inputProps = {};
  for (let k in props) {
    if (!["mask", "maskAlias", "error"].includes(k)) {
      inputProps[k] = props[k];
    }
  }

  return (
    <Form.Control ref={inputRef} {...inputProps}>
      {children}
    </Form.Control>
  );
};

export default Input;
