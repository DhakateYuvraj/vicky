'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock tyre data - in real app, fetch from API
const getTyreDetails = (id) => {
  const mockData = {
    1: {
      id: 'TYRE-001',
      brand: 'Michelin',
      model: 'XYZ 3000',
      size: '275/70R22.5',
      type: 'Radial Tubeless',
      status: 'active',
      location: 'Vehicle VH001',
      position: 'Front Left',
      treadDepth: 8.0,
      purchaseDate: '2024-01-15',
      purchaseCost: 350.00,
      supplier: 'Tyre Distributors Inc.',
      loadIndex: '152/149',
      speedRating: 'L (120 km/h)',
      currentMileage: 12500,
      installedDate: '2024-01-20',
      lastInspection: '2024-03-15',
      nextInspection: '2024-04-15',
      condition: 'Good',
      notes: 'Original purchase from main supplier. Good condition.',
      warranty: '2 years or 100,000 km',
      serialNumber: 'MICH-XYZ3000-001',
      dotNumber: 'DOT XYZ 1234 5678'
    }
  };
  return mockData[id] || null;
};

export default function TyreDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tyreId = params.id;
  const [tyre, setTyre] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const tyreData = getTyreDetails(tyreId);
      if (tyreData) {
        setTyre(tyreData);
      }
      setIsLoading(false);
    }, 500);
  }, [tyreId]);

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading tyre details...</p>
      </div>
    );
  }

  if (!tyre) {
    return (
      <div className="text-center py-5">
        <h3>Tyre not found</h3>
        <p>The requested tyre does not exist.</p>
        <Link href="/inventory/tyres" className="btn btn-primary">
          Back to Tyre Registry
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return 'bg-success';
      case 'stock': return 'bg-info';
      case 'repair': return 'bg-warning';
      case 'scrapped': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'stock': return 'In Stock';
      case 'repair': return 'Under Repair';
      case 'scrapped': return 'Scrapped';
      default: return status;
    }
  };

  return (
    <div className="tyre-detail-page">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Tyre Details: {tyre.id}</h1>
          <p className="text-muted">{tyre.brand} {tyre.model} - {tyre.size}</p>
        </div>
        <div className="d-flex gap-2">
          <Link href="/inventory/tyres" className="btn btn-outline-secondary">
            ← Back to Registry
          </Link>
          <Link href={`/inventory/tyres/edit/${tyreId}`} className="btn btn-warning">
            ✏️ Edit
          </Link>
          <button className="btn btn-danger">
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="card mb-4">
        <div className="card-body py-3">
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="d-flex align-items-center">
                <span className={`badge ${getStatusBadge(tyre.status)} me-3`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                  {getStatusText(tyre.status)}
                </span>
                <div>
                  <small className="text-muted">Condition</small>
                  <div className="fw-bold">{tyre.condition}</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <small className="text-muted">Current Location</small>
                <div className="fw-bold">{tyre.location}</div>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <small className="text-muted">Position</small>
                <div className="fw-bold">{tyre.position}</div>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <small className="text-muted">Tread Depth</small>
                <div className="fw-bold">{tyre.treadDepth} mm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 Overview
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'specifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('specifications')}
          >
            📐 Specifications
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📜 History
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            📎 Documents
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'cost' ? 'active' : ''}`}
            onClick={() => setActiveTab('cost')}
          >
            💰 Cost Analysis
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="row">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header">
                  <h4>Tyre Information</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <th style={{ width: '40%' }}>Brand:</th>
                            <td>{tyre.brand}</td>
                          </tr>
                          <tr>
                            <th>Model:</th>
                            <td>{tyre.model}</td>
                          </tr>
                          <tr>
                            <th>Size:</th>
                            <td>{tyre.size}</td>
                          </tr>
                          <tr>
                            <th>Type:</th>
                            <td>{tyre.type}</td>
                          </tr>
                          <tr>
                            <th>Serial Number:</th>
                            <td>{tyre.serialNumber}</td>
                          </tr>
                          <tr>
                            <th>DOT Number:</th>
                            <td>{tyre.dotNumber}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-6">
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <th style={{ width: '40%' }}>Purchase Date:</th>
                            <td>{tyre.purchaseDate}</td>
                          </tr>
                          <tr>
                            <th>Purchase Cost:</th>
                            <td>${tyre.purchaseCost.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <th>Supplier:</th>
                            <td>{tyre.supplier}</td>
                          </tr>
                          <tr>
                            <th>Warranty:</th>
                            <td>{tyre.warranty}</td>
                          </tr>
                          <tr>
                            <th>Current Mileage:</th>
                            <td>{tyre.currentMileage.toLocaleString()} km</td>
                          </tr>
                          <tr>
                            <th>Installed Date:</th>
                            <td>{tyre.installedDate}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h4>Notes</h4>
                </div>
                <div className="card-body">
                  <p>{tyre.notes}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header">
                  <h4>Quick Actions</h4>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <Link href={`/operations/install?tyre=${tyreId}`} className="btn btn-outline-primary">
                      🔧 Install/Reinstall
                    </Link>
                    <Link href={`/operations/remove?tyre=${tyreId}`} className="btn btn-outline-primary">
                      🚛 Remove
                    </Link>
                    <Link href={`/inspections/schedule?tyre=${tyreId}`} className="btn btn-outline-primary">
                      🔍 Schedule Inspection
                    </Link>
                    <Link href={`/maintenance/repair?tyre=${tyreId}`} className="btn btn-outline-primary">
                      🔧 Log Repair
                    </Link>
                    <Link href={`/operations/rotate?tyre=${tyreId}`} className="btn btn-outline-primary">
                      🔄 Rotate
                    </Link>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h4>Maintenance Schedule</h4>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Last Inspection
                      <span className="badge bg-info">{tyre.lastInspection}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Next Inspection
                      <span className="badge bg-warning">{tyre.nextInspection}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Remaining Tread Life
                      <span className="badge bg-success">65%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Specifications Tab - Add similar content for other tabs */}
        {activeTab === 'specifications' && (
          <div className="card">
            <div className="card-body">
              <h4>Technical Specifications</h4>
              <p>Specifications content goes here...</p>
            </div>
          </div>
        )}
        
        {/* Add similar content for other tabs */}
      </div>
    </div>
  );
}