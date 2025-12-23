'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddEditTyrePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tyreId: '',
    brand: '',
    model: '',
    size: '',
    type: 'radial',
    purchaseDate: '',
    purchaseCost: '',
    supplier: '',
    initialStatus: 'new',
    treadDepth: '',
    loadIndex: '',
    speedRating: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tyre data submitted:', formData);
    // In a real app, you would send this to your API
    alert('Tyre saved successfully!');
    router.push('/inventory/tyres');
  };

  return (
    <div className="add-tyre-page">
      <h1>Add New Tyre</h1>
      <p className="text-muted">Enter tyre details below. All fields marked with * are required.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-header">
            <h3>Basic Information</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Tyre ID *
                  <small className="text-muted ms-2">(Auto-generate or enter manually)</small>
                </label>
                <input
                  type="text"
                  name="tyreId"
                  value={formData.tyreId}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., TYRE-001 or leave blank for auto"
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Brand *</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Brand</option>
                  <option value="michelin">Michelin</option>
                  <option value="bridgestone">Bridgestone</option>
                  <option value="goodyear">Goodyear</option>
                  <option value="continental">Continental</option>
                  <option value="pirelli">Pirelli</option>
                  <option value="yokohama">Yokohama</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Model *</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., XYZ 3000, DriveGuard, etc."
                  required
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Size *</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., 275/70R22.5"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="radial">Radial</option>
                  <option value="bias">Bias Ply</option>
                  <option value="tubeless">Tubeless</option>
                  <option value="tube-type">Tube Type</option>
                </select>
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">Load Index</label>
                <input
                  type="text"
                  name="loadIndex"
                  value={formData.loadIndex}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., 152/149"
                />
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">Speed Rating</label>
                <select
                  name="speedRating"
                  value={formData.speedRating}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select Rating</option>
                  <option value="L">L (120 km/h)</option>
                  <option value="M">M (130 km/h)</option>
                  <option value="N">N (140 km/h)</option>
                  <option value="P">P (150 km/h)</option>
                  <option value="Q">Q (160 km/h)</option>
                  <option value="R">R (170 km/h)</option>
                  <option value="S">S (180 km/h)</option>
                  <option value="T">T (190 km/h)</option>
                  <option value="U">U (200 km/h)</option>
                  <option value="H">H (210 km/h)</option>
                  <option value="V">V (240 km/h)</option>
                  <option value="W">W (270 km/h)</option>
                  <option value="Y">Y (300 km/h)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h3>Purchase Information</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Purchase Date *</label>
                <input
                  type="date"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Purchase Cost *</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    name="purchaseCost"
                    value={formData.purchaseCost}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Supplier *</label>
                <input
                  type="text"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Supplier name"
                  required
                />
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Initial Status *</label>
                <select
                  name="initialStatus"
                  value={formData.initialStatus}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="retreaded">Retreaded</option>
                  <option value="repaired">Repaired</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Initial Tread Depth (mm)</label>
              <div className="input-group">
                <input
                  type="number"
                  name="treadDepth"
                  value={formData.treadDepth}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., 8.0"
                  step="0.1"
                />
                <span className="input-group-text">mm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h3>Additional Information</h3>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Any additional notes about this tyre..."
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Attach Documents</label>
              <input
                type="file"
                className="form-control"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <small className="text-muted">You can upload invoice, warranty, or other documents (PDF, JPG, PNG)</small>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Link href="/inventory/tyres" className="btn btn-secondary">
              ← Back to Tyre Registry
            </Link>
          </div>
          
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                // Reset form logic
                setFormData({
                  tyreId: '',
                  brand: '',
                  model: '',
                  size: '',
                  type: 'radial',
                  purchaseDate: '',
                  purchaseCost: '',
                  supplier: '',
                  initialStatus: 'new',
                  treadDepth: '',
                  loadIndex: '',
                  speedRating: '',
                  notes: ''
                });
              }}
            >
              Clear Form
            </button>
            
            <button
              type="button"
              className="btn btn-info"
              onClick={() => {
                // Save as draft logic
                console.log('Saved as draft:', formData);
                alert('Saved as draft!');
              }}
            >
              Save as Draft
            </button>
            
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save Tyre
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4">
        <div className="alert alert-info">
          <h5>Quick Tips:</h5>
          <ul className="mb-0">
            <li>Use a consistent naming convention for Tyre IDs (e.g., TYRE-001, TYRE-002)</li>
            <li>Record the exact purchase cost for accurate cost tracking</li>
            <li>Take photos of the tyre and upload them for reference</li>
            <li>Save warranty documents if available</li>
          </ul>
        </div>
      </div>
    </div>
  );
}