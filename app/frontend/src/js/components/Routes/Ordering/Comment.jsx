import React from "react";
import Context from "@js/contexts/context";
import Form from "@js/components/Form";

export default (props) => {
  const { form, handleFieldChange } = React.useContext(Context);

  return (
    <Form.TextArea
      name="comment"
      placeholder="Дополнительная информация по заказу"
      style={{ height: 100 }}
      maxLength={100}
      defaultValue={form.values.comment}
      onChange={handleFieldChange}
    />
  );
};
