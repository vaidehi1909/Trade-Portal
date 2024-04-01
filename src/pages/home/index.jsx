import React from "react";
import { Layout, Card, Col, Row } from "antd";
import PopulationChart from "../../components/PopulationChart";
import PageContent from "../../components/PageContent";
import Header from "../../components/Header";
import PriceCardList from "../../components/PriceCardList";
import "./index.css";

const colProps = { xs: 24, sm: 24, md: 24 };

const Home = () => {
  return (
    <Layout>
      <Header>Home</Header>
      <PageContent>
        <Row gutter={10} className="chart-row">
          <Col {...colProps} lg={12} xl={12} className="chart-col">
            <Card title="Population Chart" className="box-shadow">
              <PopulationChart />
            </Card>
          </Col>
          <Col {...colProps} lg={10} xl={10} className="chart-col">
            <Card title="Bitcoin Prices" className="box-shadow">
              <PriceCardList grid={false} />
            </Card>
          </Col>
        </Row>
      </PageContent>
    </Layout>
  );
};

export default Home;
