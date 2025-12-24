import { Row, Col, Form } from "react-bootstrap";

export default function VehicleBasicSection({ formik }) {
  return (
    <Row className="g-3">
      <Col md={4}>
        <Form.Control
          name="vehicleId"
          placeholder="Vehicle ID"
          {...formik.getFieldProps("vehicleId")}
        />
      </Col>

      <Col md={4}>
        <Form.Control
          name="registrationNumber"
          placeholder="Registration Number"
          {...formik.getFieldProps("registrationNumber")}
        />
      </Col>

      <Col md={4}>
        <Form.Control
          name="vinNumber"
          placeholder="VIN Number"
          {...formik.getFieldProps("vinNumber")}
        />
      </Col>
    </Row>
  );
}
