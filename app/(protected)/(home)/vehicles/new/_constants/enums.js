// Vehicle Types
export const VEHICLE_TYPES = [
  "Passenger Car",
  "SUV (Sports Utility Vehicle)",
  "MPV (Multi-Purpose Vehicle)",
  "Pickup Truck",
  "Light Commercial Vehicle",
  "Heavy Commercial Vehicle",
  "Bus / Coach",
  "Motorcycle / Scooter",
  "Tractor",
  "Construction Equipment",
  "Agricultural Equipment",
  "Forklift",
  "Trailer",
  "Other"
];

// Fuel Types
export const FUEL_TYPES = [
  "Petrol",
  "Diesel",
  "CNG (Compressed Natural Gas)",
  "LPG (Liquefied Petroleum Gas)",
  "Electric",
  "Hybrid (Petrol-Electric)",
  "Plug-in Hybrid",
  "Hydrogen Fuel Cell",
  "Bio-diesel",
  "Other"
];

// Transmission Types
export const TRANSMISSION_TYPES = [
  "Manual",
  "Automatic",
  "CVT (Continuously Variable)",
  "DCT (Dual Clutch)",
  "AMT (Automated Manual)",
  "Semi-Automatic",
  "Direct Drive",
  "Other"
];

// Owner Types
export const OWNER_TYPES = [
  "Individual",
  "Company / Corporate",
  "Government",
  "Rental / Lease",
  "Fleet Operator",
  "Dealer / Showroom",
  "Other"
];

// Vehicle Status
export const VEHICLE_STATUS = [
  "Active",
  "In Service",
  "Under Maintenance",
  "Damaged",
  "Scrapped",
  "Sold",
  "Archived"
];

// Axle Configurations
export const AXLE_CONFIGS = [
  { value: "4x2", label: "4x2 (Single Axle)" },
  { value: "6x2", label: "6x2 (Tandem Axle)" },
  { value: "6x4", label: "6x4 (Twin Axle)" },
  { value: "8x4", label: "8x4 (Multi Axle)" },
  { value: "4x4", label: "4x4 (4WD)" },
  { value: "other", label: "Other" }
];

// Common Tire Sizes
export const TIRE_SIZES = [
  "155/70R13",
  "165/70R13",
  "175/70R13",
  "185/70R13",
  "155/80R13",
  "165/80R13",
  "175/65R14",
  "185/65R14",
  "195/65R14",
  "205/65R14",
  "175/70R14",
  "185/70R14",
  "195/70R14",
  "205/70R14",
  "185/60R15",
  "195/60R15",
  "205/60R15",
  "215/60R15",
  "185/65R15",
  "195/65R15",
  "205/65R15",
  "215/65R15",
  "195/55R16",
  "205/55R16",
  "215/55R16",
  "225/55R16",
  "205/60R16",
  "215/60R16",
  "225/60R16",
  "235/60R16",
  "215/55R17",
  "225/55R17",
  "235/55R17",
  "245/55R17",
  "225/60R17",
  "235/60R17",
  "245/60R17",
  "255/60R17",
  "235/55R18",
  "245/55R18",
  "255/55R18",
  "265/55R18",
  "245/45R19",
  "255/45R19",
  "265/45R19",
  "275/45R19",
  "255/40R20",
  "265/40R20",
  "275/40R20",
  "285/40R20",
  "265/65R17",  // SUV sizes
  "275/65R17",
  "285/65R17",
  "265/60R18",
  "275/60R18",
  "285/60R18",
  "265/55R20",
  "275/55R20",
  "285/55R20",
  "295/55R20",
  "235/75R15",  // Off-road
  "31x10.5R15",
  "33x12.5R15",
  "35x12.5R15",
  "285/75R16",
  "305/70R16",
  "315/75R16",
  "255/85R16",
  "275/70R18",
  "285/70R18",
  "295/70R18",
  "305/70R18",
  "8.25R16",    // Truck sizes
  "9.00R20",
  "10.00R20",
  "11.00R20",
  "12.00R20",
  "295/80R22.5",
  "315/80R22.5",
  "385/65R22.5"
];

// Vehicle Colors
export const VEHICLE_COLORS = [
  "White",
  "Black",
  "Silver",
  "Gray",
  "Blue",
  "Red",
  "Green",
  "Brown",
  "Yellow",
  "Orange",
  "Purple",
  "Gold",
  "Beige",
  "Maroon",
  "Navy Blue",
  "Teal",
  "Bronze",
  "Champagne",
  "Pearl White",
  "Metallic Black",
  "Other"
];

// Service Intervals (months)
export const SERVICE_INTERVALS = [
  { value: 3, label: "3 Months" },
  { value: 6, label: "6 Months" },
  { value: 12, label: "12 Months" },
  { value: 24, label: "24 Months" }
];

// Insurance Types
export const INSURANCE_TYPES = [
  "Comprehensive",
  "Third Party",
  "Third Party Fire & Theft",
  "Own Damage",
  "Package Policy"
];

// Vehicle Classes (Indian context)
export const VEHICLE_CLASSES = [
  "Hatchback",
  "Sedan",
  "SUV",
  "MUV",
  "Coupe",
  "Convertible",
  "Wagon",
  "Van",
  "Mini Truck",
  "Truck",
  "Bus",
  "Two-wheeler",
  "Three-wheeler"
];

// Document Types
export const DOCUMENT_TYPES = [
  "RC Book",
  "Insurance",
  "PUC",
  "Fitness Certificate",
  "Permit",
  "Road Tax",
  "Invoice",
  "Service Book",
  "Warranty Card",
  "Other"
];

// Usage Types
export const USAGE_TYPES = [
  "Personal",
  "Commercial",
  "Rental",
  "Taxi",
  "Delivery",
  "School Transport",
  "Hospitality",
  "Construction",
  "Agriculture",
  "Other"
];

// Default values for form
export const DEFAULT_VALUES = {
  vehicleType: "passenger-car",
  fuelType: "petrol",
  transmission: "manual",
  ownerType: "individual",
  status: "active",
  serviceInterval: 6,
  frontTireSize: "205/55R16",
  rearTireSize: "205/55R16",
  spareTireSize: "205/55R16",
  frontTirePressure: 32,
  rearTirePressure: 32,
  spareTirePressure: 32,
  frontAxleTires: 2,
  rearAxleTires: 2
};