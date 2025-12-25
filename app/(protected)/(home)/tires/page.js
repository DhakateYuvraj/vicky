'use client';

import { useEffect } from 'react';
import { useHeaderBreadcrumb } from 'hooks/useHeaderBreadcrumb';
import TireInventoryClient from './TireInventoryClient';
import { TIRES } from './_data/tires.data';
import { Card } from 'react-bootstrap';

export default function TireInventoryPage() {
  const { setHeader, setBreadcrumb } = useHeaderBreadcrumb();

  useEffect(() => {
    setHeader('Tires');
    setBreadcrumb(['Home', 'Tires']);
    
    // Optional: Clean up when leaving page
    return () => {
      setHeader('');
      setBreadcrumb([]);
    };
  }, [setHeader, setBreadcrumb]);
  
  return (
    <div className="container-fluid px-4 py-4">
    <Card className="shadow-sm">
      <TireInventoryClient initialData={TIRES || []} />
    </Card>
    </div>
  );
}
