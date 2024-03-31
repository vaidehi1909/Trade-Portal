import { Layout, theme } from "antd";

const Header = ({ children, ...props }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout.Header
      style={{
        padding: 0,
        background: colorBgContainer,
        textAlign: "center",
        fontSize: "x-large",
        fontWeight: "700",
      }}
      {...props}>
      {children}
    </Layout.Header>
  );
};

export default Header;
