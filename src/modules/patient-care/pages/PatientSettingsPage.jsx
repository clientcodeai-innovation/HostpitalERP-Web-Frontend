import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Bell, Moon, Globe, Shield, Save } from 'lucide-react';
import { useToast } from '../../../shared/ui/ToastContext';
import { useTheme } from '../../../shared/theme/ThemeProvider';

export default function PatientSettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleSave = (e) => {
    e.preventDefault();
    toast('Settings saved successfully!', 'success');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your app preferences and privacy settings."
      />
      <div className="max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Bell className="w-5 h-5 text-primary" /></div>
              <CardTitle className="text-lg">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive appointment reminders via email.</div>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">SMS Alerts</div>
                  <div className="text-sm text-muted-foreground">Get instant text alerts for urgent updates.</div>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Theme & Display */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Moon className="w-5 h-5 text-primary" /></div>
              <CardTitle className="text-lg">Appearance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Theme</div>
                  <div className="text-sm text-muted-foreground">Select your preferred app theme.</div>
                </div>
                <select 
                  className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Language & Region */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Globe className="w-5 h-5 text-primary" /></div>
              <CardTitle className="text-lg">Language</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Display Language</div>
                  <div className="text-sm text-muted-foreground">Change the language used in the app.</div>
                </div>
                <select className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                  <option value="en">English (US)</option>
                  <option value="bn">Bengali</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Shield className="w-5 h-5 text-primary" /></div>
              <CardTitle className="text-lg">Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Data Sharing</div>
                  <div className="text-sm text-muted-foreground">Allow sharing anonymized data for research.</div>
                </div>
                <input type="checkbox" className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="gap-2"><Save className="w-4 h-4" /> Save Settings</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
