'use client';

import { Table, Form, Dropdown, Badge } from 'react-bootstrap';
import { ChevronUp, ChevronDown } from 'react-bootstrap-icons';
import {   MoreVertical } from 'react-feather';

export default function DataTable({
  columns = [],
  data = [],
  selected = new Set(),
  onToggleRow = () => {},
  onToggleAll = () => {},
  sortConfig = null,
  onSort = () => {},
  actions = [],
  onActionClick = () => {},
  showActions = true,
  showCheckboxes = true,
  rowKey = 'id',
  cellRenderer = null,
  statusRenderer = null,
  progressRenderer = null
}) {
  const renderSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc'
      ? <ChevronUp size={14} className="ms-1" />
      : <ChevronDown size={14} className="ms-1" />;
  };

  // Default cell renderer
  const renderCell = (row, column) => {
    // Use custom renderer if provided
    if (cellRenderer && typeof cellRenderer === 'function') {
      const custom = cellRenderer(row, column);
      if (custom !== undefined) return custom;
    }

    // Special handling for status columns
    if (column.key === 'status' && statusRenderer) {
      return statusRenderer(row.status);
    }

    // Special handling for progress columns
    if (column.type === 'progress' && progressRenderer) {
      return progressRenderer(row[column.key]);
    }

    const value = row[column.key];
    
    // Format numbers with commas
    if (typeof value === 'number' && !column.key.toLowerCase().includes('date')) {
      return column.format === 'currency' 
        ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : value.toLocaleString();
    }
    
    // Return raw value
    return value || '-';
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
          {showCheckboxes && (
            <th style={{ width: 40 }} className="text-center">
              <Form.Check
                checked={data.length > 0 && selected.size === data.length}
                onChange={onToggleAll}
              />
            </th>
          )}

          {/* Data columns */}
          {columns.map(col => (
            <th
              key={col.key}
              className={`fw-semibold ${col.className || ''} ${
                col.sortable ? 'cursor-pointer user-select-none' : ''
              }`}
              style={col.style || {}}
              onClick={() => col.sortable && onSort(col.key)}
            >
              {col.label}
              {col.sortable && renderSortIcon(col.key)}
            </th>
          ))}

          {/* Actions column */}
          {showActions && actions.length > 0 && (
            <th style={{ width: 100 }} className="text-center">
              Actions
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td 
              colSpan={columns.length + (showCheckboxes ? 1 : 0) + (showActions ? 1 : 0)} 
              className="text-center py-4"
            >
              <div className="text-muted">
                No data found
              </div>
            </td>
          </tr>
        ) : (
          data.map((row, index) => {
            const isSelected = selected.has(row[rowKey]);

            return (
              <tr
                key={row[rowKey] || index}
                className={isSelected ? 'table-active selected-row' : ''}
              >
                {/* Checkbox cell */}
                {showCheckboxes && (
                  <td className="text-center">
                    <Form.Check
                      checked={isSelected}
                      onChange={() => onToggleRow(row[rowKey])}
                    />
                  </td>
                )}

                {/* Data cells */}
                {columns.map(col => (
                  <td key={col.key} className={col.cellClassName || ''}>
                    {renderCell(row, col)}
                  </td>
                ))}

                {/* Actions cell */}
                {showActions && actions.length > 0 && (
                  <td className="text-center">
                    <Dropdown>
                      <Dropdown.Toggle 
                        variant="outline-secondary" 
                        size="sm"
                        className="px-2 py-1"
                        id={`actions-${row[rowKey]}`}
                      >
                        <MoreVertical size={14} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        {actions.map((action, idx) => (
                          <Dropdown.Item
                            key={idx}
                            href={action.href ? action.href(row) : undefined}
                            onClick={(e) => {
                              if (action.href) {
                                e.preventDefault();
                                window.location.href = action.href(row);
                              }
                              if (action.onClick) {
                                action.onClick(row);
                              }
                              onActionClick(action.type, row);
                            }}
                            className={action.className || ''}
                            disabled={action.disabled?.(row)}
                          >
                            {action.icon && <span className="me-2">{action.icon}</span>}
                            {action.label}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                )}
              </tr>
            );
          })
        )}
      </tbody>
    </Table>
  );
}

// Helper component for status badges
export function StatusBadge({ status, map = {} }) {
  const defaultMap = {
    active: { color: 'success', label: 'Active' },
    stock: { color: 'info', label: 'In Stock' },
    repair: { color: 'warning', label: 'Under Repair' },
    scrapped: { color: 'danger', label: 'Scrapped' },
    installed: { color: 'primary', label: 'Installed' },
    maintenance: { color: 'warning', label: 'Maintenance' },
    inactive: { color: 'secondary', label: 'Inactive' }
  };

  const config = map[status] || defaultMap[status] || { color: 'secondary', label: status };
  
  return (
    <Badge bg={config.color} className="text-capitalize">
      {config.label}
    </Badge>
  );
}

// Helper component for progress bars
export function ProgressBar({ value, max = 12, showValue = true, format = 'mm' }) {
  const percentage = Math.min((value / max) * 100, 100);
  
  let color = 'success';
  if (value < max * 0.33) color = 'danger';
  else if (value < max * 0.66) color = 'warning';
  
  return (
    <div className="d-flex align-items-center">
      <div className="progress flex-grow-1 me-2" style={{ height: '6px' }}>
        <div 
          className={`progress-bar bg-${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {showValue && (
        <span className="small">
          {value}{format}
        </span>
      )}
    </div>
  );
}