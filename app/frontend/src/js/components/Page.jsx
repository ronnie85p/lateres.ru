import React from "react";
import TopPanel from "./Page/TopPanel";
import Header from "./Page/Header";
import Title from "./Page/Title";
import Content from "./Page/Content";
import Footer from "./Page/Footer";
import Container from "./Page/Container";

const Page = (props) => {
  const { children } = props;
  return <>{children}</>;
};

Page.TopPanel = TopPanel;
Page.Header = Header;
Page.Title = Title;
Page.Content = Content;
Page.Container = Container;
Page.Footer = Footer;

export default Page;
