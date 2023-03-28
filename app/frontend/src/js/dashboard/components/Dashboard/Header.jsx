import React from "react";
import Container from "./Container";

const styles = {
  header: {
    height: 50,
    backgroundColor: "#004b7a",
  },
};

const Header = (props) => {
  const { children } = props;

  return (
    <>
      <div className="dashboard-header" style={styles.header}>
        <Container {...props}>{children}</Container>
      </div>
    </>
  );
};

export default Header;
