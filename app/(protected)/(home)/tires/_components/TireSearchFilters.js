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

const SIZE_MAP = {
  sm: {
    control: "sm",
    icon: 16,
    badgeFont: "0.65rem",
    searchWidth: 200,
    popoverWidth: 450,
    gap: 2,
  },
  md: {
    control: undefined,
    icon: 18,
    badgeFont: "0.7rem",
    searchWidth: 240,
    popoverWidth: 380,
    gap: 2,
  },
  lg: {
    control: "lg",
    icon: 20,
    badgeFont: "0.75rem",
    searchWidth: 280,
    popoverWidth: 410,
    gap: 3,
  },
};

export default function TireSearchFilters({
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

  const activeCount = Object.values(filters).filter(Boolean).length;

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

  const popover = (
    <Popover className="shadow-md" style={{ minWidth: cfg.popoverWidth }}>
      <Popover.Header className="fw-semibold py-2">Filters</Popover.Header>

      <Popover.Body className="py-2">
        <Row className="g-2">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small mb-1">Brand</Form.Label>
              <Form.Select
                size={cfg.control}
                value={localFilters.brand || ""}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, brand: e.target.value })
                }
              >
                <option value="">All</option>
                <option>Michelin</option>
                <option>Bridgestone</option>
                <option>MRF</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label className="small mb-1">Status</Form.Label>
              <Form.Select
                size={cfg.control}
                value={localFilters.status || ""}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, status: e.target.value })
                }
              >
                <option value="">All</option>
                <option>active</option>
                <option>stock</option>
                <option>repair</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label className="small mb-1">Max Mileage</Form.Label>
              <Form.Control
                size={cfg.control}
                type="number"
                placeholder="40000"
                value={localFilters.mileage || ""}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, mileage: e.target.value })
                }
              />
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
        placeholder="Search tires..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
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
