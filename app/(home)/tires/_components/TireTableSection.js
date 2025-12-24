'use client';

import { useMemo, useState } from 'react';
import DataTable, { StatusBadge, ProgressBar } from 'components/DataTable';
import TireTableFooter from './TireTableFooter';

export default function TireTableSection({
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
  const tireActions = [
    {
      label: 'View Details',
      icon: '👁️',
      href: (tire) => `/tires/view/${tire.id?.split('-')[1] || tire.id}`
    },
    {
      label: 'Edit Tire',
      icon: '✏️',
      href: (tire) => `/tires/edit/${tire.id?.split('-')[1] || tire.id}`
    },
    {
      label: 'Install on Vehicle',
      icon: '🔧',
      href: (tire) => `/operations/install?tire=${tire.id}`
    },
    {
      label: 'Schedule Inspection',
      icon: '🔍',
      href: (tire) => `/inspections/schedule?tire=${tire.id}`
    },
    {
      type: 'divider'
    },
    {
      label: 'Delete Tire',
      icon: '🗑️',
      className: 'text-danger',
      onClick: (tire) => {
        if (confirm(`Are you sure you want to delete tire ${tire.id}?`)) {
          console.log('Delete tire:', tire.id);
        }
      }
    }
  ];

  /* ---------- COLUMNS CONFIG ---------- */
  const columns = [
    { 
      key: 'id', 
      label: 'Tire ID', 
      sortable: true,
      style: { minWidth: '120px' }
    },
    { 
      key: 'brand', 
      label: 'Brand', 
      sortable: true,
      style: { minWidth: '120px' }
    },
    { 
      key: 'size', 
      label: 'Size', 
      sortable: true,
      style: { minWidth: '120px' }
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      style: { minWidth: '120px' },
      cellRenderer: (row, column) => (
        <StatusBadge status={row.status} />
      )
    },
    { 
      key: 'mileage', 
      label: 'Mileage', 
      sortable: true,
      style: { minWidth: '120px' },
      cellRenderer: (row, column) => (
        <span>{row.mileage?.toLocaleString()} km</span>
      )
    },
    { 
      key: 'treadDepth', 
      label: 'Tread Depth', 
      sortable: true,
      style: { minWidth: '150px' },
      cellRenderer: (row, column) => (
        <ProgressBar value={row.treadDepth} max={12} format="mm" />
      )
    },
    { 
      key: 'location', 
      label: 'Location', 
      sortable: true,
      style: { minWidth: '150px' }
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
          actions={tireActions}
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
        />
      )}
    </div>
  );
}