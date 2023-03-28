import React, { useState } from "react";
import BsModal from "react-bootstrap/Modal";
import Icon from "@js/components/Icon";
import Button from "@js/components/Form/Button";

const defaultProps = {
  minHeight: 100,
  title: null,
  titleClassName: "",
  titleProps: {},
  titleIcon: null,
  titleIconProps: {},
  header: null,
  headerClassName: "",
  headerProps: {},
  body: null,
  bodyClassName: "",
  bodyProps: {},
  footer: null,
  footerClassName: "",
  footerProps: {},
  showBtnClose: true,
  btnCloseText: "Закрыть",
  btnCloseProps: { variant: "secondary" },
};

const useModal = (props) => {
  const [isShown, setShown] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [header, setHeader] = useState(props.header);
  const [body, setBody] = useState(props.body);
  const [footer, setFooter] = useState(props.footer);

  const show = () => {
    setShown(true);
  };

  const hide = () => {
    setShown(false);
  };

  const getProps = () => {
    return { title, header, body, footer, ...props };
  };

  return {
    isShown,
    show,
    hide,
    setTitle,
    setHeader,
    setBody,
    setFooter,
    getProps,
  };
};

const Modal = (props) => {
  const _props = {
    ...defaultProps,
    ...props,
  };

  const {
    minHeight,
    title,
    titleClassName,
    titleProps,
    titleIcon,
    titleIconClassName,
    titleIconProps,
    header,
    headerClassName,
    headerProps,
    body,
    bodyClassName,
    bodyProps,
    footer,
    footerClassName,
    footerProps,
  } = _props;

  const TitleIcon = () => {
    return titleIcon ? (
      <Icon
        {...titleIconProps}
        className={
          "mr-2 mb-1" + titleIconClassName ? ` ${titleIconClassName}` : ""
        }
        name={titleIcon}
      />
    ) : (
      <></>
    );
  };

  const Title = () => {
    return (
      <BsModal.Title
        as="h5"
        {...titleProps}
        className={"mb-0" + titleClassName ? ` ${titleClassName}` : ""}
      >
        <TitleIcon /> {title}
      </BsModal.Title>
    );
  };

  const modalProps = {};
  const modalDefaultProps = [
    "animation",
    "autoFocus",
    "backdrop",
    "backdropClassName",
    "centered",
    "container",
    "contentClassName",
    "dialogAs",
    "dialogClassName",
    "enforceFocus",
    "fullscreen",
    "keyboard",
    "manager",
    "restoreFocus",
    "restoreFocusOptions",
    "scrollable",
    "size",
    "bsPrefix",
    "show",
    "onHide",
    "onShow",
    "onEnter",
    "onEntered",
    "onEntering",
    "onEscapeKeyDown",
    "onExit",
    "onExited",
    "onExiting",
  ];

  for (let i in modalDefaultProps) {
    let prop = modalDefaultProps[i];
    if (prop in _props) {
      modalProps[prop] = _props[prop];
    }
  }

  return (
    <BsModal {...modalProps}>
      <BsModal.Header closeButton className={headerClassName} {...headerProps}>
        {header ? header : <Title />}
      </BsModal.Header>
      <BsModal.Body
        className={bodyClassName}
        {...bodyProps}
        style={{ ...bodyProps.style, minHeight }}
      >
        {body}
      </BsModal.Body>
      <BsModal.Footer className={footerClassName} {...footerProps}>
        {footer}
      </BsModal.Footer>
    </BsModal>
  );
};

const ModalContainer = (props) => {
  const { modal } = props;
  const modalProps = { ...defaultProps, ...modal.getProps() };
  const { footer, buttons, showBtnClose, btnCloseText, btnCloseProps } =
    modalProps;

  const handleHide = (event) => {
    modal.hide();

    modalProps.onHide && modalProps.onHide(event);
  };

  const Footer = (
    <>
      {footer}

      {buttons?.map((item, index) => (
        <Button {...item} key={index} text={null}>
          {item.text}
        </Button>
      ))}

      {showBtnClose ? (
        <Button {...btnCloseProps} onClick={handleHide}>
          {btnCloseText}
        </Button>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <Modal
      {...{ ...modalProps, footer: Footer }}
      show={modal.isShown}
      onHide={handleHide}
    />
  );
};

export default Modal;
export { useModal, Modal, ModalContainer };
