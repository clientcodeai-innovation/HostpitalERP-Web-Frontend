import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { Building2, Save, Upload, Globe, Palette } from 'lucide-react';

export default function ClinicSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Clinic Settings" description="Manage clinic profile, subscription, branding, and multi-tenant configuration." breadcrumbs={[{ label: 'Admin' }, { label: 'Administration' }, { label: 'Clinic Settings' }]} actions={[{ label: 'Save Changes', icon: Save }]} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clinic Info */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5 text-primary" />Clinic Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><label className="text-sm font-medium">Clinic Name</label><Input defaultValue="hospital Ayurved Clinic â€” Ayurvedic & Pediatric Center" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><label className="text-sm font-medium">Phone</label><Input defaultValue="+91 97714 00390" /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Email</label><Input defaultValue="info@hospitalhospital.com" /></div>
            </div>
            <div className="space-y-2"><label className="text-sm font-medium">Address</label><Input defaultValue="Maulapur, Mahmudabad, Sitapur, UP 261203" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Website</label><Input defaultValue="https://hospitalhospital.com" /></div>
          </CardContent>
        </Card>
        {/* Subscription */}
        <Card>
          <CardHeader><CardTitle>Subscription & Plan</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
              <div><p className="font-bold text-lg">Professional Plan</p><p className="text-sm text-muted-foreground">Multi-tenant SaaS Â· Unlimited patients</p></div>
              <Badge className="text-base px-4 py-1">Active</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Billing Cycle</p><p className="font-medium">Monthly</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Next Renewal</p><p className="font-medium">14 Aug 2026</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Users Allowed</p><p className="font-medium">25</p></div>
              <div className="p-3 bg-muted/50 rounded-lg"><p className="text-muted-foreground">Data Isolation</p><p className="font-medium">Clinic-wise</p></div>
            </div>
          </CardContent>
        </Card>
        {/* Branding */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-primary" />Branding</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center"><Upload className="w-6 h-6 text-primary" /></div>
              <div><p className="font-medium">Clinic Logo</p><p className="text-xs text-muted-foreground">PNG, SVG Â· Max 2MB</p><Button variant="outline" size="sm" className="mt-2">Upload</Button></div>
            </div>
            <div className="space-y-2"><label className="text-sm font-medium">Primary Color</label><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary border border-border"></div><Input defaultValue="#16A34A" className="max-w-[200px] font-mono" /></div></div>
          </CardContent>
        </Card>
        {/* Domain */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" />Domain & Tenant</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><label className="text-sm font-medium">Subdomain</label><div className="flex items-center"><Input defaultValue="hospital" className="rounded-r-none" /><span className="px-4 py-2 bg-muted border border-l-0 border-input rounded-r-md text-sm text-muted-foreground">.erpcloud.in</span></div></div>
            <div className="space-y-2"><label className="text-sm font-medium">Tenant ID</label><Input defaultValue="tenant_hospital_001" disabled className="font-mono" /></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
