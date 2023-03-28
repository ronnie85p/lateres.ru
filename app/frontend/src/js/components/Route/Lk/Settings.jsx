import React, {
  useEffect,
  useContext,
  useState,
  createRef,
  Children,
} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import { useRequest, Suspense, sendRequest } from "@js/components/Http/Request";
import { useForm } from "@js/components/Form";
import { useFile } from "@js/components/Files/File";
import Button from "@js/components/Form/Button";
import Aside from "./Aside";
import LoadContent from "./LoadContent";
import ChangePasswordForm from "./Settings/Security/ChangePassword";
import LoginSettingsForm from "./Settings/Security/LoginSettings";
import LoginStoriesList from "./Settings/Security/LoginStories";

export default (props) => {
  const { resource, user } = useContext(Context);

  const request = useRequest({
    params: {
      action: "web/profile/menu/getList",
    },
  });

  return (
    <>
      <Suspense
        request={request}
        LoadingComponent={() => <>Loading...</>}
        ErrorComponent={({ error }) => <>{error.message}</>}
      >
        {({ response }) => (
          <Aside>
            <Aside.Menu items={response.results} />

            <Aside.Content title={resource.longtitle}>
              <Card className="pb-2 pt-2">
                <Card.Body>
                  <LoadContent
                    params={{ action: "web/profile/passport/get" }}
                  />
                  {/* <LoginSettingsForm /> */}
                  <LoginStoriesList />
                  {/* <ChangePasswordForm /> */}
                </Card.Body>
              </Card>
            </Aside.Content>
          </Aside>
        )}
      </Suspense>
    </>
  );
};
