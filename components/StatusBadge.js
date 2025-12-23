import { Badge } from 'react-bootstrap';

const variants = {
  active: 'success',
  stock: 'secondary',
  repair: 'warning',
  scrapped: 'danger'
};

export default function StatusBadge({ status }) {
  return (
    <Badge bg={variants[status] || 'secondary'}>
      {status.toUpperCase()}
    </Badge>
  );
}
