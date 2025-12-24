'use client';

import { Row, Col } from 'react-bootstrap';
import TireSearchFilters from './TireSearchFilters';

export default function TireTopBar({
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
        <TireSearchFilters
          search={search}
          onSearch={onSearch}
          filters={filters}
          onApplyFilters={onApplyFilters}
          size={size}
        />
      </Col>

      <Col className="text-md-end">
        <a
          href="/tire_inventory/new"
          className={`btn btn-primary btn-${buttonSize}`}
        >
          + Add Tire
        </a>
      </Col>
    </Row>
  );
}
