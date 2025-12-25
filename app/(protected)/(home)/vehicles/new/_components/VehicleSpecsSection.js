'use client';
import { Row, Col, Form } from "react-bootstrap";
import { 
  VEHICLE_TYPES, 
  FUEL_TYPES, 
  TRANSMISSION_TYPES,
  VEHICLE_COLORS,
  AXLE_CONFIGS 
} from "../_constants/enums";

export default function VehicleSpecsSection({ formik }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);
  
  return (
    <>
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Select {...formik.getFieldProps('vehicleType')}>
              <option value="">Select Type</option>
              {VEHICLE_TYPES.map(type => (
                <option key={type} value={type.toLowerCase().replace(/[^a-z0-9]/g, '-')}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label>Fuel Type</Form.Label>
            <Form.Select {...formik.getFieldProps('fuelType')}>
              <option value="">Select Fuel Type</option>
              {FUEL_TYPES.map(fuel => (
                <option key={fuel} value={fuel.toLowerCase()}>
                  {fuel}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label>Transmission</Form.Label>
            <Form.Select {...formik.getFieldProps('transmission')}>
              <option value="">Select Transmission</option>
              {TRANSMISSION_TYPES.map(trans => (
                <option key={trans} value={trans.toLowerCase()}>
                  {trans}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Make</Form.Label>
            <Form.Control
              name="make"
              placeholder="e.g., Toyota, Hyundai, Tata"
              {...formik.getFieldProps('make')}
            />
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label>Model</Form.Label>
            <Form.Control
              name="model"
              placeholder="e.g., Innova, XUV700, Nexon"
              {...formik.getFieldProps('model')}
            />
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label>Year</Form.Label>
            <Form.Select {...formik.getFieldProps('year')}>
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-3 mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Select {...formik.getFieldProps('color')}>
              <option value="">Select Color</option>
              {VEHICLE_COLORS.map(color => (
                <option key={color} value={color.toLowerCase()}>
                  {color}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label>Seating Capacity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="100"
              placeholder="e.g., 5, 7, 12"
              {...formik.getFieldProps('seatingCapacity')}
            />
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label>Axle Configuration</Form.Label>
            <Form.Select {...formik.getFieldProps('axleConfig')}>
              <option value="">Select Configuration</option>
              {AXLE_CONFIGS.map(config => (
                <option key={config.value} value={config.value}>
                  {config.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Engine Capacity (cc)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="100"
              placeholder="e.g., 1498, 2198"
              {...formik.getFieldProps('engineCapacity')}
            />
            <Form.Text className="text-muted">
              In cubic centimeters (cc)
            </Form.Text>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group>
            <Form.Label>Odometer Reading (km)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="1"
              placeholder="Current mileage"
              {...formik.getFieldProps('odometer')}
            />
            <Form.Text className="text-muted">
              Current total distance traveled
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}