// File: /app/vehicles/_components/VehicleSearchFilters.js

"use client";

import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Badge,
  OverlayTrigger,
  Popover,
  Row,
  Col,
} from "react-bootstrap";
import { Funnel } from "react-bootstrap-icons";
import { VEHICLE_TYPES, VEHICLE_STATUSES, VEHICLE_MAKES, FUEL_TYPES } from "../_data/vehicles.data";

const SIZE_MAP = {
  sm: {
    control: "sm",
    icon: 16,
    badgeFont: "0.65rem",
    popoverWidth: 450,
    gap: 2,
  },
  md: {
    control: undefined,
    icon: 18,
    badgeFont: "0.7rem",
    popoverWidth: 500,
    gap: 2,
  },
  lg: {
    control: "lg",
    icon: 20,
    badgeFont: "0.75rem",
    popoverWidth: 550,
    gap: 3,
  },
};

export default function VehicleSearchFilters({
  search,
  onSearch,
  filters,
  onApplyFilters,
  size = "md",
}) {
  const cfg = SIZE_MAP[size];

  const [localFilters, setLocalFilters] = useState(filters);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Departments for filter
  const departments = ['Logistics', 'Transport', 'Service', 'Maintenance', 'Sales', 'Admin', 'Operations'];

  // Count active filters (excluding search)
  const activeCount = Object.entries(filters || {}).filter(([key, value]) => 
    value && value !== '' && key !== 'search'
  ).length;

  const handleApply = () => {
    onApplyFilters(localFilters);
    setShow(false);
  };

  const handleCancel = () => {
    setLocalFilters(filters);
    setShow(false);
  };

  const handleClear = () => {
    setLocalFilters({});
    onApplyFilters({});
    setShow(false);
  };

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value === '' ? undefined : value
    }));
  };

  const popover = (
    <Popover className="shadow-md" style={{ minWidth: cfg.popoverWidth }}>
      <Popover.Header className="fw-semibold py-2">Vehicle Filters</Popover.Header>

      <Popover.Body className="py-2">
        <Row className="g-2">
          {/* Vehicle Type */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small mb-1">Vehicle Type</Form.Label>
              <Form.Select
                size={cfg.control}
                value={localFilters.vehicleType || ""}
                onChange={(e) => handleFilterChange('vehicleType', e.target.value)}
              >
                <option value="">All Types</option>
                {VEHICLE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Status */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small mb-1">Status</Form.Label>
              <Form.Select
                size={cfg.control}
                value={localFilters.status || ""}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                {VEHICLE_STATUSES.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Make */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small mb-1">Make</Form.Label>
              <Form.Select
                size={cfg.control}
                value={localFilters.make || ""}
                onChange={(e) => handleFilterChange('make', e.target.value)}
              >
                <option value="">All Makes</option>
                {VEHICLE_MAKES.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Fuel Type */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small mb-1">Fuel Type</Form.Label>
              <Form.Select
                size={cfg.control}
                value={localFilters.fuelType || ""}
                onChange={(e) => handleFilterChange('fuelType', e.target.value)}
              >
                <option value="">All Fuel Types</option>
                {FUEL_TYPES.map(fuel => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Department */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small mb-1">Department</Form.Label>
              <Form.Select
                size={cfg.control}
                value={localFilters.department || ""}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Year Range */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small mb-1">Year Range</Form.Label>
              <div className="d-flex gap-1">
                <Form.Control
                  size={cfg.control}
                  type="number"
                  placeholder="From"
                  min="2000"
                  max="2024"
                  value={localFilters.yearMin || ""}
                  onChange={(e) => handleFilterChange('yearMin', e.target.value)}
                />
                <Form.Control
                  size={cfg.control}
                  type="number"
                  placeholder="To"
                  min="2000"
                  max="2024"
                  value={localFilters.yearMax || ""}
                  onChange={(e) => handleFilterChange('yearMax', e.target.value)}
                />
              </div>
            </Form.Group>
          </Col>

          {/* Odometer Range */}
          <Col md={12}>
            <Form.Group>
              <Form.Label className="small mb-1">Odometer Range (km)</Form.Label>
              <div className="d-flex gap-1">
                <Form.Control
                  size={cfg.control}
                  type="number"
                  placeholder="Min"
                  value={localFilters.odometerMin || ""}
                  onChange={(e) => handleFilterChange('odometerMin', e.target.value)}
                />
                <Form.Control
                  size={cfg.control}
                  type="number"
                  placeholder="Max"
                  value={localFilters.odometerMax || ""}
                  onChange={(e) => handleFilterChange('odometerMax', e.target.value)}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <hr className="mx-0 my-2" />

        <div className="d-flex justify-content-between align-items-center">
          <Button
            size={cfg.control}
            variant="outline-secondary"
            onClick={handleClear}
          >
            Clear All
          </Button>

          <div className="d-flex gap-1">
            <Button
              size={cfg.control}
              variant="outline-secondary"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button size={cfg.control} variant="primary" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className={`d-flex align-items-center gap-${cfg.gap}`}>
      <Form.Control
        placeholder="Search vehicles by ID, reg, make, driver..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        size={cfg.control}
        style={{ minWidth: "250px" }}
      />

      <OverlayTrigger
        trigger="click"
        placement="bottom-end"
        overlay={popover}
        show={show}
        rootClose
        onToggle={setShow}
      >
        <Button
          size={cfg.control}
          variant="outline-secondary"
          className="position-relative"
        >
          <Funnel size={cfg.icon} />

          {activeCount > 0 && (
            <Badge
              bg="primary"
              className="position-absolute top-0 start-100 translate-middle"
              style={{ fontSize: cfg.badgeFont }}
            >
              {activeCount}
            </Badge>
          )}
        </Button>
      </OverlayTrigger>
    </div>
  );
}