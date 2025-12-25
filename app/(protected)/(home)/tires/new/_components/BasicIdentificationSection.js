import { Row, Col, Form } from 'react-bootstrap';

export default function BasicIdentificationSection({ formik }) {
  return (
    <Row className="g-3">
      <Col md={4}>
        <Form.Control
          name="tireId"
          placeholder="Tire ID"
          value={formik.values.tireId}
          onChange={formik.handleChange}
          isInvalid={formik.touched.tireId && formik.errors.tireId}
        />
      </Col>

      <Col md={4}>
        <Form.Control
          name="serialNumber"
          placeholder="Serial Number"
          {...formik.getFieldProps('serialNumber')}
        />
      </Col>

      <Col md={4}>
        <Form.Control
          name="dotNumber"
          placeholder="DOT Number"
          {...formik.getFieldProps('dotNumber')}
        />
      </Col>
    </Row>
  );
}
