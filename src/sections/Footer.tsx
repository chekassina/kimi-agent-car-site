import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  ArrowRight,
  Car,
  Send
} from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'Inventory', href: '#catalog' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#' },
  { label: 'Contact', href: '#contact' },
];

const brands = [
  'Ferrari', 'Lamborghini', 'Porsche', 'McLaren', 
  'Rolls-Royce', 'Bentley', 'Aston Martin', 'Bugatti'
];

const services = [
  'Car Sales',
  'Trade-Ins',
  'Financing',
  'Worldwide Shipping',
  'Concierge Service',
  'Vehicle Sourcing',
];

export function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-border">

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-900/50 to-amber-900/50 p-8 sm:p-12 lg:p-16">

            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                  Ready to Find Your Dream Car?
                </h2>
                <p className="text-white/70 max-w-lg">
                  Subscribe to our newsletter for exclusive inventory updates and early access to rare vehicles.
                </p>
              </div>

              <form className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full px-6 py-6 min-w-[280px]"
                  required
                />
                <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 font-semibold group">
                  Subscribe
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">No Title Strikers</h3>
                  <p className="text-xs text-white/50">Premium Exotic Cars</p>
                </div>
              </div>

              <p className="text-white/60 text-sm mb-6">
                Curating the world's finest automobiles for the most discerning collectors since 2009.
              </p>

              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="text-white/60 hover:text-red-400 text-sm transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div>
              <h4 className="text-white font-semibold mb-6">Our Brands</h4>

              <div className="flex flex-wrap gap-2">
                {brands.map((brand, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-white/5 text-white/70 hover:bg-red-600/20 hover:text-red-400 cursor-pointer transition-colors"
                  >
                    {brand}
                  </Badge>
                ))}
              </div>

              <h4 className="text-white font-semibold mt-8 mb-4">Services</h4>
              <ul className="space-y-2">
                {services.slice(0,4).map((service, idx) => (
                  <li key={idx} className="text-white/60 text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-6">Contact Us</h4>

              <ul className="space-y-4">

                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-400 mt-1" />
                  <span className="text-white/60 text-sm">
                    1234 Supercar Boulevard<br/>
                    Beverly Hills
                  </span>
                </li>

                {/* TELEGRAM CONTACT */}
                <li className="flex items-center gap-3">
                  <Send className="w-5 h-5 text-red-400" />
                  <a
                    href="https://t.me/strikerslfykykusaspencerstit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    Message us on Telegram
                  </a>
                </li>

                {/* EMAIL */}
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-red-400" />
                  <a
                    href="mailto:notitlestriker@gmail.com"
                    className="text-white/60 text-sm hover:text-white transition-colors"
                  >
                    notitlestriker@gmail.com
                  </a>
                </li>

              </ul>

              <div className="mt-6 p-4 rounded-lg bg-white/5">
                <p className="text-xs text-white/50 mb-2">Business Hours</p>
                <p className="text-sm text-white">Mon - Sat: 9AM - 7PM</p>
                <p className="text-sm text-white/60">Sunday: By Appointment</p>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="py-6 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 No Title Strikers Cars. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white text-sm">
              Terms of Service
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}