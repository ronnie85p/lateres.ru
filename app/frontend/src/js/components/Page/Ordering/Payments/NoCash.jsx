import React from "react";

import Context from "@js/contexts/context";
import { useLocation } from "@js/components/Request";
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
  const { form } = React.useContext(Context);
  const { updateParams } = useLocation();
  const defaultValue = getDefaultIncludeTax(form.values.include_tax);

  const handleChange = (event) => {
    let _this = event.currentTarget;

    form.handleChange(event);
    updateParams({ [_this.name]: _this.value });
  };

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
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

const getDefaultIncludeTax = (value) => {
  const index = methods.findIndex((item) => item.value == value);
  return methods[index !== -1 ? index : 0]?.value;
};
