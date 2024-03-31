import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";
import { Card, Col, Row } from "antd";
import PriceCardList from "./PriceCardList";

const datURL =
  "https://datausa.io/api/data?drilldowns=Nation&measures=Population";

const PopulationChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch(datURL)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setData(response?.data || []);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const props = {
    data,
    padding: "auto",
    xField: "ID Year",
    yField: "Population",
    sizeField: "Population",
    shapeField: "trail",
    legend: { size: false },
    axis: {
      y: { title: "Population" },
      x: { title: "Year" },
    },
    colorField: "Nation",
  };

  if (error) {
    return (
      <>
        <div>Error: Something Went Wrong!</div>
        <Button onClick={fetchData}>Retry</Button>
      </>
    );
  }

  return (
    <>
      <Row
        gutter={10}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 15 }}
          xl={{ span: 15 }}
          style={{ textAlign: "center", padding: "20px" }}>
          <Card
            title="Population Chart"
            style={{ boxShadow: "1px 4px 8px rgba(0,0,0,0.1)" }}>
            <Line {...props} />
          </Card>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 8 }}
          xl={{ span: 8 }}
          style={{
            padding: "20px",
            textAlign: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}>
          <Card
            title="Bitcoin Prices"
            style={{ boxShadow: "1px 4px 8px rgba(0,0,0,0.1)" }}>
            <PriceCardList grid={false} />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default PopulationChart;
