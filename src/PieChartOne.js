import React from "react";
import ReactDOM from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// Make monochrome colors
var pieColors = (function () {
  var colors = [],
    base = Highcharts.getOptions().colors[0],
    i;

  for (i = 0; i < 10; i += 1) {
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
    colors.push(
      Highcharts.color(base)
        .brighten((i - 3) / 7)
        .get()
    );
  }
  return colors;
})();

const PieChartOne = () => {
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        colors: pieColors,
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
          distance: -40,
          filter: {
            property: "percentage",
            operator: ">",
            value: 4,
          },
        },
      },
    },
    series: [
      {
        name: "Share",
        data: [
          { name: "Chrome", y: 61.41 },
          { name: "Internet Explorer", y: 11.84 },
          { name: "Firefox", y: 10.85 },
          { name: "Other", y: 7.05 },
        ],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PieChartOne;
