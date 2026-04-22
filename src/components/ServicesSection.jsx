import { Calendar, Siren, Syringe, Video, Info, MapPin, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Calendar,
    title: 'Book OPD Appointment',
    desc: 'Schedule a visit with our expert doctors for regular checkups.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Siren,
    title: 'Emergency / Admission',
    desc: '24/7 priority care for critical situations and immediate admissions.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Syringe,
    title: 'Vaccination Schedule',
    desc: "Stay updated with your child's complete immunization tracking.",
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Video,
    title: 'Video Consultation',
    desc: 'Connect with our specialists online from the comfort of home.',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: Info,
    title: 'Specialist Information',
    desc: 'Learn about our highly qualified doctors and their expertise.',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: MapPin,
    title: 'Contact & Location',
    desc: 'Find directions to our hospital and get in touch with us easily.',
    color: 'bg-green-50 text-green-600',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-dark mb-2">{service.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{service.desc}</p>
              <a href="#" className="inline-flex items-center gap-1 text-primary text-xs font-semibold hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
