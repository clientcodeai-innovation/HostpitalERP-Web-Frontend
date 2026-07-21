import React, { useState } from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Plus, Search, Download, Filter, Phone, AlertTriangle, Eye, Edit, Trash2 } from 'lucide-react';
import { Input } from '../../../shared/ui/Input';

const patients = [
  { id: 'P-1001', name: 'Aarav Sharma', age: '3Y 2M', phone: '+91 98765 43210', guardian: 'Rajesh Sharma', lastVisit: '12 Jul 2026', status: 'Active', referredBy: 'Direct' },
  { id: 'P-1002', name: 'Diya Patel', age: '1Y 8M', phone: '+91 87654 32109', guardian: 'Priya Patel', lastVisit: '10 Jul 2026', status: 'Active', referredBy: 'P-1001 (Aarav Sharma)' },
  { id: 'P-1003', name: 'Kabir Singh', age: '5Y 0M', phone: '+91 76543 21098', guardian: 'Manpreet Singh', lastVisit: '08 Jul 2026', status: 'Follow-up', referredBy: 'Dr. Vivek Jain (External)' },
  { id: 'P-1004', name: 'Ananya Gupta', age: '0Y 6M', phone: '+91 65432 10987', guardian: 'Neha Gupta', lastVisit: '05 Jul 2026', status: 'Active', referredBy: 'Direct' },
  { id: 'P-1005', name: 'Rohan Verma', age: '4Y 11M', phone: '+91 54321 09876', guardian: 'Amit Verma', lastVisit: '01 Jul 2026', status: 'Discharged', referredBy: 'P-1003 (Kabir Singh)' },
  { id: 'P-1006', name: 'Ishaan Kumar', age: '2Y 3M', phone: '+91 98765 11111', guardian: 'Suresh Kumar', lastVisit: '14 Jul 2026', status: 'Active', referredBy: 'Local Clinic' },
];

const statusColors = { Active: 'default', 'Follow-up': 'secondary', Discharged: 'outline' };

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(p => {
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.phone.includes(query) ||
      p.id.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Management"
        description="Register, search, and manage patient records with duplicate prevention."
        breadcrumbs={[{ label: 'Admin' }, { label: 'Patient Care' }, { label: 'Patients' }]}
        actions={[
          { label: 'Export', icon: Download, variant: 'outline' },
          { label: 'Add Patient', icon: Plus },
        ]}
      />

      {/* Search & Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, phone, ID..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Duplicate Alert Demo - Only show if Aarav Sharma is searched just as a demo */}
      {searchQuery.toLowerCase().includes('aarav') && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm">
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
          <span className="text-foreground">Possible duplicate detected: <strong>Aarav Sharma</strong> - Phone +91 98765 43210 already exists.</span>
          <Button variant="outline" size="sm" className="ml-auto shrink-0">Review</Button>
        </div>
      )}

      {/* Patient Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">All Patients ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">ID</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Patient Name</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Age</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Phone</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Guardian</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Referred By</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Last Visit</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
                  <th className="h-10 px-4 text-right font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((p) => (
                    <tr key={p.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-mono text-xs text-muted-foreground">{p.id}</td>
                      <td className="p-4 font-medium">{p.name}</td>
                      <td className="p-4 text-muted-foreground">{p.age}</td>
                      <td className="p-4 text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{p.phone}</td>
                      <td className="p-4 text-muted-foreground">{p.guardian}</td>
                      <td className="p-4 text-muted-foreground text-xs">
                        {p.referredBy === 'Direct' ? (
                          <span className="opacity-50">Direct</span>
                        ) : (
                          <span className="font-medium text-primary bg-primary/5 px-2 py-1 rounded-md">{p.referredBy}</span>
                        )}
                      </td>
                      <td className="p-4 text-muted-foreground">{p.lastVisit}</td>
                      <td className="p-4"><Badge variant={statusColors[p.status]}>{p.status}</Badge></td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-3.5 h-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-8 text-center text-muted-foreground">No patients found matching "{searchQuery}"</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
