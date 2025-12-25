// This script updates all components to be SSR-safe
const fs = require('fs');
const path = require('path');

// Update VehicleFlow.jsx
const vehicleFlowPath = path.join(__dirname, '_components/VehicleFlow.jsx');
let vehicleFlowContent = fs.readFileSync(vehicleFlowPath, 'utf8');

// Add useState import if not present
if (!vehicleFlowContent.includes("useState")) {
  vehicleFlowContent = vehicleFlowContent.replace(
    "import { useEffect } from 'react';",
    "import { useEffect, useState } from 'react';"
  );
}

// Add client check
if (!vehicleFlowContent.includes('const [isClient')) {
  // Find the component function
  const lines = vehicleFlowContent.split('\n');
  const exportDefaultIndex = lines.findIndex(line => line.includes('export default function VehicleFlow'));
  
  if (exportDefaultIndex !== -1) {
    // Add state after function declaration
    lines.splice(exportDefaultIndex + 1, 0, '  const [isClient, setIsClient] = useState(false);');
    lines.splice(exportDefaultIndex + 2, 0, '  ');
    lines.splice(exportDefaultIndex + 3, 0, '  useEffect(() => {');
    lines.splice(exportDefaultIndex + 4, 0, '    setIsClient(true);');
    lines.splice(exportDefaultIndex + 5, 0, '  }, []);');
    
    // Add return check before ReactFlow return
    const returnIndex = lines.findIndex(line => line.includes('return (') && line.includes('<ReactFlow'));
    if (returnIndex !== -1) {
      lines.splice(returnIndex, 0, '  if (!isClient) {');
      lines.splice(returnIndex + 1, 0, '    return <div>Loading...</div>;');
      lines.splice(returnIndex + 2, 0, '  }');
      lines.splice(returnIndex + 3, 0, '  ');
    }
  }
  
  vehicleFlowContent = lines.join('\n');
}

fs.writeFileSync(vehicleFlowPath, vehicleFlowContent);
console.log('✅ Updated VehicleFlow.jsx for SSR');