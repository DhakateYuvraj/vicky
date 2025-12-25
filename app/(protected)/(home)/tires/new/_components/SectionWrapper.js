'use client';
import { Card, Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';

export default function SectionWrapper({
  title,
  children,
  defaultOpen = false
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Header
        onClick={() => setOpen(!open)}
        className="d-flex justify-content-between align-items-center cursor-pointer"
      >
        <strong>{title}</strong>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Card.Header>

      <Collapse in={open}>
        <div>
          <Card.Body>{children}</Card.Body>
        </div>
      </Collapse>
    </Card>
  );
}
