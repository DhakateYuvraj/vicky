'use client';

import { useEffect } from 'react';
import { useHeaderBreadcrumb } from 'hooks/useHeaderBreadcrumb';
import VehicleInventoryClient from './VehicleInventoryClient';
import { VEHICLES } from './_data/vehicles.data';
import { Card } from 'react-bootstrap';

export default function VehicleInventoryPage() {
  const { setHeader, setBreadcrumb } = useHeaderBreadcrumb();

  useEffect(() => {
    setHeader('Vehicle Inventory');
    setBreadcrumb(['Home', 'Vehicle Inventory']);
    
    // Optional: Clean up when leaving page
    return () => {
      setHeader('');
      setBreadcrumb([]);
    };
  }, [setHeader, setBreadcrumb]);
  
  return (
    <div className="container-fluid px-4 py-4">
      <Card className="shadow-sm">
        <VehicleInventoryClient initialData={VEHICLES || []} />
      </Card>
    </div>
  );
}