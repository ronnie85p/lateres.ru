import React, { useState, useEffect, useReducer } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const InputCounter = ({
  name = "",
  value = "",
  disabled = false,
  minValue = -9999999999,
  maxValue = 9999999999,
  buttonMinusProps = {},
  buttonPlusProps = {},
  inputProps = {},
  groupProps = {},
  onChange = () => {},
}) => {
  const isValueMinAllowed = (value, orEqual = false) => {
    return orEqual ? value >= minValue : value > minValue;
  };

  const isValueMaxAllowed = (value, orEqual = false) => {
    return orEqual ? value <= maxValue : value < maxValue;
  };

  const [counter, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "increment":
          return isValueMaxAllowed(state) ? state + 1 : state;
        case "decrement":
          return isValueMinAllowed(state) ? state - 1 : state;
        case "custom":
          const value = parseInt(action.value);
          if (
            !isNaN(value) &&
            isValueMinAllowed(value, true) &&
            isValueMaxAllowed(value, true)
          ) {
            return value;
          }
      }

      return state;
    },
    value,
    (value) => {
      let number = parseInt(value);

      return !isNaN(number) ? number : 0;
    }
  );

  const _minValue = parseInt(minValue);
  const _maxValue = parseInt(maxValue);

  if (isNaN(_minValue)) {
    throw new Error("Prop 'minValue' is not a number.");
  }

  if (isNaN(_maxValue)) {
    throw new Error("Prop 'maxValue' is not a number.");
  }

  const [eventType, setEventType] = React.useState("");
  const inputRef = React.createRef(null);
  const event = React.useMemo(() => {
    return new Event(eventType, { bubbles: true });
  }, [eventType]);

  const triggerInputChange = () => {
    inputRef.current.dispatchEvent(event);
  };

  const handleDecrement = (event) => {
    dispatch({ type: "decrement" });
    setEventType("change");
  };

  const handleIncrement = (event) => {
    dispatch({ type: "increment" });
    setEventType("change");
  };

  const handleInput = (event) => {
    const value = event.currentTarget.value;
    dispatch({ type: "custom", value });
    setEventType("input");
  };

  const handleChange = (event) => {
    onChange && onChange(event);
  };

  useEffect(() => {
    triggerInputChange();

    if (inputRef.current && !inputRef.current.hasAttribute("listeners")) {
      inputRef.current.addEventListener("change", handleChange, false);
      inputRef.current.addEventListener("input", handleInput, false);
      inputRef.current.setAttribute("listeners", true);
    }
  }, [counter]);

  return (
    <>
      <InputGroup {...groupProps}>
        <Button
          variant="light"
          className="icon-minus mr-1 rounded"
          {...buttonMinusProps}
          onClick={handleDecrement}
          disabled={disabled || !isValueMinAllowed(counter)}
        />

        <Form.Control
          as="input"
          className="text-center rounded"
          onChange={() => {}}
          disabled={disabled}
          {...inputProps}
          ref={inputRef}
          value={counter}
          name={name}
        />

        <Button
          variant="light"
          className="icon-plus ml-1 rounded"
          {...buttonPlusProps}
          onClick={handleIncrement}
          disabled={disabled || !isValueMaxAllowed(counter)}
        />
      </InputGroup>
    </>
  );
};

export default InputCounter;
