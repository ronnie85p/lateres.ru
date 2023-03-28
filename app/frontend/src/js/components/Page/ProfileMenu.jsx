import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import Preloader from "@js/components/Preloader";
import { useRequest } from "@js/components/Request";
import { useModal, ModalContainer } from "@js/components/Modal";

export default (props) => {
  const context = React.useContext(Context);
  const request = useRequest({
    action: "web/auth/logout",
    onSuccess({ object }) {
      let redirect = object.redirect;
      if (!redirect) {
        redirect = window.location.href;
      }

      window.location.href = redirect;
    },
  });

  const modal = useModal({
    minHeight: 50,
    showBtnClose: false,
    title: (
      <>
        <Icon name="box-arrow-right" /> Выход
      </>
    ),
    body: (
      <>
        <div className="fs-6 text-center my-3">Возвращайтесь к нам еще</div>
      </>
    ),
    buttons: [
      {
        text: "Выйти",
        onClick() {
          modal.hide();
          request.send();
        },
      },
    ],
  });

  const handleLogoutClick = (event) => {
    event.preventDefault();

    modal.show();
  };

  return (
    <>
      <Preloader show={request.state === "pending"} />
      <ModalContainer modal={modal} />

      <Dropdown.Menu style={{ zIndex: 12345 }}>
        <Dropdown.Item
          as={Link}
          to="/lk/profile"
          className="text-secondary"
          style={{ fontSize: ".85em" }}
        >
          Перейти на стр
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          as={Link}
          to="/lk/settings"
          style={{ fontSize: ".85em" }}
        >
          <Icon name="gear" /> Настройки
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          href="#"
          style={{ fontSize: ".85em" }}
          onClick={handleLogoutClick}
        >
          <Icon name="box-arrow-in-left" /> Выйти
        </Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
};
