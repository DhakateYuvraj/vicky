'use client';

import { useMemo, useState } from 'react';
import DataTable from 'components/DataTable';
import TireTableFooter from './TireTableFooter';

/* ----------------------------------
   COLUMN CONFIGURATION
---------------------------------- */
const columns = [
  { key: 'id', label: 'ID', sortable: false },
  { key: 'brand', label: 'Brand', sortable: true },
  { key: 'size', label: 'Size', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'mileage', label: 'Mileage', sortable: true }
];

export default function TireTableSection({
  data = [],
  selected = new Set(),
  onSelect,
  page = 1,
  total = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange = () => {}, // ✅ SAFE DEFAULT
  mode = 'pagination'             // ✅ DEFAULT WORKS
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
