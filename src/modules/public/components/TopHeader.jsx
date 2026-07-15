import { Mail, Phone, Clock, MapPin } from 'lucide-react';

export default function TopHeader() {
  return (
    <div className="bg-primary text-primary-foreground text-xs sm:text-sm font-medium">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-4">
        {/* Left Info */}
        <div className="flex items-center gap-4 lg:gap-6 flex-wrap opacity-90">
          <a href="mailto:info@bachpanhospital.com" className="flex items-center gap-1.5 hover:opacity-75 transition-opacity">
            <Mail className="w-3.5 h-3.5" />
            <span>info@bachpanhospital.com</span>
          </a>
          <a href="tel:+919771400390" className="flex items-center gap-1.5 hover:opacity-75 transition-opacity">
            <Phone className="w-3.5 h-3.5" />
            <span>+91 97714 00390</span>
          </a>
          <a href="https://maps.app.goo.gl/G6pctkTrFtJsmU8cA?g_st=awb" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-1.5 hover:opacity-75 transition-opacity">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">Maulapur, Mahmudabad, Sitapur, UP</span>
          </a>
        </div>
        {/* Right Info */}
        <div className="flex items-center gap-2 opacity-90">
          <Clock className="w-3.5 h-3.5" />
          <span>24/7 Emergency Care</span>
        </div>
      </div>
    </div>
  );
}
