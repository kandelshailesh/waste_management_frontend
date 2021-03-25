import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card } from "antd";
import PieChartOne from "./PieChartOne";

const { Meta } = Card;

const DashboardCard = ({ title, cardSubTitle, description }) => {
  return (
    <Card
      hoverable
      title={title}
      style={{
        margin: "1rem",
        textAlign: "center",
      }}
    >
      <PieChartOne />
      <Meta title={cardSubTitle} description={description} />
    </Card>
  );
};

export default DashboardCard;
