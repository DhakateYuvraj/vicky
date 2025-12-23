'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock data for demonstration
const mockTyres = [
  {
    id: 'TYRE-001',
    brand: 'Michelin',
    model: 'XYZ 3000',
    size: '275/70R22.5',
    type: 'Radial',
    status: 'active',
    location: 'VH001',
    position: 'Front Left',
    treadDepth: 8.0,
    purchaseDate: '2024-01-15',
    purchaseCost: 350.00,
    currentMileage: 12500,
    condition: 'Good'
  },
  {
    id: 'TYRE-002',
    brand: 'Bridgestone',
    model: 'R250',
    size: '295/75R22.5',
    type: 'Radial',
    status: 'stock',
    location: 'Warehouse A',
    position: 'Rack 3',
    treadDepth: 10.0,
    purchaseDate: '2024-02-10',
    purchaseCost: 320.00,
    currentMileage: 0,
    condition: 'New'
  },
  {
    id: 'TYRE-003',
    brand: 'Goodyear',
    model: 'G661',
    size: '285/75R24.5',
    type: 'Radial',
    status: 'active',
    location: 'VH002',
    position: 'Rear Right',
    treadDepth: 6.5,
    purchaseDate: '2023-11-20',
    purchaseCost: 380.00,
    currentMileage: 25000,
    condition: 'Fair'
  },
  {
    id: 'TYRE-004',
    brand: 'Continental',
    model: 'HDL2',
    size: '275/80R22.5',
    type: 'Radial',
    status: 'repair',
    location: 'Repair Shop',
    position: 'Bench 1',
    treadDepth: 4.0,
    purchaseDate: '2023-09-05',
    purchaseCost: 340.00,
    currentMileage: 18000,
    condition: 'Under Repair'
  },
  {
    id: 'TYRE-005',
    brand: 'Michelin',
    model: 'X Line Energy',
    size: '315/80R22.5',
    type: 'Radial',
    status: 'stock',
    location: 'Warehouse B',
    position: 'Rack 5',
    treadDepth: 12.0,
    purchaseDate: '2024-03-01',
    purchaseCost: 420.00,
    currentMileage: 0,
    condition: 'New'
  },
  {
    id: 'TYRE-006',
    brand: 'Pirelli',
    model: 'FH90',
    size: '295/80R22.5',
    type: 'Radial',
    status: 'active',
    location: 'VH003',
    position: 'Spare',
    treadDepth: 9.5,
    purchaseDate: '2024-01-30',
    purchaseCost: 390.00,
    currentMileage: 8000,
    condition: 'Excellent'
  },
  {
    id: 'TYRE-007',
    brand: 'Yokohama',
    model: 'RY023',
    size: '285/75R24.5',
    type: 'Radial',
    status: 'scrapped',
    location: 'Scrap Yard',
    position: 'Pile A',
    treadDepth: 1.5,
    purchaseDate: '2022-08-15',
    purchaseCost: 310.00,
    currentMileage: 45000,
    condition: 'Worn Out'
  },
  {
    id: 'TYRE-008',
    brand: 'Bridgestone',
    model: 'M710',
    size: '275/70R22.5',
    type: 'Radial',
    status: 'retread',
    location: 'Retread Shop',
    position: 'Line 2',
    treadDepth: 2.0,
    purchaseDate: '2022-12-10',
    purchaseCost: 280.00,
    currentMileage: 38000,
    condition: 'Being Retreaded'
  }
];

export default function TyresRegistryPage() {
  const [tyres, setTyres] = useState(mockTyres);
  const [filteredTyres, setFilteredTyres] = useState(mockTyres);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedTyres, setSelectedTyres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get unique brands for filter
  const brands = ['all', ...new Set(mockTyres.map(tyre => tyre.brand))];
  
  // Get unique statuses for filter
  const statuses = ['all', 'active', 'stock', 'repair', 'retread', 'scrapped'];

  // Apply filters and sorting
  useEffect(() => {
    let result = [...tyres];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(tyre =>
        tyre.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tyre.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tyre.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tyre.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(tyre => tyre.status === statusFilter);
    }

    // Apply brand filter
    if (brandFilter !== 'all') {
      result = result.filter(tyre => tyre.brand === brandFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'brand':
          aValue = a.brand;
          bValue = b.brand;
          break;
        case 'size':
          aValue = a.size;
          bValue = b.size;
          break;
        case 'treadDepth':
          aValue = a.treadDepth;
          bValue = b.treadDepth;
          break;
        case 'purchaseCost':
          aValue = a.purchaseCost;
          bValue = b.purchaseCost;
          break;
        case 'currentMileage':
          aValue = a.currentMileage;
          bValue = b.currentMileage;
          break;
        default: // 'id'
          aValue = a.id;
          bValue = b.id;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredTyres(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, statusFilter, brandFilter, sortBy, sortOrder, tyres]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTyres = filteredTyres.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTyres.length / itemsPerPage);

  // Handle tyre selection
  const handleSelectTyre = (tyreId) => {
    setSelectedTyres(prev =>
      prev.includes(tyreId)
        ? prev.filter(id => id !== tyreId)
        : [...prev, tyreId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTyres.length === currentTyres.length) {
      setSelectedTyres([]);
    } else {
      setSelectedTyres(currentTyres.map(tyre => tyre.id));
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedTyres.length === 0) {
      alert('Please select at least one tyre');
      return;
    }

    switch (action) {
      case 'delete':
        if (confirm(`Delete ${selectedTyres.length} selected tyre(s)?`)) {
          setTyres(prev => prev.filter(tyre => !selectedTyres.includes(tyre.id)));
          setSelectedTyres([]);
        }
        break;
      case 'export':
        // Export logic here
        alert(`Exporting ${selectedTyres.length} tyres...`);
        break;
      case 'changeStatus':
        const newStatus = prompt('Enter new status (active, stock, repair, scrapped):');
        if (newStatus) {
          setTyres(prev => 
            prev.map(tyre => 
              selectedTyres.includes(tyre.id) 
                ? { ...tyre, status: newStatus }
                : tyre
            )
          );
        }
        break;
      default:
        break;
    }
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'stock': return 'bg-info';
      case 'repair': return 'bg-warning';
      case 'retread': return 'bg-secondary';
      case 'scrapped': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  // Get status display text
  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'stock': return 'In Stock';
      case 'repair': return 'Under Repair';
      case 'retread': return 'Retreading';
      case 'scrapped': return 'Scrapped';
      default: return status;
    }
  };

  // Get condition color
  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'new': return 'text-success';
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'fair': return 'text-warning';
      case 'poor': return 'text-danger';
      case 'worn out': return 'text-danger';
      default: return 'text-muted';
    }
  };

  return (
    <div className="tyres-registry-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Tyre Registry</h1>
          <p className="text-muted">Manage and track all tyres in your inventory</p>
        </div>
        <div>
          <Link href="/inventory/tyres/add" className="btn btn-primary">
            ➕ Add New Tyre
          </Link>
          <Link href="/inventory/tyres/add?bulk=true" className="btn btn-outline-primary ms-2">
            📁 Bulk Upload
          </Link>
        </div>
      </div>

      {/* Filters Card */}
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="mb-0">Filters & Search</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Search Tyres</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID, brand, model, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="col-md-3 mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-control"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="stock">In Stock</option>
                <option value="repair">Under Repair</option>
                <option value="retread">Retreading</option>
                <option value="scrapped">Scrapped</option>
              </select>
            </div>
            
            <div className="col-md-3 mb-3">
              <label className="form-label">Brand</label>
              <select
                className="form-control"
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="all">All Brands</option>
                {brands.filter(b => b !== 'all').map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            
            <div className="col-md-2 mb-3 d-flex align-items-end">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setBrandFilter('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTyres.length > 0 && (
        <div className="card mb-4 border-warning">
          <div className="card-body py-2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-warning me-2">{selectedTyres.length}</span>
                <span>tyre(s) selected</span>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleBulkAction('export')}
                >
                  📥 Export Selected
                </button>
                <button
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => handleBulkAction('changeStatus')}
                >
                  🔄 Change Status
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleBulkAction('delete')}
                >
                  🗑️ Delete Selected
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setSelectedTyres([])}
                >
                  ✕ Clear Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card bg-primary bg-opacity-10">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Total Tyres</h6>
                  <h3 className="mb-0">{tyres.length}</h3>
                </div>
                <div className="display-4">📊</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card bg-success bg-opacity-10">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Active</h6>
                  <h3 className="mb-0">{tyres.filter(t => t.status === 'active').length}</h3>
                </div>
                <div className="display-4">🚚</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card bg-info bg-opacity-10">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">In Stock</h6>
                  <h3 className="mb-0">{tyres.filter(t => t.status === 'stock').length}</h3>
                </div>
                <div className="display-4">📦</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="card bg-warning bg-opacity-10">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted">Needs Attention</h6>
                  <h3 className="mb-0">{tyres.filter(t => t.status === 'repair' || t.status === 'retread').length}</h3>
                </div>
                <div className="display-4">⚠️</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tyres Table */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Tyre List</h3>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted me-2">Sort by:</span>
            <select
              className="form-select form-select-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: 'auto' }}
            >
              <option value="id">ID</option>
              <option value="brand">Brand</option>
              <option value="size">Size</option>
              <option value="treadDepth">Tread Depth</option>
              <option value="purchaseCost">Cost</option>
              <option value="currentMileage">Mileage</option>
            </select>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
            </button>
          </div>
        </div>
        
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectedTyres.length === currentTyres.length && currentTyres.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Tyre ID</th>
                <th>Brand & Model</th>
                <th>Size & Type</th>
                <th>Status</th>
                <th>Location</th>
                <th>Tread Depth</th>
                <th>Condition</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTyres.map((tyre) => (
                <tr key={tyre.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedTyres.includes(tyre.id)}
                      onChange={() => handleSelectTyre(tyre.id)}
                    />
                  </td>
                  <td>
                    <Link href={`/inventory/tyres/view/${tyre.id.split('-')[1]}`} className="fw-bold">
                      {tyre.id}
                    </Link>
                  </td>
                  <td>
                    <div className="fw-semibold">{tyre.brand}</div>
                    <small className="text-muted">{tyre.model}</small>
                  </td>
                  <td>
                    <div>{tyre.size}</div>
                    <small className="text-muted">{tyre.type}</small>
                  </td>
                  <td>
                    <span className={`badge ${getStatusBadge(tyre.status)}`}>
                      {getStatusText(tyre.status)}
                    </span>
                  </td>
                  <td>
                    <div>{tyre.location}</div>
                    <small className="text-muted">{tyre.position}</small>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="progress flex-grow-1" style={{ height: '6px' }}>
                        <div 
                          className={`progress-bar ${
                            tyre.treadDepth >= 8 ? 'bg-success' : 
                            tyre.treadDepth >= 4 ? 'bg-warning' : 'bg-danger'
                          }`}
                          style={{ width: `${Math.min(tyre.treadDepth * 10, 100)}%` }}
                        ></div>
                      </div>
                      <span className="ms-2">{tyre.treadDepth}mm</span>
                    </div>
                  </td>
                  <td>
                    <span className={getConditionColor(tyre.condition)}>
                      {tyre.condition}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <Link 
                        href={`/inventory/tyres/view/${tyre.id.split('-')[1]}`}
                        className="btn btn-outline-info"
                        title="View Details"
                      >
                        👁️
                      </Link>
                      <Link 
                        href={`/inventory/tyres/edit/${tyre.id.split('-')[1]}`}
                        className="btn btn-outline-warning"
                        title="Edit"
                      >
                        ✏️
                      </Link>
                      <button
                        className="btn btn-outline-danger"
                        title="Delete"
                        onClick={() => {
                          if (confirm(`Delete ${tyre.id}?`)) {
                            setTyres(prev => prev.filter(t => t.id !== tyre.id));
                          }
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="card-footer">
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-muted">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredTyres.length)} of {filteredTyres.length} tyres
              </div>
              <nav>
                <ul className="pagination mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(prev => prev - 1)}
                      disabled={currentPage === 1}
                    >
                      ← Previous
                    </button>
                  </li>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next →
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Export Options */}
      <div className="card mt-4">
        <div className="card-body">
          <h5>Export Options</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary">
              📊 Export All to Excel
            </button>
            <button className="btn btn-outline-primary">
              📄 Export All to PDF
            </button>
            <button className="btn btn-outline-primary">
              📋 Export Filtered Results
            </button>
            <Link href="/reports/inventory" className="btn btn-outline-info ms-auto">
              📈 View Detailed Reports
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">Status Distribution</h6>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {statuses.filter(s => s !== 'all').map(status => {
                  const count = tyres.filter(t => t.status === status).length;
                  const percentage = (count / tyres.length * 100).toFixed(1);
                  return (
                    <li key={status} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <span className={`badge ${getStatusBadge(status)} me-2`}>
                          {getStatusText(status)}
                        </span>
                      </div>
                      <div>
                        <span className="fw-bold">{count}</span>
                        <small className="text-muted ms-2">({percentage}%)</small>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">Brand Distribution</h6>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {brands.filter(b => b !== 'all').map(brand => {
                  const count = tyres.filter(t => t.brand === brand).length;
                  const percentage = (count / tyres.length * 100).toFixed(1);
                  return (
                    <li key={brand} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>{brand}</div>
                      <div>
                        <span className="fw-bold">{count}</span>
                        <small className="text-muted ms-2">({percentage}%)</small>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}