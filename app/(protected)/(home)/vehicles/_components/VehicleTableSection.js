// File: /app/vehicles/_components/VehicleTableSection.js
'use client';

import { useMemo, useState } from 'react';
import DataTable, { StatusBadge } from 'components/DataTable';
import TireTableFooter from '../../tires/_components/TireTableFooter'; // Reuse the same footer

export default function VehicleTableSection({
  data = [],
  selected = new Set(),
  onSelect,
  page = 1,
  total = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange = () => {},
  mode = 'pagination'
}) {
  /* ---------- SORT STATE ---------- */
  const [sortConfig, setSortConfig] = useState(null);

  /* ---------- SORT HANDLER ---------- */
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

  /* ---------- SORTED DATA ---------- */
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const valA = a?.[sortConfig.key];
      const valB = b?.[sortConfig.key];

      if (valA == null) return 1;
      if (valB == null) return -1;

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  /* ---------- SELECTION ---------- */
  const toggleRow = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    onSelect(next);
  };

  const toggleAll = () => {
    if (selected.size === sortedData.length) {
      onSelect(new Set());
    } else {
      onSelect(new Set(sortedData.map((r) => r.id)));
    }
  };

  /* ---------- ACTIONS CONFIG ---------- */
  const vehicleActions = [
    {
      label: 'View Details',
      icon: '👁️',
      href: (vehicle) => `/vehicles/${vehicle.id}`
    },
    {
      label: 'Edit Vehicle',
      icon: '✏️',
      href: (vehicle) => `/vehicles/${vehicle.id}/edit`
    },
    {
      label: 'Manage Tyres',
      icon: '🔧',
      href: (vehicle) => `/operations/install?vehicle=${vehicle.id}`
    },
    {
      label: 'Schedule Inspection',
      icon: '🔍',
      href: (vehicle) => `/inspections/schedule?vehicle=${vehicle.id}`
    },
    {
      type: 'divider'
    },
    {
      label: 'Delete Vehicle',
      icon: '🗑️',
      className: 'text-danger',
      onClick: (vehicle) => {
        if (confirm(`Are you sure you want to delete vehicle ${vehicle.registrationNumber}?`)) {
          console.log('Delete vehicle:', vehicle.id);
        }
      }
    }
  ];

  /* ---------- COLUMNS CONFIG ---------- */
  const columns = [
    { 
      key: 'registrationNumber', 
      label: 'Registration #', 
      sortable: true,
      style: { minWidth: '120px' }
    },
    { 
      key: 'make', 
      label: 'Make', 
      sortable: true,
      style: { minWidth: '100px' }
    },
    { 
      key: 'model', 
      label: 'Model', 
      sortable: true,
      style: { minWidth: '100px' }
    },
    { 
      key: 'vehicleType', 
      label: 'Type', 
      sortable: true,
      style: { minWidth: '100px' }
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      style: { minWidth: '100px' },
      cellRenderer: (row, column) => (
        <StatusBadge status={row.status} />
      )
    },
    { 
      key: 'odometer', 
      label: 'Odometer', 
      sortable: true,
      style: { minWidth: '120px' },
      cellRenderer: (row, column) => (
        <span>{row.odometer?.toLocaleString()} km</span>
      )
    },
    { 
      key: 'driver', 
      label: 'Driver', 
      sortable: true,
      style: { minWidth: '120px' }
    }
  ];

  /* ---------- RENDER ---------- */
  return (
    <div className="card shadow-sm">
      <div className="card-body p-0">
        <DataTable
          columns={columns}
          data={sortedData}
          selected={selected}
          onToggleRow={toggleRow}
          onToggleAll={toggleAll}
          sortConfig={sortConfig}
          onSort={handleSort}
          actions={vehicleActions}
          showActions={true}
          rowKey="id"
        />
      </div>

      {/* ✅ Footer rendered ONLY in pagination mode */}
      {mode === 'pagination' && (
        <TireTableFooter
          page={page}
          total={total}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          mode={mode}
          entityName="vehicles" // Pass entity name
        />
      )}
    </div>
  );
}