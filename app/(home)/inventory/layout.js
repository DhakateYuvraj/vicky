'use client';

import Link from 'next/link';

export default function InventoryLayout({ children }) {
  return (
    <div className="inventory-layout">
          {children}
    </div>
  );
}