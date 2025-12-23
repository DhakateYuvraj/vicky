'use client';

import { Table, Form } from 'react-bootstrap';
import { ChevronUp, ChevronDown } from 'react-bootstrap-icons';

export default function DataTable({
  columns,
  data,
  selected,
  onToggleRow,
  onToggleAll,
  sortConfig,
  onSort
}) {
  const renderSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc'
      ? <ChevronUp size={14} className="ms-1" />
      : <ChevronDown size={14} className="ms-1" />;
  };

  return (
    <Table
      hover
      responsive
      className="mb-0 dashui-table"
    >
      <thead className="table-light border-bottom">
        <tr>
          {/* Checkbox column */}
          <th style={{ width: 40 }} className="text-center">
            <Form.Check
              checked={data.length > 0 && selected.size === data.length}
              onChange={onToggleAll}
            />
          </th>

          {columns.map(col => (
            <th
              key={col.key}
              className={`fw-semibold ${
                col.sortable ? 'cursor-pointer user-select-none' : ''
              }`}
              onClick={() => col.sortable && onSort(col.key)}
            >
              {col.label}
              {col.sortable && renderSortIcon(col.key)}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map(row => {
          const isSelected = selected.has(row.id);

          return (
            <tr
              key={row.id}
              className={isSelected ? 'table-active selected-row' : ''}
            >
              <td className="text-center">
                <Form.Check
                  checked={isSelected}
                  onChange={() => onToggleRow(row.id)}
                />
              </td>

              {columns.map(col => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
