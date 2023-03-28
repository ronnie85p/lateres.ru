import React from "react";

import Context from "@js/contexts/context";
import Form from "@js/components/Form";

const methods = [
  {
    name: "Без НДС",
    value: 0,
  },
  {
    name: "С НДС",
    value: 1,
  },
];

export default (props) => {
  const { description } = props;
  const { form, handleFieldChange } = React.useContext(Context);
  const defaultValue = (
    methods.find((item) => item.value == form.values.include_tax) || methods[0]
  ).value;

  return (
    <div className="">
      <div className="mb-2">{description}</div>

      {methods.map((item) => (
        <Form.Check
          type="radio"
          name="include_tax"
          id={`include-tax-${item.value}`}
          key={item.value}
          label={item.name}
          value={item.value}
          defaultChecked={defaultValue == item.value}
          onChange={handleFieldChange}
        />
      ))}
    </div>
  );
};
