"use client";

import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";

export default function StatusDonut() {
  const options = {
    labels: ["Active", "In Stock", "Repair", "Scrapped"],
    colors: ["#28a745", "#17a2b8", "#ffc107", "#dc3545"],
    legend: { position: "bottom" }
  };

  const series = [845, 285, 45, 23];

  return (
    <Card className="shadow-sm">
      <Card.Header className="fw-semibold">
        Tyre Status Distribution
      </Card.Header>
      <Card.Body>
        <Chart type="donut" options={options} series={series} height={300} />
      </Card.Body>
    </Card>
  );
}
