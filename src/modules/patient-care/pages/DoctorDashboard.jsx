import React from 'react';
import { Users, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { useToast } from '../../../shared/ui/ToastContext';

export default function DoctorDashboard() {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Doctor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your appointments and patient activities.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => toast('Schedule downloaded', 'success')}>Download Schedule</Button>
          <Button onClick={() => toast('New consultation started', 'default')}>Start Consultation</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success font-medium">+12</span> this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success font-medium">4</span> remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Consultations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground mt-1">
              Patients seen today
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Appointments replacing Revenue Overview */}
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
            <CardDescription>Your upcoming and recently completed patient visits.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto mt-4">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Time</th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Patient Name</th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Type</th>
                    <th className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {[
                    { time: '09:00 AM', patient: 'Michael Clark', type: 'Checkup', status: 'Completed', variant: 'success' },
                    { time: '10:30 AM', patient: 'Sophia Taylor', type: 'Follow-up', status: 'In Progress', variant: 'default' },
                    { time: '02:15 PM', patient: 'William Davis', type: 'Consultation', status: 'Waiting', variant: 'secondary' },
                    { time: '04:00 PM', patient: 'Olivia Martin', type: 'Checkup', status: 'Scheduled', variant: 'outline' },
                    { time: '05:30 PM', patient: 'James Wilson', type: 'Report Review', status: 'Scheduled', variant: 'outline' },
                  ].map((row, index) => (
                    <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-2 align-middle">{row.time}</td>
                      <td className="p-2 align-middle font-medium">{row.patient}</td>
                      <td className="p-2 align-middle">{row.type}</td>
                      <td className="p-2 align-middle">
                        <Badge variant={row.variant}>{row.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates on your patients.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 mt-4">
              {[
                { name: 'You', action: 'completed consultation for', target: 'Michael Clark', time: '10 mins ago', status: 'success' },
                { name: 'Receptionist', action: 'checked in patient', target: 'Sophia Taylor', time: '1 hour ago', status: 'default' },
                { name: 'Pharmacy', action: 'dispensed your prescription for', target: 'Robert Fox', time: '2 hours ago', status: 'secondary' },
                { name: 'Lab', action: 'uploaded blood test results for', target: 'William Davis', time: '5 hours ago', status: 'default' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                    activity.status === 'success' ? 'bg-success' : 
                    activity.status === 'secondary' ? 'bg-secondary-foreground' : 'bg-primary'
                  }`} />
                  <div className="space-y-1">
                    <p className="text-sm leading-none">
                      <span className="font-medium">{activity.name}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
