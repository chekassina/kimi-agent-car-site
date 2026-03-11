import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Play } from 'lucide-react';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      aria-label="Hero Section - Premium Exotic Car Dealership"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-car.jpg"
          alt="Ferrari SF90 XX Stradale - Premium exotic sports car in dramatic studio lighting"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/50" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-20"
      >
        <div className="max-w-7xl mx-auto">
          <article className="max-w-2xl">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6 opacity-0 animate-slide-up" 
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
              <span className="text-sm font-medium text-white/80">Premium Exotic Car Dealership</span>
            </div>

            {/* Title */}
            <h1 
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none mb-6 opacity-0 animate-slide-up" 
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              No Title
              <br />
              <span className="text-gradient">Strikers Cars</span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg sm:text-xl text-white/70 mb-8 max-w-lg opacity-0 animate-slide-up" 
              style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
            >
              Experience the pinnacle of automotive excellence. Discover our curated collection of the world's most prestigious supercars, hypercars, and luxury vehicles.
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-wrap gap-4 opacity-0 animate-slide-up" 
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            >
              <Button
                size="lg"
                onClick={scrollToCatalog}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold rounded-full group transition-all duration-300 hover:shadow-lg hover:shadow-red-600/30"
                aria-label="Browse our exotic car collection"
              >
                Explore Collection
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full group transition-all duration-300"
                aria-label="Watch our promotional video"
              >
                <Play className="mr-2 w-5 h-5" aria-hidden="true" />
                Watch Video
              </Button>
            </div>

            {/* Stats */}
            <dl 
              className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/10 opacity-0 animate-slide-up" 
              style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
            >
              <div>
                <dt className="sr-only">Number of exotic cars in inventory</dt>
                <dd className="text-3xl sm:text-4xl font-bold text-white">50+</dd>
                <dd className="text-sm text-white/60 mt-1">Exotic Cars</dd>
              </div>
              <div>
                <dt className="sr-only">Total inventory value</dt>
                <dd className="text-3xl sm:text-4xl font-bold text-white">$2B+</dd>
                <dd className="text-sm text-white/60 mt-1">Total Value</dd>
              </div>
              <div>
                <dt className="sr-only">Number of luxury brands</dt>
                <dd className="text-3xl sm:text-4xl font-bold text-white">15+</dd>
                <dd className="text-sm text-white/60 mt-1">Luxury Brands</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-slide-up" 
        style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
