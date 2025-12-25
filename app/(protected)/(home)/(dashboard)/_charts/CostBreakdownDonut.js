"use client";

import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";

export default function CostBreakdownDonut() {
  const options = {
    labels: ["Purchase", "Repair", "Scrap Loss"],
    colors: ["#0d6efd", "#ffc107", "#dc3545"],
    legend: { position: "bottom" }
  };

  const series = [480000, 125000, 45000];

  return (
    <Card className="shadow-sm">
      <Card.Header className="fw-semibold">
        Cost Breakdown (₹)
      </Card.Header>
      <Card.Body>
        <Chart type="donut" options={options} series={series} height={300} />
      </Card.Body>
    </Card>
  );
}
