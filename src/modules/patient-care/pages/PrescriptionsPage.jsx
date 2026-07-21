import React, { useState } from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { Plus, FileText, Printer, Share2, Download, Eye } from 'lucide-react';
import { useAuth, ROLES } from '../../../app/AuthContext';

const prescriptions = [
  { id: 'Rx-501', patient: 'Aarav Sharma', doctor: 'Dr. Vijay', date: '14 Jul 2026', medicines: 3, status: 'Active' },
  { id: 'Rx-500', patient: 'Diya Patel', doctor: 'Dr. Sweta', date: '13 Jul 2026', medicines: 2, status: 'Dispensed' },
  { id: 'Rx-499', patient: 'Kabir Singh', doctor: 'Dr. Vijay', date: '12 Jul 2026', medicines: 4, status: 'Active' },
];

export default function PrescriptionsPage() {
  const { user } = useAuth();
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const isPharmacist = user?.role === ROLES.PHARMACIST;

  if (user?.role === ROLES.PATIENT) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="My Prescriptions"
          description="View and download your past prescriptions."
        />
        <Card>
          <CardHeader><CardTitle className="text-base">Prescription History</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-muted/30">
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">ID</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Doctor</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Medicines</th>
                  <th className="h-10 px-4 text-left font-medium text-muted-foreground">Actions</th>
                </tr></thead>
                <tbody>
                  {[
                    { id: 'Rx-501', doctor: 'Dr. Vijay - General', date: '14 Jul 2026', medicines: 3 },
                    { id: 'Rx-402', doctor: 'Dr. Sarah - Cardiology', date: '01 Jun 2026', medicines: 1 },
                  ].map((p) => (
                    <tr key={p.id} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-mono text-xs">{p.id}</td>
                      <td className="p-4 font-medium">{p.doctor}</td>
                      <td className="p-4 text-muted-foreground">{p.date}</td>
                      <td className="p-4">{p.medicines} items</td>
                      <td className="p-4 flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs"><Eye className="w-3.5 h-3.5 mr-1" /> View</Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs"><Download className="w-3.5 h-3.5 mr-1" /> PDF</Button>
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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Prescription Management"
        description={isPharmacist ? "View prescriptions and patient details." : "Build prescriptions with remedy, potency, dosage, duration, and generate PDFs."}
        breadcrumbs={[{ label: 'Admin' }, { label: 'Patient Care' }, { label: 'Prescriptions' }]}
        actions={!isPharmacist ? [{ label: 'New Prescription', icon: Plus }] : undefined}
      />

      {/* Prescription Builder Demo */}
      {selectedPrescription && (
      <Card className="border-primary/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div><CardTitle>{isPharmacist ? 'Prescription Details' : 'Prescription Builder'} - {selectedPrescription.patient}</CardTitle><CardDescription>{selectedPrescription.id} · {selectedPrescription.doctor} · {selectedPrescription.date}</CardDescription></div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5"><Printer className="w-3.5 h-3.5" />Print</Button>
              <Button variant="outline" size="sm" className="gap-1.5"><Share2 className="w-3.5 h-3.5" />Share</Button>
              <Button size="sm" className="gap-1.5"><Download className="w-3.5 h-3.5" />PDF</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Patient Details & Diagnosis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-muted/20 rounded-lg border border-border/50">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Patient Age</label>
              <Input defaultValue="32 Years" className="h-8 text-sm bg-background" readOnly={isPharmacist} disabled={isPharmacist} />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Gender</label>
              <select className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50" disabled={isPharmacist}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Diagnosis Details</label>
              <Input placeholder="Enter primary diagnosis..." defaultValue="Acute Bronchitis" className="h-8 text-sm bg-background" readOnly={isPharmacist} disabled={isPharmacist} />
            </div>
          </div>

          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30">
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">#</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Remedy</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Potency</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Dosage</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Duration</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Qty</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Instructions</th>
              </tr></thead>
              <tbody>
                {[
                  { remedy: 'Aconitum Napellus', potency: '30C', dosage: '3 pills Ã— 3/day', duration: '3 days', qty: '27', inst: 'Before meals' },
                  { remedy: 'Bryonia Alba', potency: '200C', dosage: '1 dose', duration: 'Once', qty: '1', inst: 'At bedtime' },
                  { remedy: 'Belladonna', potency: '6C', dosage: '2 pills Ã— 2/day', duration: '5 days', qty: '20', inst: 'After meals' },
                ].map((m, i) => (
                  <tr key={i} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-muted-foreground">{i + 1}</td>
                    <td className="p-4 font-medium">{m.remedy}</td>
                    <td className="p-4"><Badge variant="outline">{m.potency}</Badge></td>
                    <td className="p-4 text-muted-foreground">{m.dosage}</td>
                    <td className="p-4 text-muted-foreground">{m.duration}</td>
                    <td className="p-4 font-mono">{m.qty}</td>
                    <td className="p-4 text-muted-foreground">{m.inst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!isPharmacist && <div className="mt-4 flex justify-end"><Button>Save Prescription</Button></div>}
        </CardContent>
      </Card>
      )}

      {/* All Prescriptions */}
      <Card>
        <CardHeader><CardTitle className="text-base">All Prescriptions</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30">
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">ID</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Patient</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Doctor</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Date</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Medicines</th>
                <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
              </tr></thead>
              <tbody>
                {prescriptions.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono text-xs">{p.id}</td>
                    <td className="p-4 font-medium">
                      <button 
                        onClick={() => setSelectedPrescription(p)}
                        className="text-primary hover:underline focus:outline-none"
                      >
                        {p.patient}
                      </button>
                    </td>
                    <td className="p-4 text-muted-foreground">{p.doctor}</td>
                    <td className="p-4 text-muted-foreground">{p.date}</td>
                    <td className="p-4">{p.medicines} items</td>
                    <td className="p-4"><Badge variant={p.status === 'Dispensed' ? 'secondary' : 'default'}>{p.status}</Badge></td>
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
