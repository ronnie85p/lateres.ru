import React from "react";
import CImage from "@js/components/Image";

const Media = (props) => {
  const { children, className } = props;
  return (
    <div {...props} className={"media " + className}>
      {children}
    </div>
  );
};

const Image = (props) => {
  const { className } = props;
  return <CImage {...props} className={"mr-3 " + className} />;
};

const Body = (props) => {
  const { children, className } = props;
  return (
    <div {...props} className={"media-body " + className}>
      {children}
    </div>
  );
};

const Heading = (props) => {
  const { children, className } = props;

  return (
    <h5 {...props} className={"mt-0 " + className}>
      {children}
    </h5>
  );
};

Media.Image = Image;
Media.Body = Body;
Media.Heading = Heading;

export default Media;
