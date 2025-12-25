"use client";

import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";

export default function TireAgeBar() {
  const options = {
    chart: { toolbar: { show: false } },
    xaxis: {
      categories: ["0-6m", "6-12m", "1-2y", "2-3y", "3y+"]
    },
    colors: ["#6f42c1"]
  };

  const series = [
    {
      name: "Tires",
      data: [220, 340, 280, 190, 70]
    }
  ];

  return (
    <Card className="shadow-sm">
      <Card.Header className="fw-semibold">
        Tire Age Distribution
      </Card.Header>
      <Card.Body>
        <Chart type="bar" options={options} series={series} height={300} />
      </Card.Body>
    </Card>
  );
}
