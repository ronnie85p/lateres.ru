import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Input from "@js/components/Form/Input";

const useInputSelect = (props) => {
  const { loader } = props;
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const beforeLoad = () => {
    if (!loader) return false;
    setLoading(true);

    return true;
  };

  const afterLoad = (options) => {
    setLoading(false);
    setOptions(options);
  };

  const loadOptions = async (query) => {
    if (!beforeLoad()) return false;

    const options = await loader(query);
    afterLoad(options);
  };

  return { loadOptions, loading, options };
};

const InputSelect = (props) => {
  const {
    defaultValue = "",
    isInvalid,
    inputTimeout = 600,
    actionFocus = true,
    actionInput = true,
    clearFocusValue = true,
  } = props;
  const [showMenu, setShowMenu] = useState(false);
  const { loading, options, loadOptions } = useInputSelect(props);

  var inputRef = React.createRef(null);
  var inputTimeoutId = React.useRef(0);
  var currentValue = React.useRef("");

  const _loadOptions = async (query) => {
    setShowMenu(true);
    await loadOptions(query);
  };

  const handleFocus = async (event) => {
    if (!actionFocus) return;
    let _this = event.currentTarget;

    if (clearFocusValue) {
      currentValue.current = _this.value;
      _this.value = "";
    }

    _loadOptions();
  };

  const handleBlur = (event) => {
    let _this = event.currentTarget;

    if (clearFocusValue) {
      _this.value = currentValue.current;
    }
  };

  const handleInput = (event) => {
    if (!actionInput) return;
    let _this = event.currentTarget;
    clearTimeout(inputTimeoutId.current);
    inputTimeoutId.current = setTimeout(() => {
      _loadOptions(_this.value);
    }, inputTimeout);
  };

  const handleItemClick = (item) => {
    console.log("inputRef", inputRef);
    inputRef.current.value = item.value;
  };

  console.log("[InputSelect]", { loading, options });
  return (
    <>
      <Input
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultValue={defaultValue}
        isInvalid={isInvalid}
      />

      <Dropdown autoClose={"outside"} show={showMenu}>
        <Dropdown.Menu
          className="mt-1 shadow-sm border"
          style={{
            width: "100%",
            // borderTop: "0",
            // borderRadius: "0 0 4px 4px",
            // position: "relative",
            // top: "-4px",
          }}
        >
          {loading ? (
            <>
              <Dropdown.Item className="dropdown-loading">
                Loading...
              </Dropdown.Item>
            </>
          ) : (
            <>
              {options?.map((item) => (
                <Dropdown.Item
                  key={item.value}
                  onClick={() => handleItemClick(item, event)}
                >
                  {item.text}
                </Dropdown.Item>
              ))}
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default InputSelect;
