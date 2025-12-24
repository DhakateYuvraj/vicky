// File: /app/vehicles/_data/vehicles.data.js

export const VEHICLES = Array.from({ length: 50 }).map((_, i) => {
  const id = i + 1;
  
  // Vehicle types with distribution
  const vehicleTypes = ['Heavy Truck', 'Heavy Truck', 'Medium Truck', 'Bus', 'Trailer', 'Van', 'Car'];
  const vehicleType = vehicleTypes[i % vehicleTypes.length];
  
  // Makes with distribution
  const makes = ['Volvo', 'Mercedes', 'Scania', 'MAN', 'Iveco', 'Ford', 'Schmitz'];
  const make = makes[i % makes.length];
  
  // Models based on make
  const modelMap = {
    'Volvo': ['FH16', 'FH', 'FM', 'FL'][i % 4],
    'Mercedes': ['Actros', 'Arocs', 'Atego'][i % 3],
    'Scania': ['R-Series', 'P-Series', 'G-Series'][i % 3],
    'MAN': ['TGX', 'TGS', 'TGM'][i % 3],
    'Iveco': ['S-Way', 'X-Way', 'T-Way'][i % 3],
    'Ford': ['Transit', 'Ranger', 'F-Max'][i % 3],
    'Schmitz': ['S.CS', 'S.KO', 'Cargobull'][i % 3]
  };
  const model = modelMap[make];
  
  // Status with more active vehicles
  const statusOptions = ['active', 'active', 'active', 'maintenance', 'inactive'];
  const status = statusOptions[i % statusOptions.length];
  
  // Departments
  const departments = ['Logistics', 'Transport', 'Service', 'Maintenance', 'Sales'];
  const department = departments[i % departments.length];
  
  // Drivers with some "N/A"
  const drivers = ['John Driver', 'Mike Smith', 'Sarah Wilson', 'Robert Brown', 'Emma Johnson', 'David Lee', 'N/A'];
  const driver = drivers[i % drivers.length];
  
  // Locations
  const locations = ['Depot A', 'Depot B', 'Depot C', 'Workshop', 'Yard'];
  const currentLocation = locations[i % locations.length];
  
  // Colors
  const colors = ['White', 'Blue', 'Red', 'Gray', 'Black', 'Green', 'Silver'];
  const color = colors[i % colors.length];
  
  // Fuel types
  const fuelTypes = ['Diesel', 'Diesel', 'Diesel', 'Petrol', 'Electric', 'Hybrid'];
  const fuelType = fuelTypes[i % fuelTypes.length];
  
  // Generate registration number based on vehicle type
  let regPrefix;
  switch(vehicleType) {
    case 'Heavy Truck':
    case 'Medium Truck':
      regPrefix = 'TRK';
      break;
    case 'Bus':
      regPrefix = 'BUS';
      break;
    case 'Trailer':
      regPrefix = 'TRL';
      break;
    case 'Van':
      regPrefix = 'VAN';
      break;
    case 'Car':
      regPrefix = 'CAR';
      break;
    default:
      regPrefix = 'VH';
  }
  const registrationNumber = `${regPrefix}-${String(id).padStart(4, '0')}`;
  
  // Get tyre configuration based on vehicle type
  let totalTyres, activeTyres, axleConfig, gvw;
  switch(vehicleType) {
    case 'Heavy Truck':
      totalTyres = 10;
      activeTyres = status === 'active' ? 10 : (status === 'maintenance' ? 6 : 0);
      axleConfig = '6x4';
      gvw = '40,000';
      break;
    case 'Medium Truck':
      totalTyres = 6;
      activeTyres = status === 'active' ? 6 : (status === 'maintenance' ? 4 : 0);
      axleConfig = '4x2';
      gvw = '16,000';
      break;
    case 'Bus':
      totalTyres = 8;
      activeTyres = status === 'active' ? 8 : (status === 'maintenance' ? 6 : 0);
      axleConfig = '4x2';
      gvw = '28,000';
      break;
    case 'Trailer':
      totalTyres = 8;
      activeTyres = status === 'active' ? 8 : (status === 'maintenance' ? 6 : 0);
      axleConfig = '4 axle';
      gvw = '35,000';
      break;
    case 'Van':
      totalTyres = 4;
      activeTyres = status === 'active' ? 4 : (status === 'maintenance' ? 2 : 0);
      axleConfig = '4x2';
      gvw = '3,500';
      break;
    case 'Car':
      totalTyres = 4;
      activeTyres = status === 'active' ? 4 : (status === 'maintenance' ? 2 : 0);
      axleConfig = '4x2';
      gvw = '2,000';
      break;
    default:
      totalTyres = 4;
      activeTyres = 4;
      axleConfig = '4x2';
      gvw = '5,000';
  }
  
  // Generate VIN
  const vin = `1F${make.substring(0, 3).toUpperCase()}${String(id).padStart(5, '0')}${String(i).padStart(5, '0')}`;
  
  // Generate dates
  const year = 2018 + (i % 7); // 2018-2024
  const createdAt = `${year}-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`;
  
  // Last inspection: within last 6 months
  const lastInspection = `2024-${String((i % 6) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`;
  
  // Next inspection: 1 month after last
  const nextInspectionMonth = parseInt(lastInspection.split('-')[1]) + 1;
  const nextInspection = `2024-${String(nextInspectionMonth).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`;
  
  // Expiry dates: end of year
  const expiryYear = 2024 + Math.floor(i / 12);
  const insuranceExpiry = `${expiryYear}-12-31`;
  const registrationExpiry = `${expiryYear}-12-31`;
  
  // Odometer based on vehicle age and type
  const baseOdometer = (2024 - year) * 30000;
  const odometer = baseOdometer + (i % 50000);
  
  return {
    id: `VH${String(id).padStart(3, '0')}`,
    registrationNumber,
    vin,
    vehicleType,
    make,
    model,
    year,
    status,
    currentLocation,
    totalTyres,
    activeTyres,
    odometer,
    fuelType,
    department,
    driver,
    lastInspection,
    nextInspection,
    insuranceExpiry,
    registrationExpiry,
    gvw,
    axleConfig,
    color,
    createdAt
  };
});

// Export other constants
export const VEHICLE_TYPES = ['Heavy Truck', 'Medium Truck', 'Light Truck', 'Bus', 'Trailer', 'Van', 'Car', 'Other'];
export const VEHICLE_STATUSES = ['active', 'inactive', 'maintenance', 'accident', 'scrapped'];
export const VEHICLE_MAKES = ['Volvo', 'Mercedes', 'Scania', 'MAN', 'Iveco', 'Ford', 'Schmitz', 'DAF', 'Renault', 'Isuzu', 'Other'];
export const FUEL_TYPES = ['Diesel', 'Petrol', 'Electric', 'Hybrid', 'CNG', 'LPG'];