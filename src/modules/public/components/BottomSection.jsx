import { useState } from 'react';
import { CheckCircle2, Phone, Shield, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';

const whyChooseUs = [
  'Expert Ayurvedic Pediatricians',
  'Gentle, constitutional remedies with no side-effects',
  'Holistic approach to child immunity',
  'Personalized constitutional care for every child',
  'Trusted by thousands of families for natural healing',
];

const consultants = [
  'Ayurvedic Pediatrician (Dr. Vijay)',
  'Ayurvedic Physician (Dr. Sweta)',
  'Senior Ayurvedic Doctor (Dr. Vijay & Dr. Sweta)'
];
const genders = ['Male', 'Female', 'Other'];
const religions = ['Hinduism', 'Islam', 'Christianity', 'Sikhism', 'Buddhism', 'Other'];
const states = ['Uttar Pradesh', 'Delhi', 'Bihar', 'Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Other'];

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
    // Simulate API call for the frontend redesign
    setTimeout(() => {
      setPopup({ show: true, type: 'success', message: 'Your appointment has been booked successfully! We will contact you soon.' });
      setFormData({
        date: '', patientName: '', guardianName: '',
        ageYears: '', ageMonths: '', ageDays: '',
        gender: '', religion: '', phone: '',
        address: '', city: '', state: '', consultant: '',
      });
      setStep(1);
      setLoading(false);
    }, 1000);
  };

  const selectClass = "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <section id="appointment" className="py-24 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Why Choose Us */}
          <Card className="bg-muted/30 relative overflow-hidden border-border/50">
            <CardHeader>
              <CardTitle>Why Choose Hospital Ayurved Clinic?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 relative z-10">
                {whyChooseUs.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              {/* Decorative */}
              <div className="absolute bottom-4 right-4 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                <Shield className="w-32 h-32 text-foreground" />
              </div>
            </CardContent>
          </Card>

          {/* Appointment Form - Multi-Step */}
          <Card className="shadow-lg shadow-primary/5">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Book Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Step Indicator */}
              <div className="flex items-center justify-center gap-2 mb-8">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>1</div>
                <div className="w-12 h-0.5 bg-border" />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>2</div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <Input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Select Date" className="text-foreground" />
                    <Input type="text" name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} />
                    <Input type="text" name="guardianName" placeholder="Guardian / Father Name" value={formData.guardianName} onChange={handleChange} />

                    <div className="grid grid-cols-3 gap-4">
                      <Input type="number" name="ageYears" placeholder="Years" min="0" max="18" value={formData.ageYears} onChange={handleChange} />
                      <Input type="number" name="ageMonths" placeholder="Months" min="0" max="11" value={formData.ageMonths} onChange={handleChange} />
                      <Input type="number" name="ageDays" placeholder="Days" min="0" max="31" value={formData.ageDays} onChange={handleChange} />
                    </div>

                    <Button type="button" onClick={() => setStep(2)} className="w-full mt-4">
                      Next <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-2 gap-4">
                      <select name="gender" value={formData.gender} onChange={handleChange} className={selectClass}>
                        <option value="" className="bg-background text-foreground">Gender</option>
                        {genders.map((g) => <option key={g} value={g} className="bg-background text-foreground">{g}</option>)}
                      </select>
                      <select name="religion" value={formData.religion} onChange={handleChange} className={selectClass}>
                        <option value="" className="bg-background text-foreground">Religion</option>
                        {religions.map((r) => <option key={r} value={r} className="bg-background text-foreground">{r}</option>)}
                      </select>
                    </div>

                    <Input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                    <Input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

                    <div className="grid grid-cols-2 gap-4">
                      <Input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                      <select name="state" value={formData.state} onChange={handleChange} className={selectClass}>
                        <option value="" className="bg-background text-foreground">State</option>
                        {states.map((s) => <option key={s} value={s} className="bg-background text-foreground">{s}</option>)}
                      </select>
                    </div>

                    <select name="consultant" value={formData.consultant} onChange={handleChange} className={selectClass}>
                      <option value="" className="bg-background text-foreground">Choose Consultant</option>
                      {consultants.map((c) => <option key={c} value={c} className="bg-background text-foreground">{c}</option>)}
                    </select>

                    <div className="flex gap-4 pt-2">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                        <ChevronLeft className="w-4 h-4 mr-2" /> Back
                      </Button>
                      <Button type="submit" disabled={loading} className="flex-1">
                        {loading ? 'Confirming...' : (
                          <>Confirm <ChevronRight className="w-4 h-4 ml-2" /></>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Emergency Card */}
          <Card className="bg-primary text-primary-foreground relative overflow-hidden border-primary/50">
            <CardHeader>
              <CardTitle className="text-primary-foreground">We're Here for Your Child</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-5xl font-extrabold mb-4 opacity-90">24/7</p>
              <p className="text-sm opacity-80 leading-relaxed mb-8">
                Your child's health is our priority. Contact us anytime for immediate support.
              </p>
              <a
                href="tel:+919771400390"
                className="inline-flex items-center gap-4 bg-background/10 hover:bg-background/20 backdrop-blur-md rounded-xl px-6 py-4 transition-all"
              >
                <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-base font-bold text-primary-foreground">+91 97714 00390</p>
                  <p className="text-xs text-primary-foreground/70">Pediatric Emergency Care</p>
                </div>
              </a>
            </CardContent>
            {/* Decorative Element */}
            <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10 pointer-events-none translate-x-8 translate-y-8">
              <Shield className="w-full h-full text-primary-foreground" />
            </div>
          </Card>
        </div>
      </div>

      {/* Popup Modal */}
      {popup.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <CardContent className="pt-8 pb-8 text-center flex flex-col items-center">
              {popup.type === 'success' ? (
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                  <AlertCircle className="w-8 h-8 text-destructive" />
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {popup.type === 'success' ? 'Success!' : 'Oops!'}
              </h3>
              <p className="text-muted-foreground mb-8 text-sm">
                {popup.message}
              </p>
              <Button
                variant={popup.type === 'success' ? 'default' : 'destructive'}
                onClick={() => setPopup({ show: false, type: '', message: '' })}
                className="w-full"
              >
                {popup.type === 'success' ? 'Great' : 'Try Again'}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
