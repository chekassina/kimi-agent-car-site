import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Gauge, Zap, Timer } from 'lucide-react';
import { cars } from '@/data/cars';
import type { Car } from '@/types/car';

interface FeaturedCarsProps {
  onCarClick: (car: Car) => void;
}

export function FeaturedCars({ onCarClick }: FeaturedCarsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const featuredCars = cars.slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-background"
      aria-labelledby="featured-cars-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <Badge variant="outline" className="mb-4 border-red-500/50 text-red-400">
              Featured Collection
            </Badge>
            <h2 id="featured-cars-heading" className="text-4xl sm:text-5xl font-bold text-white">
              Handpicked <span className="text-gradient">Excellence</span>
            </h2>
            <p className="text-white/60 mt-3 max-w-lg">
              Discover our most exclusive vehicles, carefully selected for the discerning collector.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 rounded-full group self-start sm:self-auto"
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="View all cars in our inventory"
          >
            View All Cars
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Button>
        </header>

        {/* Cars Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          role="list"
          aria-label="Featured exotic cars"
        >
          {featuredCars.map((car, index) => (
            <article key={car.id} role="listitem">
              <Card
                onClick={() => onCarClick(car)}
                className={`group relative overflow-hidden bg-card border-border cursor-pointer hover-lift transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${car.name} by ${car.brand}, priced at ${formatPrice(car.price)}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCarClick(car);
                  }
                }}
              >
                {/* Image */}
                <figure className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.name} - ${car.brand} ${car.category} with ${car.horsepower} horsepower`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-red-600 text-white border-0">
                      {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
                    </Badge>
                    <Badge variant="secondary" className="bg-black/50 text-white border-0">
                      {car.year}
                    </Badge>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-amber-500 text-black font-bold border-0 text-lg">
                      {formatPrice(car.price)}
                    </Badge>
                  </div>
                </figure>

                {/* Content */}
                <div className="p-6">
                  <header className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                        {car.name}
                      </h3>
                      <p className="text-white/60">{car.brand}</p>
                    </div>
                  </header>

                  {/* Specs */}
                  <dl className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <dt className="sr-only">Horsepower</dt>
                      <dd className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-red-400" aria-hidden="true" />
                        <span className="text-sm text-white/70">{car.horsepower} HP</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Acceleration 0-60 mph</dt>
                      <dd className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-red-400" aria-hidden="true" />
                        <span className="text-sm text-white/70">{car.acceleration} 0-60</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Top Speed</dt>
                      <dd className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-red-400" aria-hidden="true" />
                        <span className="text-sm text-white/70">{car.topSpeed}</span>
                      </dd>
                    </div>
                  </dl>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 group/btn"
                    aria-label={`View full specifications for ${car.name}`}
                  >
                    View Details
                    <ChevronRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                  </Button>
                </div>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
