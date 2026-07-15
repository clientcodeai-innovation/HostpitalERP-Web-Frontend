import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Calendar as CalendarIcon, User, ChevronDown,
  Stethoscope, Syringe, Baby, Heart, Activity, Video, 
  FlaskConical, Shield, Phone, Building2, Users, FileText,
  Clock, MapPin, Info, Newspaper, Award, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '../../../shared/theme/ThemeToggle';
import { Button } from '../../../shared/ui/Button';
import { Leaf } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#' },
  { 
    label: 'About', 
    href: '#about',
    children: [
      { label: 'About Hospital', href: '#about', icon: Building2, desc: 'Our mission & vision' },
      { label: 'Our Doctors', href: '#doctors', icon: Users, desc: 'Expert medical team' },
      { label: 'Awards & Recognition', href: '#awards', icon: Award, desc: 'Our achievements' },
      { label: 'Testimonials', href: '#testimonials', icon: MessageSquare, desc: 'Patient stories' },
    ]
  },
  { 
    label: 'Services', 
    href: '#services',
    children: [
      { label: 'OPD Consultation', href: '#services', icon: Stethoscope, desc: 'Regular checkups' },
      { label: 'Emergency Care', href: '#services', icon: Activity, desc: '24/7 critical care' },
      { label: 'Vaccination', href: '#services', icon: Syringe, desc: 'Immunization tracking' },
      { label: 'Video Consultation', href: '#services', icon: Video, desc: 'Online doctor visit' },
      { label: 'Neonatal Care (NICU)', href: '#services', icon: Baby, desc: 'Newborn intensive care' },
      { label: 'Lab & Diagnostics', href: '#services', icon: FlaskConical, desc: 'Testing & reports' },
    ]
  },
  { 
    label: 'Departments', 
    href: '#services',
    children: [
      { label: 'Pediatrics', href: '#services', icon: Baby, desc: 'Child healthcare' },
      { label: 'Constitutional Care', href: '#services', icon: Heart, desc: 'Deep-acting homeopathy' },
      { label: 'Allergies & Asthma', href: '#services', icon: Shield, desc: 'Immunity building' },
      { label: 'Acute Fevers', href: '#services', icon: Stethoscope, desc: 'Gentle fever management' },
    ]
  },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

function DropdownMenu({ items, isOpen, onClose }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || !items) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
    >
      <div className="bg-popover border border-border rounded-xl shadow-xl shadow-black/10 p-2 min-w-[280px] backdrop-blur-xl">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            onClick={onClose}
            className="flex items-start gap-3 px-3 py-2.5 rounded-lg text-popover-foreground hover:bg-muted transition-colors group"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
              <item.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 border-b ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-xl border-border shadow-sm' 
        : 'bg-background border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0 group">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-none text-foreground">Hari Om</span>
              <span className="text-xs font-semibold text-primary tracking-wider uppercase">Homeo Clinic</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        openDropdown === link.label 
                          ? 'text-foreground bg-muted' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    <DropdownMenu 
                      items={link.children} 
                      isOpen={openDropdown === link.label}
                      onClose={() => setOpenDropdown(null)}
                    />
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />


            <Link to="/admin/login" className="hidden sm:inline-block">
              <Button variant="outline" size="sm" className="gap-1.5">
                <User className="w-3.5 h-3.5" />
                Portal
              </Button>
            </Link>
            
            <a href="#appointment" className="hidden sm:inline-block">
              <Button size="sm" className="gap-1.5 rounded-full">
                <CalendarIcon className="w-3.5 h-3.5" />
                Book Appointment
              </Button>
            </a>

            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden" 
              onClick={() => { setMobileOpen(!mobileOpen); setMobileExpanded(null); }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${mobileExpanded === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileExpanded === link.label && (
                      <div className="ml-4 pl-4 border-l border-border space-y-1 py-1">
                        {link.children.map((child, i) => (
                          <a
                            key={i}
                            href={child.href}
                            className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            <child.icon className="w-4 h-4 text-primary shrink-0" />
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a 
                    href={link.href} 
                    className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
            
            <div className="h-px bg-border my-2" />
            <Link 
              to="/admin/login" 
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-md transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <User className="w-4 h-4" /> Admin Portal
            </Link>
            <a href="#appointment" className="mt-1" onClick={() => setMobileOpen(false)}>
              <Button className="w-full gap-2">
                <CalendarIcon className="w-4 h-4" /> Book Appointment
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
