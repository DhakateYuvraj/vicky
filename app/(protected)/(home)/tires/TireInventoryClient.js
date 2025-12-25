"use client";

import { useEffect, useMemo, useState } from "react";
import TireTopBar from "./_components/TireTopBar";
import TireBulkActions from "./_components/TireBulkActions";
import TireTableSection from "./_components/TireTableSection";

/* ---------- CLIENT-ONLY CALC ---------- */
function calculateRowsPerPage() {
  return Math.max(5, Math.floor((window.innerHeight - 360) / 52));
}

export default function TireInventoryClient({ initialData }) {
  /* ---------- FREEZE SERVER DATA ---------- */
  const [dataSource] = useState(() =>
    Array.isArray(initialData) ? initialData : []
  );

  /* ---------- CLIENT READY FLAG ---------- */
  const [isClient, setIsClient] = useState(false);

  /* ---------- STATE ---------- */
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // SSR-safe default

  /* ---------- AFTER HYDRATION ---------- */
  useEffect(() => {
    setIsClient(true);
    setRowsPerPage(calculateRowsPerPage());
  }, []);

  /* ---------- FILTERING ---------- */
  const filtered = useMemo(() => {
    return dataSource.filter((t) => {
      if (!t) return false;

      if (
        search &&
        !t.id?.toLowerCase().includes(search.toLowerCase()) &&
        !t.brand?.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

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

  /* ---------- AVOID HYDRATION MISMATCH ---------- */
  if (!isClient) {
    return null; // or skeleton loader
  }

  /* ---------- RENDER ---------- */
  return (
    <>
      <div className="px-2 pt-2">
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
