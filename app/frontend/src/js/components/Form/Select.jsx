import React, { useState, createRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";

const Select = (props) => {
  const { children, name, defaultValue } = props;
  const options = Array.from(children);
  const [selectedIndex, setSelectedIndex] = useState(() => {
    if (defaultValue) {
      let foundIndex = options.findIndex(
        (option) => option.props?.value == defaultValue
      );

      if (foundIndex !== -1) {
        return foundIndex;
      }
    }

    return 0;
  });

  const inputRef = createRef(null);
  const defaultOption = options[selectedIndex];

  const handleMenuClick = (event) => {
    const { target } = event;
    let _index = parseInt(target.dataset.index || "0");

    setSelectedIndex(_index);
    inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
  };

  const toggleBtnProps = {
    ...props.toggleBtnProps,
    ...defaultOption?.props.toggleBtnProps,
  };

  return (
    <>
      <Dropdown>
        <input
          ref={inputRef}
          type="hidden"
          name={name}
          value={defaultOption?.props.value}
        />

        <Dropdown.Toggle {...toggleBtnProps}>
          {defaultOption?.props.children}
        </Dropdown.Toggle>

        <Dropdown.Menu onClick={handleMenuClick}>
          {options.map((option, index) => {
            return {
              ...option,
              props: {
                ...option.props,
                active: index === selectedIndex,
                index: index,
              },
            };
          })}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const Option = (props) => {
  const { children, value, index } = props;

  return (
    <>
      <Dropdown.Item data-value={value} data-index={index}>
        {children}
      </Dropdown.Item>
    </>
  );
};

export { Select, Option };
