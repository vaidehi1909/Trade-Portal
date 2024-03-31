import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/Sidebar";
import { Layout } from "antd";

function AppLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Outlet />
    </Layout>
  );
}

export default AppLayout;
