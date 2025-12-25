"use client";

import dynamic from 'next/dynamic';

const DashboardClient = dynamic(
  () => import('./DashboardClient'),
  { ssr: false }
);

/*
export const metadata = {
  title: "Dashboard | Tire ERP"
};
*/

async function getDashboardData() {
  // Later replace with real API / DB
  return {
    summary: [
      { title: "Total Tyres", value: 1250, color: "primary" },
      { title: "Active on Vehicles", value: 845, color: "success" },
      { title: "In Stock", value: 285, color: "info" },
      { title: "Low Stock", value: 15, color: "warning" },
      { title: "Under Repair", value: 45, color: "warning" },
      { title: "Scrapped (Monthly)", value: 23, color: "danger" }
    ]
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="container-fluid px-4 py-4">
      <DashboardClient data={data} />
    </div>
  );
}
