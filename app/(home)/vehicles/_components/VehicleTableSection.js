'use client';

import { useState, useMemo } from 'react';
import { 
  Table, 
  Form, 
  Pagination, 
  Badge, 
  Button,
  Dropdown
} from 'react-bootstrap';
import { 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical,
  Truck,
  Package
} from 'react-feather';
import Link from 'next/link';

export default function VehicleTableSection({
  data,
  selected,
  onSelect,
  page,
  total,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  mode = 'pagination'
}) {
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  // Get vehicle type icon
  const getVehicleIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'truck':
      case 'heavy truck':
      case 'medium truck':
      case 'light truck':
        return <Truck size={16} className="text-primary" />;
      case 'bus':
        return <span className="text-success">🚌</span>; // Emoji for bus
      case 'van':
      case 'car':
        return <Truck size={16} className="text-info" />;
      case 'trailer':
        return <Package size={16} className="text-warning" />;
      default:
        return <Truck size={16} className="text-secondary" />;
    }
  };

  // Sort data
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let aVal = a[sortColumn];
      let bVal = b[sortColumn];

      // Handle null/undefined values
      if (aVal === undefined || aVal === null) aVal = '';
      if (bVal === undefined || bVal === null) bVal = '';

      // Handle different data types
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [data, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = () => {
    if (selected.size === sortedData.length) {
      onSelect(new Set());
    } else {
      onSelect(new Set(sortedData.map(v => v.id)));
    }
  };

  const handleSelectOne = (vehicleId) => {
    const newSelected = new Set(selected);
    if (newSelected.has(vehicleId)) {
      newSelected.delete(vehicleId);
    } else {
      newSelected.add(vehicleId);
    }
    onSelect(newSelected);
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'secondary';
      case 'maintenance': return 'warning';
      case 'accident': return 'danger';
      case 'scrapped': return 'dark';
      default: return 'secondary';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Get total pages
  const totalPages = Math.ceil(total / rowsPerPage);

  return (
    <div className="vehicle-table-section">
      <div className="table-responsive">
        <Table hover className="mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: '40px' }}>
                <Form.Check
                  type="checkbox"
                  checked={selected.size === sortedData.length && sortedData.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th 
                onClick={() => handleSort('registrationNumber')}
                style={{ cursor: 'pointer' }}
              >
                Registration #
                {sortColumn === 'registrationNumber' && (
                  <span className="ms-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th>Vehicle Info</th>
              <th 
                onClick={() => handleSort('status')}
                style={{ cursor: 'pointer' }}
              >
                Status
                {sortColumn === 'status' && (
                  <span className="ms-1">
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th>Odometer & Tyres</th>
              <th>Driver & Location</th>
              <th>Inspection</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  <div className="text-muted">
                    No vehicles found. Try adjusting your filters or add a new vehicle.
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((vehicle) => (
                <tr key={vehicle.id}>
                  {/* Checkbox */}
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selected.has(vehicle.id)}
                      onChange={() => handleSelectOne(vehicle.id)}
                    />
                  </td>

                  {/* Registration & ID */}
                  <td>
                    <div className="d-flex align-items-center">
                      {getVehicleIcon(vehicle.vehicleType)}
                      <div className="ms-2">
                        <div className="fw-bold">
                          <Link href={`/vehicles/${vehicle.id}`} className="text-decoration-none">
                            {vehicle.registrationNumber}
                          </Link>
                        </div>
                        <small className="text-muted">ID: {vehicle.id}</small>
                      </div>
                    </div>
                  </td>

                  {/* Vehicle Info */}
                  <td>
                    <div className="fw-semibold">{vehicle.make} {vehicle.model}</div>
                    <div className="text-muted small">
                      {vehicle.vehicleType} • {vehicle.year} • {vehicle.color}
                    </div>
                    <div className="text-muted small">
                      VIN: {vehicle.vin?.substring(0, 12)}...
                    </div>
                  </td>

                  {/* Status */}
                  <td>
                    <Badge bg={getStatusBadge(vehicle.status)} className="text-capitalize">
                      {vehicle.status}
                    </Badge>
                    <div className="text-muted small mt-1">
                      {vehicle.department}
                    </div>
                  </td>

                  {/* Odometer & Tyres */}
                  <td>
                    <div className="fw-semibold">
                      {vehicle.odometer?.toLocaleString()} km
                    </div>
                    <div className="text-muted small">
                      <span className="badge bg-info">{vehicle.activeTyres}/{vehicle.totalTyres}</span> tyres
                    </div>
                    <div className="text-muted small">
                      {vehicle.fuelType}
                    </div>
                  </td>

                  {/* Driver & Location */}
                  <td>
                    <div>{vehicle.driver}</div>
                    <div className="text-muted small">
                      {vehicle.currentLocation}
                    </div>
                  </td>

                  {/* Inspection */}
                  <td>
                    <div className="text-muted small">
                      Last: {formatDate(vehicle.lastInspection)}
                    </div>
                    <div className="text-muted small">
                      Next: <span className="text-primary">{formatDate(vehicle.nextInspection)}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="d-flex align-items-center gap-1">
                      <Link 
                        href={`/vehicles/${vehicle.id}`}
                        className="btn btn-sm btn-outline-info"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </Link>
                      
                      <Link 
                        href={`/vehicles/${vehicle.id}/edit`}
                        className="btn btn-sm btn-outline-warning"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </Link>

                      <Dropdown>
                        <Dropdown.Toggle 
                          variant="outline-secondary" 
                          size="sm"
                          className="px-2"
                        >
                          <MoreVertical size={14} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end">
                          <Dropdown.Item as={Link} href={`/operations/install?vehicle=${vehicle.id}`}>
                            🔧 Manage Tyres
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} href={`/inspections/schedule?vehicle=${vehicle.id}`}>
                            🔍 Schedule Inspection
                          </Dropdown.Item>
                          <Dropdown.Item as={Link} href={`/maintenance/record?vehicle=${vehicle.id}`}>
                            🛠️ Record Maintenance
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item 
                            className="text-danger"
                            onClick={() => {
                              if (confirm(`Delete vehicle ${vehicle.registrationNumber}?`)) {
                                console.log('Delete vehicle:', vehicle.id);
                              }
                            }}
                          >
                            <Trash2 size={14} className="me-1" />
                            Delete Vehicle
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination and Summary */}
      {mode === 'pagination' && total > 0 && (
        <div className="d-flex justify-content-between align-items-center p-3 border-top">
          <div className="text-muted">
            Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, total)} of {total} vehicles
          </div>

          <div className="d-flex align-items-center gap-3">
            {/* Rows per page selector */}
            <div className="d-flex align-items-center">
              <span className="text-muted me-2">Rows per page:</span>
              <Form.Select
                size="sm"
                style={{ width: 'auto' }}
                value={rowsPerPage}
                onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
              >
                {[5, 10, 25, 50, 100].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Form.Select>
            </div>

            {/* Pagination */}
            <Pagination className="mb-0">
              <Pagination.First 
                onClick={() => onPageChange(1)}
                disabled={page === 1}
              />
              <Pagination.Prev 
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
              />

              {(() => {
                const items = [];
                const maxVisible = 5;
                let start = Math.max(1, page - Math.floor(maxVisible / 2));
                let end = Math.min(totalPages, start + maxVisible - 1);

                if (end - start + 1 < maxVisible) {
                  start = Math.max(1, end - maxVisible + 1);
                }

                for (let i = start; i <= end; i++) {
                  items.push(
                    <Pagination.Item
                      key={i}
                      active={i === page}
                      onClick={() => onPageChange(i)}
                    >
                      {i}
                    </Pagination.Item>
                  );
                }

                return items;
              })()}

              <Pagination.Next 
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
              />
              <Pagination.Last 
                onClick={() => onPageChange(totalPages)}
                disabled={page === totalPages}
              />
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
}