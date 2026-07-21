import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { X, Calendar as CalendarIcon, Clock, User, Video, FileText } from 'lucide-react';
import { useToast } from '../../../shared/ui/ToastContext';

export default function PatientDashboard() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { toast } = useToast();
  
  const handleBookAppointment = (e) => {
    e.preventDefault();
    toast('Appointment Booked Successfully!', 'success');
    setIsBookingOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Booking Modal Overlay */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in duration-200">
          <Card className="w-full max-w-md mx-4 shadow-xl animate-in zoom-in-95 duration-200">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
              <CardTitle>Book Appointment</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsBookingOpen(false)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Doctor</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10" required>
                      <option value="">Choose a doctor...</option>
                      <option value="dr_smith">Dr. Sarah Smith - Cardiology</option>
                      <option value="dr_jones">Dr. Michael Jones - Pediatrics</option>
                      <option value="dr_patel">Dr. Priya Patel - General</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="date" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="time" className="pl-10" required />
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsBookingOpen(false)}>Cancel</Button>
                  <Button type="submit">Confirm Booking</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Patient Portal</h1>
          <p className="text-muted-foreground mt-1">Welcome back. View your upcoming appointments and medical records.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => toast('Medical history downloaded', 'success')}>Download Records</Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsBookingOpen(true)}>Book Appointment</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Upcoming Appointment */}
        <Card className="rounded-xl border border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Upcoming Appointment</CardTitle>
            <CalendarIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mt-2">Tomorrow, 10:00 AM</div>
            <p className="text-sm text-muted-foreground mt-1">Dr. Sarah Smith - Cardiology</p>
            <Button variant="outline" className="w-full mt-4 font-normal" onClick={() => toast('Reschedule flow initiated', 'default')}>
              Reschedule
            </Button>
          </CardContent>
        </Card>

        {/* Video Consultation */}
        <Card className="rounded-xl border border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Video Consultation</CardTitle>
            <Video className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mt-2">Not Scheduled</div>
            <p className="text-sm text-muted-foreground mt-1">Book an online session with your doctor.</p>
            <Button variant="outline" className="w-full mt-4 font-normal" onClick={() => toast('Request Session initiated', 'default')}>
              Request Session
            </Button>
          </CardContent>
        </Card>

        {/* Recent Lab Results */}
        <Card className="rounded-xl border border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Recent Lab Results</CardTitle>
            <FileText className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mt-2">Blood Test</div>
            <p className="text-sm text-muted-foreground mt-1">Ready to view. Uploaded 2 days ago.</p>
            <Button variant="outline" className="w-full mt-4 font-normal" onClick={() => toast('Viewing Results...', 'default')}>
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
