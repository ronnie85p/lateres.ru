import React from "react";
import Icon from "@js/components/Icon";
import { joinToString } from "@js/funcs/utils";

export default (props) => {
  const {
    rate,
    count = 5,
    size = "1em",
    color = "silver",
    fillColor = "orange",
    className = "",
    starProps,
  } = props;
  const stars = [];

  for (let i = 1; i <= count; i++) {
    let iconName = i <= rate ? "star-fill" : "star";
    let _color = i <= rate ? fillColor : color;

    stars.push(
      <Icon
        size={size}
        style={{ color: _color }}
        {...starProps}
        name={iconName}
        key={i}
      />
    );
  }

  return (
    <span className={joinToString(["", className], " ", true)}>{stars}</span>
  );
};
