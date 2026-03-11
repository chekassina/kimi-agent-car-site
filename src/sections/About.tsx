import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Award, Users, Globe, Shield, CheckCircle2, Star } from 'lucide-react';

const stats = [
  { icon: Award, value: '15+', label: 'Years Experience', description: 'In exotic car sales' },
  { icon: Users, value: '2,500+', label: 'Happy Clients', description: 'Worldwide collectors' },
  { icon: Globe, value: '40+', label: 'Countries', description: 'Global delivery' },
  { icon: Shield, value: '100%', label: 'Authentic', description: 'Verified vehicles' },
];

const features = [
  'Exclusive access to limited edition vehicles',
  'White-glove concierge service',
  'Worldwide shipping and delivery',
  'Comprehensive vehicle inspection',
  'Financing and leasing options',
  'Trade-in assistance',
];

export function About() {
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

  return (
    <section 
      id="about"
      ref={sectionRef} 
      className="py-24 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-b from-background to-black"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge variant="outline" className="mb-4 border-red-500/50 text-red-400">
            About Us
          </Badge>
          <h2 id="about-heading" className="text-4xl sm:text-5xl font-bold text-white mb-4">
            The <span className="text-gradient">No Title Strikers</span> Difference
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            We are more than just a dealership. We are curators of automotive excellence, connecting discerning collectors with the world's most extraordinary vehicles.
          </p>
        </header>

        {/* Stats Grid */}
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`p-6 bg-card border-border text-center hover-lift transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <dt className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-600/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-red-400" aria-hidden="true" />
              </dt>
              <dd className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</dd>
              <dd className="text-sm font-medium text-white/80">{stat.label}</dd>
              <dd className="text-xs text-white/50 mt-1">{stat.description}</dd>
            </Card>
          ))}
        </dl>

        {/* Features Section */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Left - Image */}
          <figure className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/car-bugatti-chiron.jpg"
                alt="Bugatti Chiron Super Sport in our luxury showroom"
                className="w-full h-80 sm:h-96 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Floating Badge */}
            <figcaption className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-2xl shadow-xl">
              <div className="text-3xl font-bold">#1</div>
              <div className="text-sm">Exotic Dealer</div>
            </figcaption>
          </figure>

          {/* Right - Content */}
          <article>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why Collectors Choose Us
            </h3>
            <p className="text-white/60 mb-6">
              At No Title Strikers Cars, we understand that acquiring an exotic vehicle is more than a purchase—it's an investment in passion, performance, and prestige. Our team of experts ensures every transaction exceeds expectations.
            </p>

            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${600 + index * 50}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-red-400 flex-shrink-0" aria-hidden="true" />
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Trust Badges */}
            <footer className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" aria-hidden="true" />
                <span className="text-white font-semibold">4.9</span>
                <span className="text-white/50 text-sm">Rating</span>
              </div>
              <div className="w-px h-6 bg-border" aria-hidden="true" />
              <div className="text-white/50 text-sm">
                Trusted by <span className="text-white">2,500+</span> collectors
              </div>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
