export const truckFixedLayout = {
  nodes: [
    // Truck body
    { 
      id: 'truck-body', 
      type: 'body', 
      position: { x: 150, y: 205 }, 
      data: { 
        width: 220, 
        height: 110,
        shape: 'truck',
        color: '#d1d5db',
        borderColor: '#374151'
      }, 
      draggable: false 
    },
    
    // Direction labels
    { id: 'front', type: 'label', position: { x: 125, y: 265 }, data: { text: 'Front' }, draggable: false },
    { id: 'back', type: 'label', position: { x: 395, y: 265 }, data: { text: 'Back' }, draggable: false },
    { id: 'left', type: 'label', position: { x: 260, y: 165 }, data: { text: 'Left' }, draggable: false },
    { id: 'right', type: 'label', position: { x: 260, y: 345 }, data: { text: 'Right' }, draggable: false },

    // Truck tires (Left side) - adjusted
    { id: 'S1-L', type: 'tire', position: { x: 180, y: 185 }, data: { label: 'S1-L', position: 'steer-left' }, draggable: false },
    { id: 'D1-L', type: 'tire', position: { x: 260, y: 185 }, data: { label: 'D1-L', position: 'drive-left-1' }, draggable: false },
    { id: 'D2-L', type: 'tire', position: { x: 340, y: 185 }, data: { label: 'D2-L', position: 'drive-left-2' }, draggable: false },

    // Truck tires (Right side)
    { id: 'S1-R', type: 'tire', position: { x: 180, y: 305 }, data: { label: 'S1-R', position: 'steer-right' }, draggable: false },
    { id: 'D1-R', type: 'tire', position: { x: 260, y: 305 }, data: { label: 'D1-R', position: 'drive-right-1' }, draggable: false },
    { id: 'D2-R', type: 'tire', position: { x: 340, y: 305 }, data: { label: 'D2-R', position: 'drive-right-2' }, draggable: false },

    // Spares (stacked on right)
    { id: 'SP1', type: 'tire', position: { x: 455, y: 165 }, data: { label: 'SP1', position: 'spare-1' }, draggable: false },
    { id: 'SP2', type: 'tire', position: { x: 455, y: 225 }, data: { label: 'SP2', position: 'spare-2' }, draggable: false },
    { id: 'SP3', type: 'tire', position: { x: 455, y: 285 }, data: { label: 'SP3', position: 'spare-3' }, draggable: false },
    { id: 'SP4', type: 'tire', position: { x: 455, y: 345 }, data: { label: 'SP4', position: 'spare-4' }, draggable: false },
  ],
};