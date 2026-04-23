import { useState } from 'react';
import { CheckCircle2, Phone, Shield, ChevronRight, ChevronLeft } from 'lucide-react';

const whyChooseUs = [
  'Pediatric specialists with years of experience',
  'Child-friendly environment & play areas',
  'Advanced medical technology',
  'Personalized care for every child',
  'Trusted by thousands of families',
];

const consultants = [
  'Pediatrician & Neonatologist (Dr. Vijay)',
  'Gynaecologist & Obstetrics (Dr. Sweta)',
  'Infertility Specialist (Dr. Vijay & Dr. Sweta)'
];
const genders = ['Male', 'Female', 'Other'];
const religions = ['Hinduism', 'Islam', 'Christianity', 'Sikhism', 'Buddhism', 'Other'];
const states = ['Uttar Pradesh', 'Delhi', 'Bihar', 'Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Other'];

const inputClass = 'w-full px-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white';
const selectClass = "w-full px-4 py-2.5 border border-gray-200 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_0.75rem_center]";

export default function BottomSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '', patientName: '', guardianName: '',
    ageYears: '', ageMonths: '', ageDays: '',
    gender: '', religion: '', phone: '',
    address: '', city: '', state: '', consultant: '',
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setPopup({ show: true, type: 'success', message: 'Your appointment has been booked successfully! We will contact you soon.' });
        setFormData({
          date: '', patientName: '', guardianName: '',
          ageYears: '', ageMonths: '', ageDays: '',
          gender: '', religion: '', phone: '',
          address: '', city: '', state: '', consultant: '',
        });
        setStep(1);
      } else {
        setPopup({ show: true, type: 'error', message: 'Please fill all required fields and try again.' });
      }
    } catch (error) {
      setPopup({ show: true, type: 'error', message: 'Network error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="appointment" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Why Choose Us */}
          <div className="bg-gray-50 rounded-2xl p-7 relative overflow-hidden">
            <h2 className="text-xl font-bold text-dark mb-6">Why Choose Mecare Hospital?</h2>
            <ul className="space-y-4">
              {whyChooseUs.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
            {/* Decorative */}
            <div className="absolute bottom-4 right-4 opacity-10">
              <Shield className="w-28 h-28 text-primary" />
            </div>
          </div>

          {/* Appointment Form - Multi-Step */}
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-primary-dark text-center mb-6">Book Appointment</h2>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-primary text-white' : 'bg-primary-50 text-primary'}`}>1</div>
              <div className="w-10 h-0.5 bg-gray-200" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-primary text-white' : 'bg-primary-50 text-primary'}`}>2</div>
            </div>

            <form className="space-y-3.5" onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  {/* Date */}
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} placeholder="Select Date" />

                  {/* Patient Name */}
                  <input type="text" name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} className={inputClass} />

                  {/* Guardian / Father Name */}
                  <input type="text" name="guardianName" placeholder="Guardian / Father Name" value={formData.guardianName} onChange={handleChange} className={inputClass} />

                  {/* Age: Years, Months, Days */}
                  <div className="grid grid-cols-3 gap-3">
                    <input type="number" name="ageYears" placeholder="Years" min="0" max="18" value={formData.ageYears} onChange={handleChange} className={inputClass} />
                    <input type="number" name="ageMonths" placeholder="Months" min="0" max="11" value={formData.ageMonths} onChange={handleChange} className={inputClass} />
                    <input type="number" name="ageDays" placeholder="Days" min="0" max="31" value={formData.ageDays} onChange={handleChange} className={inputClass} />
                  </div>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/2 mx-auto mt-2 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/30"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  {/* Gender & Religion */}
                  <div className="grid grid-cols-2 gap-3">
                    <select name="gender" value={formData.gender} onChange={handleChange} className={selectClass}>
                      <option value="">Gender</option>
                      {genders.map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <select name="religion" value={formData.religion} onChange={handleChange} className={selectClass}>
                      <option value="">Religion</option>
                      {religions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  {/* Phone */}
                  <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className={inputClass} />

                  {/* Address */}
                  <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className={`${inputClass} bg-primary-50/40`} />

                  {/* City & State */}
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className={inputClass} />
                    <select name="state" value={formData.state} onChange={handleChange} className={`${selectClass} bg-primary-50/40`}>
                      <option value="">State</option>
                      {states.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Choose Consultant */}
                  <select name="consultant" value={formData.consultant} onChange={handleChange} className={selectClass}>
                    <option value="">Choose Consultant</option>
                    {consultants.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>

                  {/* Back & Confirm Buttons */}
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-all hover:shadow-lg hover:shadow-primary/30 disabled:opacity-70"
                    >
                      {loading ? 'Confirming...' : (
                        <>Confirm <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Emergency Card */}
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-7 relative overflow-hidden">
            <h2 className="text-xl font-bold text-dark mb-2">We're Here for Your Child</h2>
            <p className="text-4xl font-extrabold text-primary mb-4">24/7</p>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Your child's health is our priority. Contact us anytime for immediate support.
            </p>
            <a
              href="tel:+919771400390"
              className="inline-flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-md hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-dark">+91 97714 00390</p>
                <p className="text-xs text-gray-400">24/7 Pediatric Emergency Care</p>
              </div>
            </a>
            {/* Decorative teddy/image placeholder */}
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
              <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary">
                <circle cx="50" cy="35" r="25" />
                <circle cx="30" cy="15" r="12" />
                <circle cx="70" cy="15" r="12" />
                <ellipse cx="50" cy="75" rx="30" ry="25" />
                <circle cx="25" cy="70" r="12" />
                <circle cx="75" cy="70" r="12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all">
            <div className="text-center">
              {popup.type === 'success' ? (
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5 text-red-500 font-bold text-4xl">
                  !
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {popup.type === 'success' ? 'Success!' : 'Oops!'}
              </h3>
              <p className="text-gray-500 mb-6 leading-relaxed">
                {popup.message}
              </p>
              <button
                onClick={() => setPopup({ show: false, type: '', message: '' })}
                className={`w-full py-3.5 rounded-xl text-white font-bold transition-all shadow-md ${
                  popup.type === 'success' ? 'bg-green-500 hover:bg-green-600 hover:shadow-green-500/30' : 'bg-red-500 hover:bg-red-600 hover:shadow-red-500/30'
                }`}
              >
                {popup.type === 'success' ? 'Great' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
