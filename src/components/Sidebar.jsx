import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Row, Col } from "antd";
import {
  HomeOutlined,
  DollarOutlined,
  WalletOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";

const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(<NavLink to="/">Home</NavLink>, "/", <HomeOutlined />),
  getItem(<NavLink to="/price">Price</NavLink>, "/price", <DollarOutlined />),
  getItem(
    <NavLink to="/wallet">Wallet</NavLink>,
    "/wallet",
    <WalletOutlined />
  ),
];

const SideBar = ({ width }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (location) {
      if (currentPath !== location.pathname) {
        setCurrentPath(location.pathname);
      }
    }
  }, [location]);

  const onBreakpoint = (broken) => {
    if (broken) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  return (
    <Sider
      breakpoint="md"
      onBreakpoint={onBreakpoint}
      collapsible
      width="250px"
      trigger={null}
      collapsed={collapsed}>
      <Row>
        <Col>
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ color: "white" }} />
              ) : (
                <MenuFoldOutlined style={{ color: "white" }} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "26px",
              width: 64,
              height: 64,
            }}
          />
        </Col>
      </Row>
      <Menu
        theme="dark"
        mode="inline"
        onClick={(e) => setCurrentPath(e.key)}
        selectedKeys={[currentPath]}
        items={items}
      />
    </Sider>
  );
};

export default SideBar;
