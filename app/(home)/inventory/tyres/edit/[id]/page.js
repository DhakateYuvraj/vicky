'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditTyrePage() {
  const router = useRouter();
  const params = useParams();
  const tyreId = params.id;
  
  const [formData, setFormData] = useState({
    tyreId: '',
    brand: '',
    model: '',
    size: '',
    type: 'radial',
    purchaseDate: '',
    purchaseCost: '',
    supplier: '',
    currentStatus: 'new',
    currentTreadDepth: '',
    loadIndex: '',
    speedRating: '',
    notes: '',
    location: '',
    position: ''
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching tyre data
  useEffect(() => {
    // In a real app, you would fetch tyre data from API
    const fetchTyreData = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        // Mock data - replace with actual API call
        const mockTyreData = {
          tyreId: `TYRE-${tyreId}`,
          brand: 'michelin',
          model: 'XYZ 3000',
          size: '275/70R22.5',
          type: 'radial',
          purchaseDate: '2024-01-15',
          purchaseCost: '350.00',
          supplier: 'Tyre Distributors Inc.',
          currentStatus: 'active',
          currentTreadDepth: '8.0',
          loadIndex: '152/149',
          speedRating: 'L',
          notes: 'Original purchase from main supplier. Good condition.',
          location: 'Warehouse A',
          position: 'Rack 3, Shelf 2'
        };
        setFormData(mockTyreData);
        setIsLoading(false);
      }, 500);
    };

    fetchTyreData();
  }, [tyreId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated tyre data:', formData);
    // In a real app, you would send this to your API
    alert('Tyre updated successfully!');
    router.push(`/inventory/tyres/view/${tyreId}`);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this tyre? This action cannot be undone.')) {
      console.log('Deleting tyre:', tyreId);
      // In a real app, you would send delete request to API
      alert('Tyre deleted!');
      router.push('/inventory/tyres');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading tyre data...</p>
      </div>
    );
  }

  return (
    <div className="edit-tyre-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Edit Tyre: {formData.tyreId}</h1>
          <p className="text-muted">Update tyre information as needed</p>
        </div>
        <div>
          <Link href={`/inventory/tyres/view/${tyreId}`} className="btn btn-outline-secondary">
            ← Back to Details
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">Tyre Information</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Tyre ID</label>
                <input
                  type="text"
                  name="tyreId"
                  value={formData.tyreId}
                  onChange={handleChange}
                  className="form-control"
                  readOnly
                />
                <small className="text-muted">Tyre ID cannot be changed</small>
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">Current Status</label>
                <select
                  name="currentStatus"
                  value={formData.currentStatus}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="new">New</option>
                  <option value="active">Active (Installed)</option>
                  <option value="stock">In Stock</option>
                  <option value="repair">Under Repair</option>
                  <option value="retread">Retreading</option>
                  <option value="scrapped">Scrapped</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">Current Tread Depth (mm)</label>
                <div className="input-group">
                  <input
                    type="number"
                    name="currentTreadDepth"
                    value={formData.currentTreadDepth}
                    onChange={handleChange}
                    className="form-control"
                    step="0.1"
                  />
                  <span className="input-group-text">mm</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Brand</label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="michelin">Michelin</option>
                  <option value="bridgestone">Bridgestone</option>
                  <option value="goodyear">Goodyear</option>
                  <option value="continental">Continental</option>
                  <option value="pirelli">Pirelli</option>
                  <option value="yokohama">Yokohama</option>
                  <option value="others">Others</option>
                </select>
              </div>
              
              <div className="col-md-6 mb-3">
                <label className="form-label">Model</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Size</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              
              <div className="col-md-4 mb-3">
                <label className="form-label">Type</label>
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
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Warehouse, Vehicle, etc."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-header">
            <h3>Specifications</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Load Index</label>
                <input
                  type="text"
                  name="loadIndex"
                  value={formData.loadIndex}
                  onChange={handleChange}
                  className="form-control"
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
              
              <div className="col-md-4 mb-3">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g., Front Left, Spare, etc."
                />
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
                rows="4"
                placeholder="Add any additional notes or observations..."
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Attachments</label>
              <div className="border p-3 rounded">
                <p className="text-muted mb-2">Current attachments:</p>
                <ul>
                  <li>
                    <a href="#" className="text-decoration-none">
                      📄 invoice_tyre_{tyreId}.pdf
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none">
                      📷 tyre_photo_{tyreId}.jpg
                    </a>
                  </li>
                </ul>
                <input
                  type="file"
                  className="form-control mt-2"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <small className="text-muted">Add more documents if needed</small>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              🗑️ Delete Tyre
            </button>
          </div>
          
          <div className="d-flex gap-2">
            <Link href={`/inventory/tyres/view/${tyreId}`} className="btn btn-secondary">
              Cancel
            </Link>
            
            <button
              type="submit"
              className="btn btn-primary"
            >
              💾 Save Changes
            </button>
          </div>
        </div>
      </form>

      <div className="mt-4">
        <div className="alert alert-warning">
          <h5>⚠️ Important Notes:</h5>
          <ul className="mb-0">
            <li>Changing tyre status may affect reports and analytics</li>
            <li>Update tread depth after each inspection for accurate tracking</li>
            <li>Document all repairs and maintenance activities</li>
            <li>Keep purchase records for warranty claims</li>
          </ul>
        </div>
      </div>
    </div>
  );
}