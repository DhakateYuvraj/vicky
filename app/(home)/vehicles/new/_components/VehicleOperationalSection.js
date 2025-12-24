import { Row, Col, Form } from "react-bootstrap";

export default function VehicleOperationalSection({ formik }) {
  return (
    <>
      <Row className="g-3 mb-3">
        <Col md={4}>
          <Form.Control
            placeholder="Assigned Driver"
            {...formik.getFieldProps("assignedDriver")}
          />
        </Col>

        <Col md={4}>
          <Form.Control
            placeholder="Current Odometer (km)"
            {...formik.getFieldProps("currentOdometer")}
          />
        </Col>

        <Col md={4}>
          <Form.Select {...formik.getFieldProps("status")}>
            <option value="">Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="MAINTENANCE">Maintenance</option>
          </Form.Select>
        </Col>
      </Row>

      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Additional notes / remarks"
        {...formik.getFieldProps("notes")}
      />
    </>
  );
}
