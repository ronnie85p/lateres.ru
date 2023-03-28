import React from "react";

export default (props) => {
  const { use } = props;

  const form = useForm({
    request: useRequest({
      params: {
        action: "web/auth/logout",
      },
    }),
    onSubmit() {
      console.log("handle submit");
      return true;
    },
    onSuccess({ object }) {
      if (object.redirect) {
        window.location.href = object.redirect;
      }
    },
  });

  return (
    <>
      <Modal
        use={use}
        titleText={"Выход"}
        titleIcon={"box-arrow-in-left"}
        titleIconProps={{
          className: "mb-1 mr-2",
        }}
        modalProps={{
          animation: false,
        }}
        bodyProps={{
          className: "p-4",
        }}
        Body={() => (
          <>
            <Form onSubmit={form.handleSubmit}>
              <div className="text-center">
                <Button type="submit">Выйти</Button>
              </div>
            </Form>
          </>
        )}
      />
    </>
  );
};
