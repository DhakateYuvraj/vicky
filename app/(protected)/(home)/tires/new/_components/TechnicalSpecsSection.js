import { Row, Col, Form } from 'react-bootstrap';
import {
  TIRE_TYPES,
  TUBE_TYPES,
  APPLICATIONS
} from '../_constants/enums';

export default function TechnicalSpecsSection({ formik }) {
  return (
    <Row className="g-3">
      <Col md={3}>
        <Form.Control
          name="size"
          placeholder="205/55R16"
          {...formik.getFieldProps('size')}
        />
      </Col>

      <Col md={3}>
        <Form.Select {...formik.getFieldProps('type')}>
          <option value="">Type</option>
          {TIRE_TYPES.map(t => <option key={t}>{t}</option>)}
        </Form.Select>
      </Col>

      <Col md={3}>
        <Form.Select {...formik.getFieldProps('tubeType')}>
          <option value="">Tube Type</option>
          {TUBE_TYPES.map(t => <option key={t}>{t}</option>)}
        </Form.Select>
      </Col>

      <Col md={3}>
        <Form.Select {...formik.getFieldProps('application')}>
          <option value="">Application</option>
          {APPLICATIONS.map(a => <option key={a}>{a}</option>)}
        </Form.Select>
      </Col>
    </Row>
  );
}
