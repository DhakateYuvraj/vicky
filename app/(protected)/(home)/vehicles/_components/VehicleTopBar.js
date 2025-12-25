// File: /app/vehicles/_components/VehicleTopBar.js

'use client';

import { Row, Col } from 'react-bootstrap';
import VehicleSearchFilters from './VehicleSearchFilters';

export default function VehicleTopBar({
  search,
  onSearch,
  filters,
  onApplyFilters,
  size = 'md'
}) {
  const buttonSize = size === 'sm' ? 'sm' : 'md';
  const marginBottom = size === 'sm' ? 'mb-2' : size === 'lg' ? 'mb-4' : 'mb-3';

  return (
    <Row className={`align-items-center g-2 ${marginBottom}`}>
      <Col md="auto">
        <VehicleSearchFilters
          search={search}
          onSearch={onSearch}
          filters={filters}
          onApplyFilters={onApplyFilters}
          size={size}
        />
      </Col>

      <Col className="text-md-end">
        <a
          href="/vehicles/new"
          className={`btn btn-primary btn-${buttonSize}`}
        >
          + Add Vehicle
        </a>
      </Col>
    </Row>
  );
}