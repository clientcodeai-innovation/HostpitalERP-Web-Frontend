import React, { useState } from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Input } from '../../../shared/ui/Input';
import { Save, Bell, Mail, Palette, Globe, Shield, Database } from 'lucide-react';

const tabs = [
  { label: 'General', icon: Globe },
  { label: 'Notifications', icon: Bell },
  { label: 'Email', icon: Mail },
  { label: 'Appearance', icon: Palette },
  { label: 'Security', icon: Shield },
  { label: 'Database', icon: Database },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('General');

  return (
    <div className="space-y-6">
      <PageHeader title="System Settings" description="Application-wide settings for notifications, email, appearance, and security." breadcrumbs={[{ label: 'Admin' }, { label: 'Administration' }, { label: 'Settings' }]} actions={[{ label: 'Save All', icon: Save }]} />

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Tabs */}
        <div className="lg:w-56 shrink-0">
          <Card>
            <CardContent className="p-2">
              {tabs.map((t) => (
                <button key={t.label} onClick={() => setActiveTab(t.label)} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${activeTab === t.label ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                  <t.icon className="w-4 h-4" />{t.label}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          <Card>
            <CardHeader><CardTitle>{activeTab} Settings</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {activeTab === 'General' && (
                <>
                  <div className="space-y-2"><label className="text-sm font-medium">Application Name</label><Input defaultValue="Hari Om Ayurved Clinic ERP" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium">Timezone</label><Input defaultValue="Asia/Kolkata (UTC+5:30)" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium">Currency</label><Input defaultValue="INR (â‚¹)" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium">Date Format</label><Input defaultValue="DD MMM YYYY" /></div>
                </>
              )}
              {activeTab === 'Notifications' && (
                <>
                  {['Appointment Reminders', 'Payment Receipts', 'Follow-up Alerts', 'Low Stock Alerts', 'New Patient Registration'].map((n, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="text-sm font-medium">{n}</span>
                      <div className="flex gap-4 text-xs">
                        {['Email', 'SMS', 'WhatsApp', 'Push'].map((ch, j) => (
                          <label key={j} className="flex items-center gap-1.5 cursor-pointer">
                            <input type="checkbox" defaultChecked={j < 2} className="rounded border-input accent-primary" />{ch}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
              {activeTab === 'Email' && (
                <>
                  <div className="space-y-2"><label className="text-sm font-medium">SMTP Host</label><Input defaultValue="smtp.gmail.com" /></div>
                  <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><label className="text-sm font-medium">Port</label><Input defaultValue="587" /></div><div className="space-y-2"><label className="text-sm font-medium">Encryption</label><Input defaultValue="TLS" /></div></div>
                  <div className="space-y-2"><label className="text-sm font-medium">From Email</label><Input defaultValue="noreply@hariomhospital.com" /></div>
                </>
              )}
              {activeTab === 'Appearance' && (
                <>
                  <div className="space-y-2"><label className="text-sm font-medium">Theme</label><div className="flex gap-2"><Button variant="default" size="sm">Light</Button><Button variant="outline" size="sm">Dark</Button><Button variant="outline" size="sm">System</Button></div></div>
                  <div className="space-y-2"><label className="text-sm font-medium">Sidebar Style</label><div className="flex gap-2"><Button variant="default" size="sm">Expanded</Button><Button variant="outline" size="sm">Collapsed</Button></div></div>
                </>
              )}
              {activeTab === 'Security' && (
                <>
                  <div className="space-y-2"><label className="text-sm font-medium">Session Timeout</label><Input defaultValue="30 minutes" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium">2FA</label><div className="flex gap-2"><Button variant="default" size="sm">Enabled</Button><Button variant="outline" size="sm">Disabled</Button></div></div>
                  <div className="space-y-2"><label className="text-sm font-medium">Password Policy</label><Input defaultValue="Min 8 chars, 1 uppercase, 1 number" /></div>
                </>
              )}
              {activeTab === 'Database' && (
                <>
                  <div className="space-y-2"><label className="text-sm font-medium">Database</label><Input defaultValue="MySQL 8.0" disabled /></div>
                  <div className="space-y-2"><label className="text-sm font-medium">Connection</label><Input defaultValue="mysql://db.hariom.cloud:3306/erp_prod" disabled className="font-mono text-xs" /></div>
                  <div className="space-y-2"><label className="text-sm font-medium">Last Backup</label><Input defaultValue="14 Jul 2026, 02:00 AM" disabled /></div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
