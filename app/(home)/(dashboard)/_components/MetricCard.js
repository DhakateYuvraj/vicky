import { Card } from "react-bootstrap";

export default function MetricCard({ title, value, color }) {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="text-muted mb-1">{title}</h6>
            <h3 className={`text-${color} fw-bold mb-0`}>
              {value}
            </h3>
          </div>
          <div className={`icon-shape icon-lg bg-${color}-soft text-${color}`}>
            <i className="mdi mdi-chart-line"></i>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
