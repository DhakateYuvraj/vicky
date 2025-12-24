"use client";

import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";

export default function MonthlyTrend() {
  const options = {
    chart: { id: "monthly" },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] }
  };

  const series = [
    { name: "New Purchases", data: [45, 52, 48, 65, 58, 62] },
    { name: "Disposals", data: [8, 10, 12, 15, 18, 23] }
  ];

  return (
    <Card className="shadow-sm">
      <Card.Header className="fw-semibold">
        Monthly Tyre Movement
      </Card.Header>
      <Card.Body>
        <Chart type="line" options={options} series={series} height={300} />
      </Card.Body>
    </Card>
  );
}
