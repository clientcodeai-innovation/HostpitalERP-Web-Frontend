import { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Calendar as CalendarIcon, User, ChevronDown,
  Stethoscope, Syringe, Baby, Heart, Activity, Video, 
  FlaskConical, Shield, Phone, Building2, Users, FileText,
  Clock, MapPin, Info, Newspaper, Award, MessageSquare, 
  HelpCircle, Package, Pill, LogIn
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../../../shared/theme/ThemeToggle';
import { Button } from '../../../shared/ui/Button';
import { Leaf } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { 
    label: 'About', 
    href: '/#about',
    children: [
      { label: 'About Hospital', href: '/about/hospital', icon: Building2, desc: 'Our mission & vision' },
      { label: 'Our Doctors', href: '/about/doctors', icon: Users, desc: 'Expert medical team' },
      { label: 'Awards & Recognition', href: '/about/awards', icon: Award, desc: 'Our achievements' },
      { label: 'Testimonials', href: '/about/testimonials', icon: MessageSquare, desc: 'Patient stories' },
      { label: 'FAQs', href: '/about/faqs', icon: HelpCircle, desc: 'Common questions' },
    ]
  },
  { 
    label: 'Services', 
    href: '/#services',
    children: [
      { label: 'OPD Consultation', href: '/services/opd-consultation', icon: Stethoscope, desc: 'Regular checkups' },
      { label: 'Emergency Care', href: '/services/emergency-care', icon: Activity, desc: '24/7 critical care' },
      { label: 'Vaccination', href: '/services/vaccination', icon: Syringe, desc: 'Immunization tracking' },
      { label: 'Video Consultation', href: '/services/video-consultation', icon: Video, desc: 'Online doctor visit' },
      { label: 'Neonatal Care (NICU)', href: '/services/nicu-care', icon: Baby, desc: 'Newborn intensive care' },
      { label: 'Lab & Diagnostics', href: '/services/lab-diagnostics', icon: FlaskConical, desc: 'Testing & reports' },
      { label: 'Health Packages', href: '/services/packages', icon: Package, desc: 'Checkup & immunity plans' },
    ]
  },
  { 
    label: 'Departments', 
    href: '/#departments',
    children: [
      { label: 'Pediatrics', href: '/departments/pediatrics', icon: Baby, desc: 'Child healthcare' },
      { label: 'Constitutional Care', href: '/departments/constitutional-care', icon: Heart, desc: 'Deep-acting ayurveda' },
      { label: 'Allergies & Asthma', href: '/departments/allergies-asthma', icon: Shield, desc: 'Immunity building' },
      { label: 'Acute Fevers', href: '/departments/acute-fevers', icon: Stethoscope, desc: 'Gentle fever management' },
    ]
  },
  {
    label: 'Resources',
    href: '#',
    children: [
      { label: 'Health Blog', href: '/resources/blog', icon: Newspaper, desc: 'Health tips & articles' },
      { label: 'Order Medicines', href: '/resources/pharmacy', icon: Pill, desc: 'Refill your prescriptions' },
    ]
  },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Contact', href: '/#contact' },
];

const DropdownMenu = ({ items, isOpen, onClose, currentPath }) => {
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
          <Link
            key={i}
            to={item.href}
            onClick={onClose}
            className={`flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
              currentPath === item.href 
                ? 'bg-primary/10 text-primary' 
                : 'text-popover-foreground hover:bg-muted'
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
              currentPath === item.href ? 'bg-primary/20' : 'bg-primary/10 group-hover:bg-primary/20'
            }`}>
              <item.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const currentPath = location.pathname;

  const isLinkActive = (link) => {
    if (link.children) {
      return link.children.some(child => currentPath === child.href);
    }
    return currentPath === link.href;
  };

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
              <span className="text-xs font-semibold text-primary tracking-wider uppercase">Ayurved Clinic</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                {link.children ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        openDropdown === link.label || isLinkActive(link)
                          ? 'text-primary bg-primary/10' 
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
                      currentPath={currentPath}
                    />
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isLinkActive(link)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link to="/admin/login" className="hidden lg:inline-block">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <LogIn className="w-3.5 h-3.5" />
                Admin
              </Button>
            </Link>
            
            <a href="#appointment" className="hidden sm:inline-block">
              <Button size="sm" className="gap-1.5 rounded-full">
                <CalendarIcon className="w-3.5 h-3.5" />
                Book Appointment
              </Button>
            </a>

            <ThemeToggle />

            <Button 
              variant="ghost" 
              size="icon" 
              className="xl:hidden" 
              onClick={() => { setMobileOpen(!mobileOpen); setMobileExpanded(null); }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-xl max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                        mobileExpanded === link.label || isLinkActive(link)
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${mobileExpanded === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileExpanded === link.label && (
                      <div className="ml-4 pl-4 border-l border-border space-y-1 py-1">
                        {link.children.map((child, i) => (
                          <Link
                            key={i}
                            to={child.href}
                            className={`flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors ${
                              currentPath === child.href ? 'text-primary bg-primary/5 font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            <child.icon className="w-4 h-4 text-primary shrink-0" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link 
                    to={link.href} 
                    className={`block px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      isLinkActive(link) ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
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
