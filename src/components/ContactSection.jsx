import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4 block">
            Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark">
            Get In Touch With Us
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Have questions? We're here to help. Reach out to us for appointments, inquiries, or emergency support.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary-dark mb-1">Our Location</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Maulapur, Mahmudabad, <br />
                Sitapur, UP, India, 261203
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-primary-dark mb-1">Phone & Email</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                +91 97714 00390 <br />
                info@mecare.com
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-primary-dark mb-1">Working Hours</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Open 24/7 for Emergencies <br />
                OPD: 9:00 AM - 8:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-gray-200 border border-gray-100">
              <form className="grid sm:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe" 
                    className="w-full px-4 py-3 text-sm rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com" 
                    className="w-full px-4 py-3 text-sm rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 XXXXX XXXXX" 
                    className="w-full px-4 py-3 text-sm rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Service / Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-sm rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                  >
                    <option value="">Select a Service</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="OPD Appointment">OPD Appointment</option>
                    <option value="Emergency / Admission">Emergency / Admission</option>
                    <option value="Vaccination">Vaccination</option>
                    <option value="Video Consultation">Video Consultation</option>
                    <option value="Specialist Information">Specialist Information</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Your Message</label>
                  <textarea 
                    rows="4" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?" 
                    className="w-full px-4 py-3 text-sm rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  ></textarea>
                </div>
                <div className="sm:col-span-2 pt-2 flex items-center justify-between">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20 text-sm disabled:opacity-70"
                  >
                    {loading ? 'Sending...' : (
                      <>Send Message <Send className="w-4 h-4" /></>
                    )}
                  </button>
                  {success && <span className="text-green-600 font-medium text-sm ml-4">Message sent!</span>}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-[300px] relative group">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.852136014457!2d81.12450847610668!3d27.44274987633519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399927690f0556f9%3A0x6b4f7063d3324f6b!2sBachpan%20Hospital!5e0!3m2!1sen!2sin!4v1713781200000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Bachpan Hospital Location"
          ></iframe>
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <a 
              href="https://maps.app.goo.gl/G6pctkTrFtJsmU8cA?g_st=awb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white px-6 py-3 rounded-xl shadow-xl font-bold text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" /> Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
