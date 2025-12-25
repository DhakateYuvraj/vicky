"use client";

import { useEffect, useMemo, useState } from "react";
import VehicleTopBar from "./_components/VehicleTopBar";
import VehicleBulkActions from "./_components/VehicleBulkActions";
import VehicleTableSection from "./_components/VehicleTableSection";

/* ---------- CLIENT-ONLY CALC ---------- */
function calculateRowsPerPage() {
  return Math.max(5, Math.floor((window.innerHeight - 360) / 62));
}

export default function VehicleInventoryClient({ initialData }) {
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

    // Update rows per page on window resize
    const handleResize = () => {
      setRowsPerPage(calculateRowsPerPage());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ---------- FILTERING ---------- */
  const filtered = useMemo(() => {
    return dataSource.filter((vehicle) => {
      if (!vehicle) return false;

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matches = 
          vehicle.registrationNumber?.toLowerCase().includes(searchLower) ||
          vehicle.id?.toLowerCase().includes(searchLower) ||
          vehicle.make?.toLowerCase().includes(searchLower) ||
          vehicle.model?.toLowerCase().includes(searchLower) ||
          vehicle.driver?.toLowerCase().includes(searchLower) ||
          vehicle.department?.toLowerCase().includes(searchLower);
        
        if (!matches) return false;
      }

      // Individual filters
      if (filters.vehicleType && vehicle.vehicleType !== filters.vehicleType) return false;
      if (filters.status && vehicle.status !== filters.status) return false;
      if (filters.make && vehicle.make !== filters.make) return false;
      if (filters.fuelType && vehicle.fuelType !== filters.fuelType) return false;
      if (filters.department && vehicle.department !== filters.department) return false;

      // Odometer range filter
      if (filters.odometerMin && vehicle.odometer < Number(filters.odometerMin)) return false;
      if (filters.odometerMax && vehicle.odometer > Number(filters.odometerMax)) return false;

      // Year range filter
      if (filters.yearMin && vehicle.year < Number(filters.yearMin)) return false;
      if (filters.yearMax && vehicle.year > Number(filters.yearMax)) return false;

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
    return (
      <div className="px-2 pt-2">
        <div className="skeleton-loader">
          <div className="skeleton skeleton-header"></div>
          <div className="skeleton skeleton-row"></div>
          <div className="skeleton skeleton-row"></div>
          <div className="skeleton skeleton-row"></div>
        </div>
      </div>
    );
  }

  /* ---------- RENDER ---------- */
  return (
    <>
      <div className="px-2 pt-2">
        {selected.size > 0 ? (
          <VehicleBulkActions
            count={selected.size}
            onClear={() => setSelected(new Set())}
          />
        ) : (
          <VehicleTopBar
            search={search}
            onSearch={setSearch}
            filters={filters}
            onApplyFilters={setFilters}
          />
        )}
      </div>

      <VehicleTableSection
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