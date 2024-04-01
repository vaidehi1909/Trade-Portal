import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row, Carousel } from "antd";

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
      className="module-border-wrap price-card "
      hoverable
      cover={
        <div className="padding-bottom">
          <p className="price-font">{!loading && currency?.code}</p>
          <p className="price-font price-ellipsis">
            {!loading &&
              decodeHTMLEntities(currency?.symbol) + " " + currency?.rate}
          </p>
        </div>
      }>
      <div className="text-left">
        <p className="margin-bottom">{currency?.description}</p>
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
        <Row gutter={16} justify="center" className="text-center">
          {Object.keys(data.bpi).map((key) => (
            <Col xs={24} sm={24} lg={8} xl={8} xxl={8} className="text-center">
              <PriceCard key={key} currency={data.bpi[key]} />
            </Col>
          ))}
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
