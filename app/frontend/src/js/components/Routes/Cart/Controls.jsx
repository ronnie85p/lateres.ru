import React from "react";

import Context from "@js/contexts/context";
import { useRequest } from "@js/components/Request";
import Form from "@js/components/Form";

export default (props) => {
  const { data, checkedItems, updateData } = React.useContext(Context);

  const requestCheckedAll = useRequest({
    action: "web/cart/setCheckedAll",
  });

  const requestRemove = useRequest({
    action: "web/cart/remove",
  });

  const handleToggleCheckAll = (event) => {
    const _this = event.currentTarget;
    const checked = _this.checked;

    requestCheckedAll
      .send({ checked })
      .then(() => {
        let items = data.items.map((item) => {
          return { ...item, checked };
        });

        updateData({ fields: ["items", "status"], items, status: "changing" });
      })
      .catch((error) => {
        updateData({ fields: ["error", "status"], error, status: "error" });
      });
  };

  const handleRemoveChecked = (event) => {
    event.preventDefault();

    if (
      !confirm(`Удалить выбранные товары(${checkedItems.length}) из корзины?`)
    )
      return false;

    requestRemove
      .send({ keys: checkedItems })
      .then(({ object }) => {
        const items = [];

        if (items.length > 0) {
          //
        } else {
          // navigate("/cart");
          window.location.reload();
        }
      })
      .catch((error) => {
        updateData({ fields: ["error", "status"], error, status: "error" });
      });
  };

  return (
    <div className="cart-controls">
      <Form.Check
        id="check-all"
        checked={checkedItems.length > 0}
        onChange={handleToggleCheckAll}
        inline
      />

      {checkedItems.length > 0 ? (
        <a href="#" onClick={handleRemoveChecked}>
          Удалить выбранные ({checkedItems.length})
        </a>
      ) : (
        <></>
      )}
    </div>
  );
};
