import React from "react";
import { Layout, theme } from "antd";

const PageContent = ({ children, ...props }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout.Content
      style={{
        margin: "24px 16px 0",
        overflow: "initial",
        borderRadius: borderRadiusLG,
        background: colorBgContainer,
      }}
      {...props}>
      {children}
    </Layout.Content>
  );
};

export default PageContent;
