import React from "react";
import { useForm } from "../Form";
import { Modal } from "../Modal";

const RegisterModal = (props) => {
  const form = useForm({
    requestOptions: {
      params: {
        action: "",
      },
    },
    onSubmit() {
      return false;
    },
  });

  return (
    <>
      <Modal
        titleText={"Регистрация"}
        Body={() => {
          return <></>;
        }}
        {...props}
      />
    </>
  );
};

export default RegisterModal;
