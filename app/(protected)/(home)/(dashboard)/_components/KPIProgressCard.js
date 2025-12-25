import { Card, ProgressBar } from "react-bootstrap";

export default function KPIProgressCard({
  title,
  value,
  max,
  unit,
  variant = "primary"
}) {
  const percentage = Math.min(100, (value / max) * 100);

  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <h6 className="text-muted mb-2">{title}</h6>

        <div className="d-flex align-items-end gap-1 mb-2">
          <h3 className="fw-bold mb-0">{value}</h3>
          <span className="text-muted">{unit}</span>
        </div>

        <ProgressBar
          now={percentage}
          variant={variant}
          style={{ height: 6 }}
        />

        <small className="text-muted">
          Target: {max} {unit}
        </small>
      </Card.Body>
    </Card>
  );
}
