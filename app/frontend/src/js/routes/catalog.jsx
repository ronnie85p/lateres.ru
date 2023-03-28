import React from "react";
import { useLoaderData } from "react-router-dom";
import Context from "@js/contexts/context";
import Container from "@js/components/Page/Container";
import Title from "@js/components/Page/Title";
import Layer from "@js/components/Page/Layer";

export default () => {
  const context = React.useContext(Context);
  const [data] = useLoaderData();

  return (
    <Context.Provider
      value={{
        ...context,
        data,
      }}
    >
      <Container className="category">
        <Title>
          <Title.Text>
            {data.resource.pagetitle}{" "}
            <span className="text-muted" style={{ fontSize: ".6em" }}>
              {/* {products?.total} товаров */}
            </span>
          </Title.Text>
        </Title>

        <Content />
      </Container>
    </Context.Provider>
  );
};

const Content = (props) => {
  const context = React.useContext(Context);

  return <>Content</>;
};
