'use client';

import { Button } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

export default function TireBulkActions({ count, onClear }) {
  return (
    <div className="card mb-3 border-primary bg-primary-subtle">
      <div className="card-body py-2 d-flex justify-content-between align-items-center">
        <div>
          <strong>{count}</strong> selected
        </div>

        <div className="d-flex gap-2">
          <Button size="sm" variant="outline-primary">
            Change Status
          </Button>
          <Button size="sm" variant="outline-danger">
            Delete
          </Button>
          <Button size="sm" variant="outline-secondary">
            Export
          </Button>
          <Button size="sm" variant="link" onClick={onClear}>
            <X size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
