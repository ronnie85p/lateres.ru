import React, { useEffect } from "react";
import BootstrapImage from "react-bootstrap/Image";

const Image = (props) => {
  const { onError, defaultSrc, src } = props;
  const ref = React.createRef(null);

  const handleError = (event) => {
    setDefaultSrc();

    onError && onError(event);
  };

  const setDefaultSrc = () => {
    if (
      defaultSrc &&
      !new RegExp(`(${defaultSrc})$`, "i").test(ref.current.src)
    ) {
      ref.current.src = defaultSrc;
    }
  };

  let imageProps = {};
  for (let k in props) {
    if (["defaultSrc"].includes(k)) continue;
    imageProps[k] = props[k];
  }

  useEffect(() => {
    if (!src) {
      setDefaultSrc();
    }
  }, []);

  return <BootstrapImage {...imageProps} ref={ref} onError={handleError} />;
};

export default Image;
