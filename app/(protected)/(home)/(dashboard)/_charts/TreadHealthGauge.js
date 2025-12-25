"use client";

import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";

export default function TreadHealthGauge() {
  const options = {
    plotOptions: {
      radialBar: {
        hollow: { size: "70%" },
        dataLabels: {
          value: { fontSize: "22px" }
        }
      }
    },
    labels: ["Avg Tread Depth"],
    colors: ["#198754"]
  };

  const series = [72]; // % health

  return (
    <Card className="shadow-sm">
      <Card.Header className="fw-semibold">
        Tread Health Index
      </Card.Header>
      <Card.Body>
        <Chart type="radialBar" options={options} series={series} height={300} />
      </Card.Body>
    </Card>
  );
}
