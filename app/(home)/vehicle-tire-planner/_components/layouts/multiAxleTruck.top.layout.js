export const multiAxleTruckFixedLayout = {
  nodes: [
    // Multi-axle truck body
    { 
      id: 'multiAxle-body', 
      type: 'body', 
      position: { x: 120, y: 185 }, 
      data: { 
        width: 350, 
        height: 130,
        shape: 'multiAxleTruck',
        color: '#9ca3af',
        borderColor: '#1f2937'
      }, 
      draggable: false 
    },
    
    // Direction labels
    { id: 'front', type: 'label', position: { x: 105, y: 255 }, data: { text: 'Front' }, draggable: false },
    { id: 'back', type: 'label', position: { x: 495, y: 255 }, data: { text: 'Back' }, draggable: false },
    { id: 'left', type: 'label', position: { x: 295, y: 145 }, data: { text: 'Left' }, draggable: false },
    { id: 'right', type: 'label', position: { x: 295, y: 365 }, data: { text: 'Right' }, draggable: false },

    // Multi-axle tires (Left side) - adjusted
    { id: 'S1-L', type: 'tire', position: { x: 165, y: 165 }, data: { label: 'S1-L', position: 'steer-left' }, draggable: false },
    { id: 'D1-L', type: 'tire', position: { x: 225, y: 165 }, data: { label: 'D1-L', position: 'drive-left-1' }, draggable: false },
    { id: 'D2-L', type: 'tire', position: { x: 285, y: 165 }, data: { label: 'D2-L', position: 'drive-left-2' }, draggable: false },
    { id: 'T1-L', type: 'tire', position: { x: 345, y: 165 }, data: { label: 'T1-L', position: 'trailer-left-1' }, draggable: false },
    { id: 'T2-L', type: 'tire', position: { x: 405, y: 165 }, data: { label: 'T2-L', position: 'trailer-left-2' }, draggable: false },
    { id: 'T3-L', type: 'tire', position: { x: 465, y: 165 }, data: { label: 'T3-L', position: 'trailer-left-3' }, draggable: false },

    // Multi-axle tires (Right side)
    { id: 'S1-R', type: 'tire', position: { x: 165, y: 305 }, data: { label: 'S1-R', position: 'steer-right' }, draggable: false },
    { id: 'D1-R', type: 'tire', position: { x: 225, y: 305 }, data: { label: 'D1-R', position: 'drive-right-1' }, draggable: false },
    { id: 'D2-R', type: 'tire', position: { x: 285, y: 305 }, data: { label: 'D2-R', position: 'drive-right-2' }, draggable: false },
    { id: 'T1-R', type: 'tire', position: { x: 345, y: 305 }, data: { label: 'T1-R', position: 'trailer-right-1' }, draggable: false },
    { id: 'T2-R', type: 'tire', position: { x: 405, y: 305 }, data: { label: 'T2-R', position: 'trailer-right-2' }, draggable: false },
    { id: 'T3-R', type: 'tire', position: { x: 465, y: 305 }, data: { label: 'T3-R', position: 'trailer-right-3' }, draggable: false },

    // Spare tires
    { id: 'SP1', type: 'tire', position: { x: 545, y: 145 }, data: { label: 'SP1', position: 'spare-1' }, draggable: false },
    { id: 'SP2', type: 'tire', position: { x: 545, y: 195 }, data: { label: 'SP2', position: 'spare-2' }, draggable: false },
    { id: 'SP3', type: 'tire', position: { x: 545, y: 245 }, data: { label: 'SP3', position: 'spare-3' }, draggable: false },
    { id: 'SP4', type: 'tire', position: { x: 545, y: 295 }, data: { label: 'SP4', position: 'spare-4' }, draggable: false },
    { id: 'SP5', type: 'tire', position: { x: 545, y: 345 }, data: { label: 'SP5', position: 'spare-5' }, draggable: false },
  ],
};