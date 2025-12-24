'use client';

import { Card, Row, Col } from 'react-bootstrap';
import { Truck, CheckCircle, Wrench, XCircle, TrendingUp } from 'react-feather';

export default function VehicleStats({ vehicles = [] }) {
  const stats = {
    total: vehicles.length,
    active: vehicles.filter(v => v.status === 'active').length,
    maintenance: vehicles.filter(v => v.status === 'maintenance').length,
    inactive: vehicles.filter(v => v.status === 'inactive').length,
    totalTyres: vehicles.reduce((sum, v) => sum + (v.totalTyres || 0), 0),
    activeTyres: vehicles.reduce((sum, v) => sum + (v.activeTyres || 0), 0),
    totalOdometer: vehicles.reduce((sum, v) => sum + (v.odometer || 0), 0),
    avgOdometer: vehicles.length > 0 
      ? Math.round(vehicles.reduce((sum, v) => sum + (v.odometer || 0), 0) / vehicles.length)
      : 0
  };

  return (
    <Row className="mb-4 g-3">
      <Col xs={12} sm={6} md={3}>
        <Card className="border-primary border-2">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="text-primary mb-1">Total Vehicles</Card.Title>
                <h2 className="mb-0">{stats.total}</h2>
                <small className="text-muted">All fleet vehicles</small>
              </div>
              <div className="text-primary">
                <Truck size={32} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} sm={6} md={3}>
        <Card className="border-success border-2">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="text-success mb-1">Active</Card.Title>
                <h2 className="mb-0">{stats.active}</h2>
                <small className="text-muted">
                  {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}% of fleet
                </small>
              </div>
              <div className="text-success">
                <CheckCircle size={32} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} sm={6} md={3}>
        <Card className="border-warning border-2">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="text-warning mb-1">In Maintenance</Card.Title>
                <h2 className="mb-0">{stats.maintenance}</h2>
                <small className="text-muted">Require attention</small>
              </div>
              <div className="text-warning">
                <Wrench size={32} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col xs={12} sm={6} md={3}>
        <Card className="border-info border-2">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="text-info mb-1">Total Tyres</Card.Title>
                <h2 className="mb-0">{stats.totalTyres}</h2>
                <small className="text-muted">
                  {stats.activeTyres} active • {stats.totalTyres - stats.activeTyres} spare/stock
                </small>
              </div>
              <div className="text-info">
                <TrendingUp size={32} />
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}