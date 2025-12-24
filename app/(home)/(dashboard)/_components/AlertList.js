import { Card, Badge } from "react-bootstrap";

export default function AlertList() {
  const alerts = [
    { title: "Low Tread Depth", count: 5, variant: "danger" },
    { title: "Overdue Inspections", count: 12, variant: "warning" },
    { title: "Warranty Expiring", count: 23, variant: "info" }
  ];

  return (
    <Card className="shadow-sm">
      <Card.Header className="fw-semibold">
        Alerts & Notifications
      </Card.Header>
      <Card.Body>
        {alerts.map((a, i) => (
          <div
            key={i}
            className="d-flex justify-content-between align-items-center mb-2"
          >
            <span>{a.title}</span>
            <Badge bg={a.variant}>{a.count}</Badge>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}
