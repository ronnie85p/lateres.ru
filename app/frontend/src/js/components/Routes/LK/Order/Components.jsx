import React from "react";
import Icon from "@js/components/Icon";

const Line = ({
  iconName,
  iconProps,
  textVariant = "dark",
  bgVariant = "",
  children,
}) => {
  const textVariantClass = textVariant ? ` text-${textVariant}` : "";
  const bgVariantClass = bgVariant ? ` bg-${bgVariant} p-1` : "";

  return (
    <div className={`d-flex mb-2${textVariantClass}${bgVariantClass}`}>
      <div style={{ width: 30 }}>
        <Icon name={iconName} {...iconProps} />
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export { Line };
