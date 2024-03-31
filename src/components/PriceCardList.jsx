import React, { useEffect, useState } from "react";
import { Avatar, Card, Skeleton, Button, Col, Row, Carousel } from "antd";
const { Meta } = Card;

const dataUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";

const PriceCard = ({ loading, currency = {} }) => {
  const decodeHTMLEntities = (str) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return doc.documentElement.textContent;
  };
  return (
    <Card
      loading={loading}
      className="module-border-wrap"
      // id="scale-up-1"
      hoverable
      style={{
        margin: "10px",
        padding: "10px",
        boxShadow: "1px 4px 8px rgba(0,0,0,0.1)",
      }}
      cover={
        <div style={{ paddingBottom: "2px" }}>
          <p style={{ fontSize: 32, margin: 0, fontWeight: 600 }}>
            {!loading && currency?.code}
          </p>
          <p style={{ fontSize: 32, margin: 0, fontWeight: 600 }}>
            {!loading &&
              decodeHTMLEntities(currency?.symbol) + " " + currency?.rate_float}
          </p>
        </div>
      }>
      <div style={{ textAlign: "left" }}>
        <p style={{ marginBottom: 4 }}>{currency?.description}</p>
      </div>
    </Card>
  );
};

const PriceCardList = ({ grid = true }) => {
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
  if (grid) {
    return (
      <>
        <Row>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            lg={{ span: 6 }}
            xl={{ span: 6 }}
            xxl={{ span: 6 }}>
            {Object.keys(data.bpi).map((key) => (
              <PriceCard key={key} currency={data.bpi[key]} />
            ))}
          </Col>
        </Row>
      </>
    );
  }
  return (
    <>
      <Carousel autoplay>
        {Object.keys(data.bpi).map((key) => (
          <PriceCard key={key} currency={data.bpi[key]} />
        ))}
      </Carousel>
    </>
  );
};

export default PriceCardList;
