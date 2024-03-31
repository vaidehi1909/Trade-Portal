import React, { useEffect, useState } from "react";
import { Avatar, Card, Skeleton, Button } from "antd";
const { Meta } = Card;

const dataUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";

const PriceCard = ({ loading, currency = {} }) => {
  return (
    <Card style={{ width: 300, marginBottom: 16 }} loading={loading}>
      <div style={{ fontWeight: "bold" }}>
        {currency?.code} {currency?.rate}
      </div>
      <div>{currency?.description}</div>
    </Card>
  );
};

const PriceCardList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setData(response);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <>
        <div>Error: Something Went Wrong!</div>
        <Button onClick={fetchData}>Retry</Button>
      </>
    );
  }

  if (loading) {
    return new Array(3)
      .fill(null)
      .map((_, index) => <PriceCard key={index} loading={loading} />);
  }
  return Object.keys(data.bpi).map((key) => (
    <PriceCard key={key} currency={data.bpi[key]} />
  ));
};

export default PriceCardList;
