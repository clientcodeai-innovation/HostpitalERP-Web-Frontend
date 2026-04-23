import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/bachpan_hospital_logo.png';

const navLinks = [
  { label: 'Home', href: '#', active: true },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src={logo} alt="Bachpan Hospital" className="h-16 w-auto" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              <a
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${link.active ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'}`}
              >
                {link.label}
              </a>
            </div>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin/login"
            className="hidden sm:flex items-center gap-2 text-primary hover:text-primary-dark font-medium px-4 py-2"
          >
            Admin Login
          </Link>
          <a
            href="#appointment"
            className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/30"
          >
            <span className="text-lg">📅</span>
            Book Appointment
          </a>
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary rounded-md">
                {link.label}
              </a>
            ))}
            <Link to="/admin/login" className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary rounded-md">
              Admin Login
            </Link>
            <a href="#appointment" className="block mt-3 text-center bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold">
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
