import React from 'react';
import { Users, Calendar, IndianRupee, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { useToast } from '../../../shared/ui/ToastContext';
import { useAuth, ROLES } from '../../../app/AuthContext';

export default function AdminDashboard() {
  const { toast } = useToast();
  const { user } = useAuth();
  const isReceptionist = user?.role === ROLES.RECEPTIONIST;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of hospital performance and daily activities.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => toast('Report downloaded successfully!', 'success')}>Download Report</Button>
          <Button onClick={() => toast('New appointment form opened', 'default')}>New Appointment</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success font-medium">+15%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success font-medium">+4</span> since yesterday
            </p>
          </CardContent>
        </Card>

        {/* Revenue Card (Hidden for Receptionist) */}
        {!isReceptionist && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue (Monthly)</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹ 124,500/-</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-destructive font-medium">-2%</span> from last month
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Doctors</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across 12 departments
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart Area Placeholder (Hidden for Receptionist) */}
        {!isReceptionist && (
          <Card className="col-span-1 lg:col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue breakdown across departments.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[300px] border-t border-border/50 mt-4">
              <div className="text-muted-foreground text-sm flex flex-col items-center">
                <Activity className="h-8 w-8 mb-2 opacity-20" />
                Chart Placeholder (Recharts / Chart.js)
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Activities */}
        <Card className={`col-span-1 ${isReceptionist ? 'lg:col-span-7' : 'lg:col-span-3'}`}>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest appointments and updates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 mt-4">
              {[
                { name: 'Dr. Sarah Smith', action: 'completed consultation for', target: 'John Doe', time: '10 mins ago', status: 'success' },
                { name: 'Receptionist', action: 'booked new appointment for', target: 'Alice Brown', time: '1 hour ago', status: 'default' },
                { name: 'Pharmacy', action: 'dispensed medicine for', target: 'Robert Fox', time: '2 hours ago', status: 'default' },
                { name: 'System', action: 'generated daily revenue report', target: '', time: '5 hours ago', status: 'secondary' },
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
      
      {/* Table Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
          <CardDescription>Manage and view scheduled patients for today.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Patient Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Doctor</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Time</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {[
                  { patient: 'Michael Clark', doctor: 'Dr. Emma Watson', time: '09:00 AM', status: 'Completed', variant: 'success' },
                  { patient: 'Sophia Taylor', doctor: 'Dr. James Anderson', time: '10:30 AM', status: 'In Progress', variant: 'default' },
                  { patient: 'William Davis', doctor: 'Dr. Sarah Smith', time: '02:15 PM', status: 'Waiting', variant: 'secondary' },
                  { patient: 'Olivia Martin', doctor: 'Dr. Emma Watson', time: '04:00 PM', status: 'Cancelled', variant: 'destructive' },
                ].map((row, index) => (
                  <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium">{row.patient}</td>
                    <td className="p-4 align-middle">{row.doctor}</td>
                    <td className="p-4 align-middle">{row.time}</td>
                    <td className="p-4 align-middle">
                      <Badge variant={row.variant}>{row.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
