import { Card } from "react-bootstrap";

export default function ActivityFeed() {
  const activities = [
    "Tyre TY-0451 installed on TRK-1234",
    "Inspection completed for BUS-5678",
    "15 Michelin tyres added to stock",
    "TY-0123 scrapped"
  ];

  return (
    <Card className="shadow-sm">
      <Card.Header className="fw-semibold">
        Recent Activity
      </Card.Header>
      <Card.Body>
        <ul className="list-unstyled mb-0">
          {activities.map((a, i) => (
            <li key={i} className="mb-2 text-muted">
              • {a}
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
}
