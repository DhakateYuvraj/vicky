export const TIRES = Array.from({ length: 250 }).map((_, i) => ({
  id: `TIRE-${String(i + 1).padStart(3, '0')}`,
  brand: ['Michelin', 'Bridgestone', 'MRF'][i % 3],
  size: ['295/80R22.5', '315/80R22.5'][i % 2],
  status: ['active', 'stock', 'repair'][i % 3],
  mileage: Math.floor(Math.random() * 60000),
  treadDepth: Math.round(Math.random() * 10)
}));
