import React from "react";
import DOMPurify from "dompurify";

export default ({ children }) => {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(children) }}
    ></span>
  );
};
