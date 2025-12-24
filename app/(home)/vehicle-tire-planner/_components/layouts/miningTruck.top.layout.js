export const miningTruckFixedLayout = {
  nodes: [
    // Mining truck body
    { 
      id: 'miningTruck-body', 
      type: 'body', 
      position: { x: 120, y: 155 }, 
      data: { 
        width: 400, 
        height: 185,
        shape: 'miningTruck',
        color: '#6b7280',
        borderColor: '#111827'
      }, 
      draggable: false 
    },
    
    // Direction labels
    { id: 'front', type: 'label', position: { x: 105, y: 255 }, data: { text: 'Front' }, draggable: false },
    { id: 'back', type: 'label', position: { x: 545, y: 255 }, data: { text: 'Back' }, draggable: false },
    { id: 'left', type: 'label', position: { x: 320, y: 125 }, data: { text: 'Left' }, draggable: false },
    { id: 'right', type: 'label', position: { x: 320, y: 385 }, data: { text: 'Right' }, draggable: false },

    // Mining truck tires (Left side) - large size (60×30)
    { id: 'F-L1', type: 'tire', position: { x: 185, y: 145 }, data: { label: 'F-L1', position: 'front-left-1', size: 'large' }, draggable: false },
    { id: 'F-L2', type: 'tire', position: { x: 185, y: 185 }, data: { label: 'F-L2', position: 'front-left-2', size: 'large' }, draggable: false },
    { id: 'R-L1', type: 'tire', position: { x: 385, y: 145 }, data: { label: 'R-L1', position: 'rear-left-1', size: 'large' }, draggable: false },
    { id: 'R-L2', type: 'tire', position: { x: 385, y: 185 }, data: { label: 'R-L2', position: 'rear-left-2', size: 'large' }, draggable: false },
    { id: 'R-L3', type: 'tire', position: { x: 435, y: 145 }, data: { label: 'R-L3', position: 'rear-left-3', size: 'large' }, draggable: false },
    { id: 'R-L4', type: 'tire', position: { x: 435, y: 185 }, data: { label: 'R-L4', position: 'rear-left-4', size: 'large' }, draggable: false },

    // Mining truck tires (Right side)
    { id: 'F-R1', type: 'tire', position: { x: 185, y: 285 }, data: { label: 'F-R1', position: 'front-right-1', size: 'large' }, draggable: false },
    { id: 'F-R2', type: 'tire', position: { x: 185, y: 325 }, data: { label: 'F-R2', position: 'front-right-2', size: 'large' }, draggable: false },
    { id: 'R-R1', type: 'tire', position: { x: 385, y: 285 }, data: { label: 'R-R1', position: 'rear-right-1', size: 'large' }, draggable: false },
    { id: 'R-R2', type: 'tire', position: { x: 385, y: 325 }, data: { label: 'R-R2', position: 'rear-right-2', size: 'large' }, draggable: false },
    { id: 'R-R3', type: 'tire', position: { x: 435, y: 285 }, data: { label: 'R-R3', position: 'rear-right-3', size: 'large' }, draggable: false },
    { id: 'R-R4', type: 'tire', position: { x: 435, y: 325 }, data: { label: 'R-R4', position: 'rear-right-4', size: 'large' }, draggable: false },

    // Spare tires
    { id: 'SP1', type: 'tire', position: { x: 595, y: 125 }, data: { label: 'SP1', position: 'spare-1', size: 'large' }, draggable: false },
    { id: 'SP2', type: 'tire', position: { x: 595, y: 185 }, data: { label: 'SP2', position: 'spare-2', size: 'large' }, draggable: false },
    { id: 'SP3', type: 'tire', position: { x: 595, y: 245 }, data: { label: 'SP3', position: 'spare-3', size: 'large' }, draggable: false },
    { id: 'SP4', type: 'tire', position: { x: 595, y: 305 }, data: { label: 'SP4', position: 'spare-4', size: 'large' }, draggable: false },
    { id: 'SP5', type: 'tire', position: { x: 595, y: 365 }, data: { label: 'SP5', position: 'spare-5', size: 'large' }, draggable: false },
  ],
};