import { Mail, Phone, Clock, MapPin } from 'lucide-react';

const socials = [
  {
    label: 'Facebook',
    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    label: 'Twitter',
    path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
  },
  {
    label: 'LinkedIn',
    path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z',
    extra: 'M4 2a2 2 0 100 4 2 2 0 000-4z',
  },
  {
    label: 'Instagram',
    rects: true,
  },
];

function SocialIcon({ social }) {
  if (social.rects) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={social.path} />
      {social.extra && <path d={social.extra} />}
    </svg>
  );
}

export default function TopHeader() {
  return (
    <div className="bg-dark text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left Info */}
        <div className="flex items-center gap-4 lg:gap-6 flex-wrap">
          <a href="mailto:info@mecare.com" className="flex items-center gap-2 hover:text-primary-100 transition-colors">
            <Mail className="w-4 h-4 shrink-0" />
            <span>info@mecare.com</span>
          </a>
          <a href="tel:+919771400390" className="flex items-center gap-2 hover:text-primary-100 transition-colors">
            <Phone className="w-4 h-4 shrink-0" />
            <span>+91 97714 00390</span>
          </a>
          <a href="https://maps.app.goo.gl/G6pctkTrFtJsmU8cA?g_st=awb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-100 transition-colors max-w-sm lg:max-w-md">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="truncate" title="Maulapur, mahmudabad, mahmudabad, Sitapur, UP, India, 261203">Maulapur, Mahmudabad, Sitapur, UP</span>
          </a>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-light shrink-0" />
            <span>24/7 Emergency Care</span>
          </div>
        </div>
        {/* Right Social */}
        <div className="flex items-center gap-4">
          <span className="text-gray-300 hidden sm:inline">Follow Us:</span>
          {socials.map((social, i) => (
            <a key={i} href="#" aria-label={social.label} className="hover:text-primary-100 transition-colors">
              <SocialIcon social={social} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
