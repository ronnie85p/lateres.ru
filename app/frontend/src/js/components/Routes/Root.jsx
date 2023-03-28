import React, { useContext } from "react";
import { Outlet, useNavigation, useLoaderData } from "react-router-dom";
import Context from "@js/contexts/context";
import Preloader from "@js/components/Preloader";
import Page from "@js/components/Page";

export default (props) => {
  const context = useContext(Context);
  const config = useLoaderData();
  const navigation = useNavigation();

  return (
    <Context.Provider value={{ ...context, config }}>
      <Preloader show={navigation.state === "loading"} />
      <Page>
        <Page.TopPanel />
        <Page.Header />

        <Page.Container className="mt-2x mb-2x" style={{ minHeight: 400 }}>
          <Outlet />
        </Page.Container>

        <Page.Footer />
      </Page>
    </Context.Provider>
  );
};
