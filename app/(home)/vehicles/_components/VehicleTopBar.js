'use client';

import { useState } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Search, Filter, X, Download, Printer } from 'react-feather';
import Link from 'next/link';
import { 
  VEHICLE_TYPES, 
  VEHICLE_STATUSES, 
  VEHICLE_MAKES, 
  FUEL_TYPES 
} from '../_data/vehicles.data';

export default function VehicleTopBar({ 
  search, 
  onSearch, 
  filters, 
  onApplyFilters,
  size = 'md'
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  // Get unique departments from data
  const departments = [...new Set([
    'Logistics',
    'Transport',
    'Service',
    'Maintenance',
    'Sales',
    'Admin'
  ])];

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? '' : value
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(localFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(v => v && v !== '').length;
  };

  return (
    <div className="vehicle-top-bar">
      <Row className="align-items-center g-2">
        {/* Search Bar */}
        <Col xs={12} md={6} lg={4}>
          <InputGroup size={size}>
            <InputGroup.Text>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Search vehicles by ID, reg, make, driver..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
            {search && (
              <Button
                variant="outline-secondary"
                onClick={() => onSearch('')}
              >
                <X size={16} />
              </Button>
            )}
          </InputGroup>
        </Col>

        {/* Filter Toggle and Actions */}
        <Col xs={12} md={6} lg={8}>
          <div className="d-flex justify-content-end align-items-center gap-2">
            <div className="d-flex gap-2">
              <Button
                variant={showFilters ? "primary" : "outline-secondary"}
                onClick={() => setShowFilters(!showFilters)}
                size={size}
              >
                <Filter size={16} className="me-1" />
                Filters {getActiveFilterCount() > 0 && (
                  <span className="badge bg-danger ms-1">
                    {getActiveFilterCount()}
                  </span>
                )}
              </Button>

              <Button
                variant="outline-secondary"
                size={size}
              >
                <Download size={16} className="me-1" />
                Export
              </Button>

              <Button
                variant="outline-secondary"
                size={size}
              >
                <Printer size={16} className="me-1" />
                Print
              </Button>

              <Link href="/vehicles/add" className="btn btn-primary" size={size}>
                ➕ Add Vehicle
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      {/* Filter Panel */}
      {showFilters && (
        <div className="card mt-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">Advanced Filters</h6>
              <Button
                variant="link"
                size="sm"
                onClick={handleClearFilters}
                className="text-danger"
              >
                Clear All Filters
              </Button>
            </div>

            <Row className="g-3">
              {/* Vehicle Type */}
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group>
                  <Form.Label size="sm">Vehicle Type</Form.Label>
                  <Form.Select
                    size="sm"
                    value={localFilters.vehicleType || ''}
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
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group>
                  <Form.Label size="sm">Status</Form.Label>
                  <Form.Select
                    size="sm"
                    value={localFilters.status || ''}
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
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group>
                  <Form.Label size="sm">Make</Form.Label>
                  <Form.Select
                    size="sm"
                    value={localFilters.make || ''}
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
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group>
                  <Form.Label size="sm">Fuel Type</Form.Label>
                  <Form.Select
                    size="sm"
                    value={localFilters.fuelType || ''}
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
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group>
                  <Form.Label size="sm">Department</Form.Label>
                  <Form.Select
                    size="sm"
                    value={localFilters.department || ''}
                    onChange={(e) => handleFilterChange('department', e.target.value)}
                  >
                    <option value="">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Odometer Range */}
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group>
                  <Form.Label size="sm">Odometer (km)</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="number"
                      placeholder="Min"
                      size="sm"
                      value={localFilters.odometerMin || ''}
                      onChange={(e) => handleFilterChange('odometerMin', e.target.value)}
                    />
                    <Form.Control
                      type="number"
                      placeholder="Max"
                      size="sm"
                      value={localFilters.odometerMax || ''}
                      onChange={(e) => handleFilterChange('odometerMax', e.target.value)}
                    />
                  </div>
                </Form.Group>
              </Col>

              {/* Year Range */}
              <Col xs={12} sm={6} md={4} lg={3}>
                <Form.Group>
                  <Form.Label size="sm">Year</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="number"
                      placeholder="From"
                      size="sm"
                      min="2000"
                      max="2024"
                      value={localFilters.yearMin || ''}
                      onChange={(e) => handleFilterChange('yearMin', e.target.value)}
                    />
                    <Form.Control
                      type="number"
                      placeholder="To"
                      size="sm"
                      min="2000"
                      max="2024"
                      value={localFilters.yearMax || ''}
                      onChange={(e) => handleFilterChange('yearMax', e.target.value)}
                    />
                  </div>
                </Form.Group>
              </Col>

              {/* Apply/Clear Buttons */}
              <Col xs={12}>
                <div className="d-flex justify-content-end gap-2 pt-2">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleClearFilters}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleApplyFilters}
                  >
                    Apply Filters
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}