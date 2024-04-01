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
    height: 400,
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

  return <Line {...props} />;
};
export default PopulationChart;
