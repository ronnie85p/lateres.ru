import React, { useState, useEffect } from "react";
import BootstrapForm from "react-bootstrap/Form";

import * as Formik from "formik";
import * as Yup from "yup";

import Input from "@js/components/Form/Input";
import Group from "@js/components/Form/Group";
import Label from "@js/components/Form/Label";
import Alert from "@js/components/Form/Alert";
import Editor from "@js/components/Form/Editor";
import TextArea from "@js/components/Form/TextArea";
import InputTags from "@js/components/Form/InputTags";
import InputSelect from "@js/components/Form/InputSelect";
import FieldError from "@js/components/Form/FieldError";
import DateTime from "@js/components/Form/DateTime";
import Asterix from "@js/components/Form/Asterix";

const defaultFormProps = {
  preventPressEnter: true,
  noValidate: true,
};

const useForm = (props) => {
  const { actionRequest, onSubmit, onSuccess, onError } = props;
  const [response, setResponse] = useState({});
  const formik = Formik.useFormik({
    initialValues: {},
    ...props,
    onSubmit: async (values, methods) => {
      const { setSubmitting } = methods;

      if (onSubmit && onSubmit(values, methods) === false) {
        setSubmitting(false);
        return;
      }

      if (actionRequest) {
        const response = await actionRequest(values, methods)
          .then((response) => {
            if (response.success === false) {
              setResponseErrors(response.errors);
            }

            onSuccess && onSuccess(response);
            return response;
          })
          .catch(onError);

        setResponse(response);
        setSubmitting(false);
      }
    },
  });

  const handleSubmit = (event) => {
    let fd = new FormData(event.currentTarget);
    let values = {};

    for (let [name, value] of fd.entries()) {
      values[name] = value;
    }

    formik.setValues({ ...formik.values, ...values });
    return formik.handleSubmit();
  };

  const setResponseErrors = (array) => {
    let errors = {};
    for (let i in array) {
      let error = array[i];
      errors[error.id] = error.msg;
    }

    formik.setErrors(errors);
  };

  return {
    ...formik,
    response,
    message: response?.message,
    handleSubmit,
    setResponse,
    setResponseErrors,
  };
};

const Form = (props) => {
  const _props = { ...defaultFormProps, ...props };
  const { preventPressEnter, onKeyDown, onSubmit, children } = _props;

  const handleKeyPress = (e) => {
    if (preventPressEnter === true && e.keyCode === 13) {
      e.preventDefault();
    }

    onKeyDown && onKeyDown(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit && onSubmit(e);
  };

  let deprecatedProps = ["preventPressEnter"];
  for (let i in deprecatedProps) {
    delete _props[deprecatedProps[i]];
  }

  return (
    <>
      <BootstrapForm
        {..._props}
        onKeyDown={handleKeyPress}
        onSubmit={handleSubmit}
      >
        {children}
      </BootstrapForm>
    </>
  );
};

Form.Input = Input;
Form.Group = Group;
Form.Label = Label;
Form.Alert = Alert;
Form.Editor = Editor;
Form.TextArea = TextArea;
Form.InputTags = InputTags;
Form.InputSelect = InputSelect;
Form.FieldError = FieldError;
Form.DateTime = DateTime;
Form.Select = BootstrapForm.Select;
Form.Control = BootstrapForm.Control;
Form.Check = BootstrapForm.Check;
Form.Floating = BootstrapForm.Floating;
Form.Text = BootstrapForm.Text;
Form.Asterix = Asterix;

export { useForm, Form, Formik, Yup };
export default Form;
