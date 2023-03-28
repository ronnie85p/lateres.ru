import React, { useContext } from "react";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";

export default (props) => {
  const context = useContext(Context);
  const { user } = context;
  const className = ["profile-avatar", props.className]
    .filter((value) => typeof value !== "undefined" || value != "")
    .join(" ");

  return (
    <>
      <div {...props} className={className}>
        <Card className="border-0 border-bottom">
          <Card.Body>
            <div className="d-flex">
              <Image
                className="mr-4"
                src={user?.photo}
                style={{ height: 100 }}
                roundedCircle
              />
              <div className="fs-5 flex-fill">{user?.fullname}</div>
            </div>

            <div className="mt-4 text-muted">{user.comment}</div>

            <div className="mt-2">
              <a href="/lk/">
                <Icon name="pencil-square" /> Редактировать
              </a>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
