import React from "react";
import BootstrapSpinner from "react-bootstrap/Spinner";

const defaultProps = {
  show: false,
  showSpinner: true,
  position: "fixed",
  spinner: {},
  backdrop: {},
  containerProps: {},
  contentProps: {},
  spinnerProps: {},
  textProps: {},
};

const backdropDefaultProps = {
  position: "fixed",
  background: "rgba(255 255 255 / .3)",
  zIndex: 1234,
};

const Backdrop = (props) => {
  const { position, background, zIndex, children } = {
    ...backdropDefaultProps,
    ...props,
  };

  return (
    <div
      className={`preloader-backdrop`}
      style={{ background, zIndex, position }}
    >
      {children}
    </div>
  );
};

const Spinner = (props) => {
  const { size = "md" } = props;

  return (
    <>
      <div className={`spinner spinner-${size}`}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );
};

const Preloader = (props) => {
  const {
    show,
    showSpinner,
    position,
    backdrop,
    spinner,
    text,
    containerProps,
    contentProps,
    spinnerProps,
    textProps,
  } = {
    ...defaultProps,
    ...props,
  };

  return (
    <div
      {...containerProps}
      className={
        "preloader" +
        (containerProps?.className ? ` ${containerProps?.className}` : "") +
        (show ? " show" : "")
      }
    >
      <Backdrop {...{ ...backdrop, position }}>
        <div
          {...contentProps}
          className={
            "preloader-content" +
            (contentProps?.className ? ` ${contentProps.className}` : "")
          }
        >
          {showSpinner ? (
            <div
              {...spinnerProps}
              className={
                "preloader-spinner" +
                (spinnerProps?.className ? ` ${spinnerProps?.className}` : "")
              }
            >
              <Spinner {...spinner} />
            </div>
          ) : (
            <></>
          )}

          {text ? (
            <div
              {...textProps}
              className={
                "preloader-text" +
                (textProps?.className ? ` ${textProps?.className}` : "")
              }
            >
              {text}
            </div>
          ) : (
            <></>
          )}
        </div>
      </Backdrop>
    </div>
  );
};

const PreloaderSm = (props) => {
  return <Preloader position="absolute" spinner={{ size: "sm" }} {...props} />;
};

const PreloaderParent = ({ children }) => {
  return <div className="position-relative">{children}</div>;
};

export { PreloaderSm, PreloaderParent };
export default Preloader;
