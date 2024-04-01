import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import SideBar from "./components/Sidebar";

function AppLayout() {
  return (
    <Layout style={{ minHeight: "97vh" }}>
      <SideBar />
      <Outlet />
    </Layout>
  );
}

export default AppLayout;
