import { Heart, MapPin, Phone, Mail, Clock, Leaf, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand & About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-foreground block leading-none">Bachpan</span>
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Hospital</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience the power of natural healing. We provide gentle, safe, and effective ayurvedic care for your entire family with a special focus on pediatric health.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/#about' },
                { label: 'Our Doctors', path: '/about/doctors' },
                { label: 'Testimonials', path: '/about/testimonials' },
                { label: 'Awards', path: '/about/awards' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                    <ChevronRight className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-foreground text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                { label: 'OPD Consultation', path: '/services/opd-consultation' },
                { label: 'Emergency Care', path: '/services/emergency-care' },
                { label: 'Vaccination', path: '/services/vaccination' },
                { label: 'Video Consultation', path: '/services/video-consultation' },
                { label: 'Pediatrics', path: '/departments/pediatrics' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group text-sm">
                    <ChevronRight className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-foreground text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground text-sm">123 Healing Avenue, Medical District, City - 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground text-sm">+91 99999-99999</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground text-sm">contact@bachpanhospital.com</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div className="text-muted-foreground text-sm">
                  <p>Mon - Sat: 9:00 AM - 9:00 PM</p>
                  <p>Sunday: 10:00 AM - 2:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Bachpan Hospital. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 mx-1" /> by <span className="font-semibold text-foreground ml-1">ClientCode AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
