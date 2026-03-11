export interface Car {
  id: string;
  name: string;
  brand: string;
  price: number;
  year: number;
  category: 'supercar' | 'luxury' | 'hypercar' | 'suv' | 'sports';
  engine: string;
  horsepower: number;
  torque: string;
  topSpeed: string;
  acceleration: string;
  transmission: string;
  drivetrain: string;
  image: string;
  description: string;
  features: string[];
}

export type CarCategory = 'all' | 'supercar' | 'luxury' | 'hypercar' | 'suv' | 'sports';

export interface CarFilter {
  category: CarCategory;
  search: string;
  priceRange: [number, number];
  brand: string;
}
