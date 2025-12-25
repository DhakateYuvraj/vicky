'use client';

import { Offcanvas, Button, Form } from 'react-bootstrap';

export default function TireJobDrawer({
  show,
  onClose,
  tire,
  onSwap,
  availableTires
}) {
  if (!tire) return null;

  return (
    <Offcanvas show={show} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Tire Job Card</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <h5 className="mb-3">Tire Details</h5>

        <p><strong>Label:</strong> {tire.data.label}</p>
        <p><strong>Position:</strong> {tire.data.position}</p>

        <hr />

        <h6>Assign Job</h6>

        <Form.Group className="mb-3">
          <Form.Label>Job Type</Form.Label>
          <Form.Select>
            <option>Inspection</option>
            <option>Rotation</option>
            <option>Replacement</option>
            <option>Repair</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Remarks</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <hr />

        <h6>Swap Tire Position</h6>

        <Form.Select
          onChange={(e) => onSwap(tire.id, e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select tire to swap with
          </option>

          {availableTires
            .filter(t => t.id !== tire.id)
            .map(t => (
              <option key={t.id} value={t.id}>
                {t.data.label} ({t.data.position})
              </option>
            ))}
        </Form.Select>

        <div className="d-grid mt-4">
          <Button variant="primary">Save Job Card</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
