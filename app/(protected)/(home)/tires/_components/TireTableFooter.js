'use client';

import { Button, Form } from 'react-bootstrap';

export default function TireTableFooter({
  page,
  total,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  mode,
  entityName = 'tires' // New prop for entity name
}) {
  if (mode !== 'pagination') return null;

  const totalPages = Math.ceil(total / rowsPerPage);
  const startItem = (page - 1) * rowsPerPage + 1;
  const endItem = Math.min(page * rowsPerPage, total);

  const getPaginationPages = () => {
    const pages = [];

    if (totalPages <= 10) {
      // Less than 10 pages: show all
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start, end;

      if (page <= 5) {
        // First 5 pages: show 1-10
        start = 1;
        end = 10;
      } else if (page >= totalPages - 4) {
        // Last 5 pages: show last 10
        start = totalPages - 9;
        end = totalPages;
      } else {
        // Middle pages: current page ±4
        start = page - 4;
        end = page + 4;
      }

      for (let i = start; i <= end; i++) pages.push(i);
    }

    return pages;
  };

  const pages = getPaginationPages();
  const firstPage = 1;
  const lastPage = totalPages;

  return (
    <div className="card-footer d-flex justify-content-between align-items-center flex-wrap">
      {/* LEFT: Showing count and rows per page */}
      <div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
        
        <div className="d-flex align-items-center gap-2">
          <span className="text-muted small">Rows:</span>
          <Form.Select
            size="sm"
            style={{ width: 90 }}
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          >
            {[10, 20, 30, 50].map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </Form.Select>
        </div>

        <span className="text-muted small">|</span>

                <span className="text-muted small">
          Showing {startItem} to {endItem} of {total} {entityName}
        </span>
        
      </div>

      {/* RIGHT: Pagination */}
      <div className="d-flex gap-1 flex-wrap align-items-center">
        {/* Prev button */}
        <Button
          size="sm"
          variant="outline-secondary"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          ← Prev
        </Button>

        {/* First page */}
        {pages[0] > 1 && (
          <>
            <Button
              size="sm"
              variant={page === firstPage ? 'primary' : 'outline-primary'}
              onClick={() => onPageChange(firstPage)}
            >
              {firstPage}
            </Button>
            {pages[0] > 2 && <span className="px-2 text-muted">...</span>}
          </>
        )}

        {/* Pages */}
        {pages.map(p => (
          <Button
            key={p}
            size="sm"
            variant={p === page ? 'primary' : 'outline-primary'}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        ))}

        {/* Last page */}
        {pages[pages.length - 1] < lastPage && (
          <>
            {pages[pages.length - 1] < lastPage - 1 && <span className="px-2 text-muted">...</span>}
            <Button
              size="sm"
              variant={page === lastPage ? 'primary' : 'outline-primary'}
              onClick={() => onPageChange(lastPage)}
            >
              {lastPage}
            </Button>
          </>
        )}

        {/* Next button */}
        <Button
          size="sm"
          variant="outline-secondary"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}