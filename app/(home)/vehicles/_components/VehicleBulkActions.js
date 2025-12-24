'use client';

import { useState } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { CheckSquare, X, Download, Trash2, AlertCircle } from 'react-feather';

export default function VehicleBulkActions({ count, onClear }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const handleExport = () => {
    console.log(`Exporting ${count} vehicles`);
    alert(`Exporting ${count} vehicles to CSV`);
  };

  const handleStatusChange = () => {
    if (!newStatus) return;
    console.log(`Changing status of ${count} vehicles to ${newStatus}`);
    alert(`Status changed for ${count} vehicles`);
    setShowStatusModal(false);
    setNewStatus('');
  };

  const handleDelete = () => {
    console.log(`Deleting ${count} vehicles`);
    alert(`${count} vehicles marked for deletion`);
    setShowDeleteModal(false);
    onClear();
  };

  return (
    <>
      <div className="bulk-actions-bar bg-warning bg-opacity-10 border border-warning rounded p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <CheckSquare size={20} className="text-warning" />
            <div>
              <strong className="text-warning">{count} vehicle(s) selected</strong>
              <div className="text-muted small">Choose an action below</div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            {/* Status Change Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" size="sm">
                Change Status
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShowStatusModal(true)}>
                  Set Custom Status
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => {}}>Mark as Active</Dropdown.Item>
                <Dropdown.Item onClick={() => {}}>Mark as Inactive</Dropdown.Item>
                <Dropdown.Item onClick={() => {}}>Send to Maintenance</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Export Button */}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleExport}
            >
              <Download size={16} className="me-1" />
              Export Selected
            </Button>

            {/* Delete Button */}
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 size={16} className="me-1" />
              Delete
            </Button>

            {/* Clear Selection */}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={onClear}
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <AlertCircle className="text-danger me-2" />
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete {count} selected vehicle(s)?</p>
          <p className="text-danger small">
            <strong>Warning:</strong> This action cannot be undone. All vehicle data, 
            including tyre history and maintenance records, will be permanently deleted.
          </p>
          <Form.Check 
            type="checkbox"
            label="I understand this action is irreversible"
            id="delete-confirm"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete {count} Vehicle(s)
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Status Change Modal */}
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Vehicle Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>New Status for {count} vehicle(s)</Form.Label>
            <Form.Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
              <option value="accident">Accident Repair</option>
              <option value="scrapped">Scrapped</option>
            </Form.Select>
            <Form.Text className="text-muted">
              This will update the status of all selected vehicles.
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleStatusChange}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}