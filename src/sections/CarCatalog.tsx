import { useEffect, useRef, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChevronRight, Gauge, Zap, Timer, Search, Filter, X, Settings2, Fuel, Cog } from 'lucide-react';
import { cars, brands, categories } from '@/data/cars';
import type { Car, CarCategory } from '@/types/car';

interface CarCatalogProps {
  selectedCar: Car | null;
  onCarClick: (car: Car) => void;
  onCloseDialog: () => void;
}

export function CarCatalog({ selectedCar, onCarClick, onCloseDialog }: CarCatalogProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>('all');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
      const matchesBrand = selectedBrand === 'All' || car.brand === selectedBrand;
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedBrand, priceRange]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('All');
    setPriceRange([0, 5000000]);
  };

  return (
    <section 
      id="catalog" 
      ref={sectionRef} 
      className="py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-background"
      aria-labelledby="catalog-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge variant="outline" className="mb-4 border-red-500/50 text-red-400">
            Full Inventory
          </Badge>
          <h2 id="catalog-heading" className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our <span className="text-gradient">Collection</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Browse our complete inventory of exotic and luxury vehicles. Filter by brand, category, or price to find your perfect match.
          </p>
        </header>

        {/* Search and Filters */}
        <div className={`mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" aria-hidden="true" />
              <Input
                placeholder="Search by car name or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 bg-card border-border text-white placeholder:text-white/40 rounded-full"
                aria-label="Search cars by name or brand"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`border-white/20 text-white hover:bg-white/10 rounded-full px-6 ${showFilters ? 'bg-white/10' : ''}`}
              aria-expanded={showFilters}
              aria-controls="filter-panel"
            >
              <Filter className="w-4 h-4 mr-2" aria-hidden="true" />
              Filters
              {(selectedCategory !== 'all' || selectedBrand !== 'All' || priceRange[0] > 0 || priceRange[1] < 5000000) && (
                <Badge className="ml-2 bg-red-600 text-white text-xs">Active</Badge>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card 
              id="filter-panel"
              className="p-6 bg-card border-border animate-scale-in"
            >
              <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <legend className="sr-only">Filter options</legend>
                
                {/* Category Filter */}
                <div>
                  <label htmlFor="category-select" className="text-sm text-white/60 mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as CarCategory)}>
                    <SelectTrigger id="category-select" className="bg-background border-border text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value} className="text-white">
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label htmlFor="brand-select" className="text-sm text-white/60 mb-2 block">Brand</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger id="brand-select" className="bg-background border-border text-white">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand} className="text-white">
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <label htmlFor="price-slider" className="text-sm text-white/60 mb-2 block">
                    Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <Slider
                    id="price-slider"
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000000}
                    step={50000}
                    className="py-4"
                    aria-label="Filter by price range"
                  />
                </div>
              </fieldset>

              {/* Clear Filters */}
              <div className="mt-4 pt-4 border-t border-border flex justify-end">
                <Button
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4 mr-2" aria-hidden="true" />
                  Clear All Filters
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Results Count */}
        <div className={`mb-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-white/60" role="status" aria-live="polite">
            Showing <span className="text-white font-semibold">{filteredCars.length}</span> vehicles
          </p>
        </div>

        {/* Cars Grid */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="list"
          aria-label="Car inventory"
        >
          {filteredCars.map((car, index) => (
            <article key={car.id} role="listitem">
              <Card
                onClick={() => onCarClick(car)}
                className={`group relative overflow-hidden bg-card border-border cursor-pointer hover-lift transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + index * 50}ms` }}
                tabIndex={0}
                role="button"
                aria-label={`${car.name} by ${car.brand}, ${formatPrice(car.price)}. Press Enter to view details.`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCarClick(car);
                  }
                }}
              >
                {/* Image */}
                <figure className="relative h-48 overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.name} - ${car.brand} ${car.category}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-600/90 text-white text-xs border-0">
                      {car.category.charAt(0).toUpperCase() + car.category.slice(1)}
                    </Badge>
                  </div>

                  {/* Price */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-amber-500 text-black font-bold border-0">
                      {formatPrice(car.price)}
                    </Badge>
                  </div>
                </figure>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors truncate">
                    {car.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">{car.brand}</p>

                  {/* Quick Specs */}
                  <dl className="flex items-center gap-3 text-xs text-white/50">
                    <div>
                      <dt className="sr-only">Horsepower</dt>
                      <dd className="flex items-center gap-1">
                        <Zap className="w-3 h-3" aria-hidden="true" />
                        {car.horsepower} HP
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Acceleration 0-60 mph</dt>
                      <dd className="flex items-center gap-1">
                        <Timer className="w-3 h-3" aria-hidden="true" />
                        {car.acceleration}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Card>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredCars.length === 0 && (
          <div className="text-center py-16" role="status">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
              <Search className="w-8 h-8 text-white/40" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No cars found</h3>
            <p className="text-white/60">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Car Details Dialog */}
      <Dialog open={!!selectedCar} onOpenChange={onCloseDialog}>
        <DialogContent 
          className="max-w-4xl bg-card border-border text-white max-h-[90vh] overflow-y-auto"
          aria-labelledby="car-details-title"
          aria-describedby="car-details-description"
        >
          {selectedCar && (
            <article>
              {/* Hero Image */}
              <figure className="relative h-64 sm:h-80 -mx-6 -mt-6 mb-6 overflow-hidden">
                <img
                  src={selectedCar.image}
                  alt={`${selectedCar.name} - ${selectedCar.brand} ${selectedCar.category}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <figcaption className="absolute bottom-4 left-6 right-6">
                  <Badge className="bg-red-600 text-white mb-2">
                    {selectedCar.category.charAt(0).toUpperCase() + selectedCar.category.slice(1)}
                  </Badge>
                  <h2 id="car-details-title" className="text-3xl sm:text-4xl font-bold text-white">{selectedCar.name}</h2>
                  <p className="text-xl text-white/70">{selectedCar.brand}</p>
                </figcaption>
              </figure>

              {/* Price */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-white/60">Starting at</p>
                  <p className="text-3xl font-bold text-amber-400">{formatPrice(selectedCar.price)}</p>
                </div>
               <Button
  asChild
  className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8"
>
  <a
    href="https://t.me/strikerslfykykusaspencerstit"
    target="_blank"
    rel="noopener noreferrer"
  >
    Inquire Now
    <ChevronRight className="w-4 h-4 ml-2" aria-hidden="true" />
  </a>
</Button>
              </div>

              {/* Description */}
              <p id="car-details-description" className="text-white/70 mb-6">{selectedCar.description}</p>

              {/* Specifications Grid */}
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-white/5">
                  <dt>
                    <Cog className="w-5 h-5 text-red-400 mb-2" aria-hidden="true" />
                    <span className="text-xs text-white/50">Engine</span>
                  </dt>
                  <dd className="text-sm font-semibold text-white">{selectedCar.engine}</dd>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <dt>
                    <Zap className="w-5 h-5 text-red-400 mb-2" aria-hidden="true" />
                    <span className="text-xs text-white/50">Horsepower</span>
                  </dt>
                  <dd className="text-sm font-semibold text-white">{selectedCar.horsepower} HP</dd>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <dt>
                    <Gauge className="w-5 h-5 text-red-400 mb-2" aria-hidden="true" />
                    <span className="text-xs text-white/50">Top Speed</span>
                  </dt>
                  <dd className="text-sm font-semibold text-white">{selectedCar.topSpeed}</dd>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <dt>
                    <Timer className="w-5 h-5 text-red-400 mb-2" aria-hidden="true" />
                    <span className="text-xs text-white/50">0-60 mph</span>
                  </dt>
                  <dd className="text-sm font-semibold text-white">{selectedCar.acceleration}</dd>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <dt>
                    <Settings2 className="w-5 h-5 text-red-400 mb-2" aria-hidden="true" />
                    <span className="text-xs text-white/50">Transmission</span>
                  </dt>
                  <dd className="text-sm font-semibold text-white">{selectedCar.transmission}</dd>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <dt>
                    <Fuel className="w-5 h-5 text-red-400 mb-2" aria-hidden="true" />
                    <span className="text-xs text-white/50">Drivetrain</span>
                  </dt>
                  <dd className="text-sm font-semibold text-white">{selectedCar.drivetrain}</dd>
                </div>
              </dl>

              {/* Features */}
              <section>
                <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                <ul className="flex flex-wrap gap-2">
                  {selectedCar.features.map((feature, idx) => (
                    <li key={idx}>
                      <Badge variant="secondary" className="bg-white/10 text-white border-0">
                        {feature}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </section>
            </article>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
