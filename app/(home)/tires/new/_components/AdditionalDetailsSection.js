import { Form } from 'react-bootstrap';

export default function AdditionalDetailsSection({ formik }) {
  return (
    <Form.Control
      as="textarea"
      rows={3}
      placeholder="Additional notes / remarks"
      {...formik.getFieldProps('notes')}
    />
  );
}
