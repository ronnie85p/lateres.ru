import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Icon from "@js/components/Icon";

const defaultProps = {
  textVariant: "dark",
};

const Line = (props) => {
  const { iconName, iconProps, textVariant, children } = {
    ...defaultProps,
    ...props,
  };
  return (
    <Row className={"mb-2" + (textVariant ? ` text-${textVariant}` : "")}>
      <Col md={1} style={{ width: 45 }}>
        <Icon name={iconName} size="1.2em" {...iconProps} />
      </Col>
      <Col>
        <div className="">{children}</div>
      </Col>
    </Row>
  );
};

export { Line };
