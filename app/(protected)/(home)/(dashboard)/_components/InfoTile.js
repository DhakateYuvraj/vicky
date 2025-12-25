import { Card } from "react-bootstrap";

export default function InfoTile({ label, value, icon, color }) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body className="d-flex align-items-center gap-3">
        <div className={`icon-shape bg-${color}-soft text-${color}`}>
          <i className={`mdi ${icon}`} />
        </div>
        <div>
          <h6 className="mb-0">{value}</h6>
          <small className="text-muted">{label}</small>
        </div>
      </Card.Body>
    </Card>
  );
}
