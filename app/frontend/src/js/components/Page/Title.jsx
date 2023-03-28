import React from "react";

const Title = (props) => {
  const { children } = props;

  return <div className="mb-1x">{children}</div>;
};

const Divider = (props) => {
  return <hr {...props} />;
};

const Text = (props) => {
  const { children } = props;

  return (
    <h1 className="h4 mb-0" style={{ fontWeight: 500 }} {...props}>
      {children}
    </h1>
  );
};

const SubText = (props) => {
  const { children } = props;
  return (
    <div className="text-muted" {...props}>
      {children}
    </div>
  );
};

Title.Text = Text;
Title.SubText = SubText;
Title.Divider = Divider;

export { Text, SubText, Divider };
export default Title;
