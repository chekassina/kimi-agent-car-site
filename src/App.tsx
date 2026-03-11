import { useState } from 'react';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { FeaturedCars } from '@/sections/FeaturedCars';
import { CarCatalog } from '@/sections/CarCatalog';
import { About } from '@/sections/About';
import { Footer } from '@/sections/Footer';
import type { Car } from '@/types/car';
import './App.css';

function App() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
  };

  const handleCloseDialog = () => {
    setSelectedCar(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero />
        <FeaturedCars onCarClick={handleCarClick} />
        <CarCatalog 
          selectedCar={selectedCar} 
          onCarClick={handleCarClick}
          onCloseDialog={handleCloseDialog}
        />
        <About />
        <Footer />
      </main>
    </div>
  );
}

export default App;
