import React, { useContext } from "react";

import Context from "@js/contexts/context";
import Image from "@js/components/Image";

export default (props) => {
  const { config } = useContext(Context);
  const { src, homeUrl, alt = "logo", width = 100 } = config?.logo || {};

  return (
    <>
      <div className="site-logo">
        <a href={homeUrl}>
          <Image src={src} width={width} alt={alt} />
        </a>
      </div>
    </>
  );
};
