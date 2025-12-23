"use client";

import { useEffect, useMemo, useState } from "react";
import TireTopBar from "./components/TireTopBar";
import TireBulkActions from "./components/TireBulkActions";
import TireTableSection from "./components/TireTableSection";

function calculateRowsPerPage() {
  if (typeof window === "undefined") return 10;
  return Math.max(5, Math.floor((window.innerHeight - 360) / 52));
}

export default function TireInventoryClient({ initialData }) {
  /* ---------- SAFETY ---------- */
  const dataSource = Array.isArray(initialData) ? initialData : [];

  /* ---------- STATE ---------- */
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ---------- RESPONSIVE ROW COUNT ---------- */
  useEffect(() => {
    setRowsPerPage(calculateRowsPerPage());
  }, []);

  /* ---------- FILTERING ---------- */
  const filtered = useMemo(() => {
    return dataSource.filter((t) => {
      if (!t) return false;

      // Search
      if (
        search &&
        !t.id?.toLowerCase().includes(search.toLowerCase()) &&
        !t.brand?.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

      // Filters
      if (filters.brand && t.brand !== filters.brand) return false;
      if (filters.status && t.status !== filters.status) return false;
      if (filters.mileage && t.mileage > Number(filters.mileage)) return false;

      return true;
    });
  }, [dataSource, search, filters]);

  /* ---------- PAGINATION ---------- */
  const pageData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  /* ---------- RENDER ---------- */
  return (
    <>
    <div  className="px-2 pt-2">
      {/* Bulk Actions */}
      {selected.size > 0 ? (
        <TireBulkActions
          count={selected.size}
          onClear={() => setSelected(new Set())}
        />
      ) : (
        <TireTopBar
        size="md"
          search={search}
          onSearch={setSearch}
          filters={filters}
          onApplyFilters={setFilters}
        />
      )}
      </div>

      {/* Table */}
      <TireTableSection
        data={pageData}
        selected={selected}
        onSelect={setSelected}
        page={page}
        total={filtered.length}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={(val) => {
          setRowsPerPage(val);
          setPage(1);
        }}
        mode="pagination"
      />
    </>
  );
}
