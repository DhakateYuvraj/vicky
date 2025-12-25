export const carFixedLayout = {
  nodes: [
    // Main Car Body
    { 
      id: 'car-body', 
      type: 'body', 
      position: { x: 150, y: 205 }, 
      data: { 
        width: 200, 
        height: 110,
        shape: 'car',
        color: '#f3f4f6',
        borderColor: '#4b5563'
      }, 
      draggable: false 
    },
    
    // Direction labels
    { id: 'front', type: 'label', position: { x: 115, y: 250 }, data: { text: 'Front' }, draggable: false },
    { id: 'back', type: 'label', position: { x: 355, y: 250 }, data: { text: 'Back' }, draggable: false },
    { id: 'left', type: 'label', position: { x: 240, y: 180 }, data: { text: 'Left' }, draggable: false },
    { id: 'right', type: 'label', position: { x: 240, y: 320 }, data: { text: 'Right' }, draggable: false },

    // Car tires (Left) - adjusted for 50×25 size
    { id: 'FL', type: 'tire', position: { x: 180, y: 185 }, data: { label: 'FL', position: 'front-left' }, draggable: false },
    { id: 'RL', type: 'tire', position: { x: 280, y: 185 }, data: { label: 'RL', position: 'rear-left' }, draggable: false },

    // Car tires (Right)
    { id: 'FR', type: 'tire', position: { x: 180, y: 305 }, data: { label: 'FR', position: 'front-right' }, draggable: false },
    { id: 'RR', type: 'tire', position: { x: 280, y: 305 }, data: { label: 'RR', position: 'rear-right' }, draggable: false },

    // Spare (right side)
    { id: 'SP1', type: 'tire', position: { x: 400, y: 235 }, data: { label: 'SP1', position: 'spare' }, draggable: false },
  ],
};