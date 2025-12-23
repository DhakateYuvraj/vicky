'use client';

import { useEffect } from 'react';
import { useHeaderBreadcrumb } from 'hooks/useHeaderBreadcrumb';
import TireInventoryClient from './TireInventoryClient';
import { TIRES } from './data/tires.data';
import { Card } from 'react-bootstrap';

export default function TireInventoryPage() {
  const { setHeader, setBreadcrumb } = useHeaderBreadcrumb();

  useEffect(() => {
    setHeader('Tire Inventory');
    setBreadcrumb(['Home', 'Tire Inventory']);
    
    // Optional: Clean up when leaving page
    return () => {
      setHeader('');
      setBreadcrumb([]);
    };
  }, [setHeader, setBreadcrumb]);
  
  return (
    <div className="container-fluid px-4 py-4">
    <Card >
      <TireInventoryClient initialData={TIRES || []} />
    </Card>
    </div>
  );
}
