'use client';

import { Button, Form } from 'react-bootstrap';

export default function TireTableFooter({
  page,
  total,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  mode
}) {
  if (mode !== 'pagination') return null;

  const totalPages = Math.ceil(total / rowsPerPage);

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
      {/* LEFT: Rows per page */}
      <div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
        <span className="text-muted small">Rows per page:</span>
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

      {/* RIGHT: Pagination */}
      <div className="d-flex gap-1 flex-wrap align-items-center">

        {/* Prev button */}
        <Button
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Prev
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
            {pages[0] > 2 && <span className="px-1">...</span>}
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
            {pages[pages.length - 1] < lastPage - 1 && <span className="px-1">...</span>}
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
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
