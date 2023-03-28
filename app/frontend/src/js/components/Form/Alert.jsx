import React from "react";
import Alert from "react-bootstrap/Alert";
import Icon from "@js/components/Icon";

const icons = {
  success: "check-circle",
  warning: "",
  danger: "exclamation-triangle",
  info: "",
};

export default (props) => {
  const {
    variant = "default",
    iconName = "",
    iconProps = { size: "1.8em" },
    containerProps = {},
    headingProps = {},
    text,
    children,
  } = props;

  if (!text) {
    return <></>;
  }

  var _iconName = "";
  if (!iconName) {
    _iconName = icons[variant];
  }

  return (
    <>
      <Alert {...containerProps} variant={variant}>
        <Alert.Heading as={"h6"} className="mb-0 fs-6" {...headingProps}>
          <Icon className="mb-1 mr-2" {...iconProps} name={_iconName} />

          {text}
        </Alert.Heading>

        {children}
      </Alert>
    </>
  );
};
