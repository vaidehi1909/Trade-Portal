import React from "react";
import { Layout } from "antd";
import PopulationChart from "../../components/PopulationChart";
import PageContent from "../../components/PageContent";
import Header from "../../components/Header";
import "./index.css";

const Home = () => {
  return (
    <Layout>
      <Header>Home</Header>
      <PageContent>
        <PopulationChart />
      </PageContent>
    </Layout>
  );
};

export default Home;
