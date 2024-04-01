import React from "react";
import { Layout } from "antd";

import PageContent from "../../components/PageContent";
import Header from "../../components/Header";
import MetaMask from "../../components/MetaMask";

const Wallet = () => {
  return (
    <Layout>
      <Header>Wallet Details</Header>
      <PageContent>
        <MetaMask />
      </PageContent>
    </Layout>
  );
};

export default Wallet;
