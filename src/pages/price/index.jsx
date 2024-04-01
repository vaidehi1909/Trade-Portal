import React from "react";
import { Layout } from "antd";
import PriceCardList from "../../components/PriceCardList";
import Header from "../../components/Header";
import PageContent from "../../components/PageContent";
import "./index.css";

const Home = () => {
  return (
    <Layout>
      <Header>Bitcoin Price Analysis</Header>
      <PageContent>
        <PriceCardList />
      </PageContent>
    </Layout>
  );
};

export default Home;
