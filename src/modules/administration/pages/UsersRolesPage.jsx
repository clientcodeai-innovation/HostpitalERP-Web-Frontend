import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Plus, UserCog, Shield, Edit, Trash2, Check, X as XIcon } from 'lucide-react';

const users = [
  { id: 1, name: 'Dr. Vijay Kumar', email: 'vijay@bachpan.com', role: 'Doctor', status: 'Active', lastLogin: '14 Jul, 09:00 AM' },
  { id: 2, name: 'Dr. Sweta', email: 'sweta@bachpan.com', role: 'Doctor', status: 'Active', lastLogin: '14 Jul, 08:45 AM' },
  { id: 3, name: 'Receptionist 1', email: 'reception@bachpan.com', role: 'Staff', status: 'Active', lastLogin: '14 Jul, 09:30 AM' },
  { id: 4, name: 'Admin User', email: 'admin@bachpan.com', role: 'Super Admin', status: 'Active', lastLogin: '14 Jul, 07:00 AM' },
  { id: 5, name: 'Pharmacy Staff', email: 'pharmacy@bachpan.com', role: 'Pharmacist', status: 'Inactive', lastLogin: '10 Jul, 03:00 PM' },
];

const permissions = [
  { module: 'Patients', admin: true, doctor: true, staff: true, pharmacist: false },
  { module: 'Appointments', admin: true, doctor: true, staff: true, pharmacist: false },
  { module: 'Consultations', admin: true, doctor: true, staff: false, pharmacist: false },
  { module: 'Prescriptions', admin: true, doctor: true, staff: false, pharmacist: true },
  { module: 'Billing', admin: true, doctor: false, staff: true, pharmacist: false },
  { module: 'Inventory', admin: true, doctor: false, staff: false, pharmacist: true },
  { module: 'Settings', admin: true, doctor: false, staff: false, pharmacist: false },
];

const roleColors = { 'Super Admin': 'default', Doctor: 'secondary', Staff: 'outline', Pharmacist: 'outline' };

export default function UsersRolesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Users & Roles" description="Manage users, assign roles, and configure module-level permissions." breadcrumbs={[{ label: 'Admin' }, { label: 'Administration' }, { label: 'Users & Roles' }]} actions={[{ label: 'Invite User', icon: Plus }]} />
      {/* Users Table */}
      <Card><CardHeader><CardTitle className="text-base">All Users</CardTitle></CardHeader><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/30"><th className="h-10 px-4 text-left font-medium text-muted-foreground">Name</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Email</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Role</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th><th className="h-10 px-4 text-left font-medium text-muted-foreground">Last Login</th><th className="h-10 px-4 text-right font-medium text-muted-foreground">Actions</th></tr></thead><tbody>
        {users.map((u)=>(<tr key={u.id} className="border-b hover:bg-muted/30"><td className="p-4 font-medium">{u.name}</td><td className="p-4 text-muted-foreground">{u.email}</td><td className="p-4"><Badge variant={roleColors[u.role]}>{u.role}</Badge></td><td className="p-4"><Badge variant={u.status==='Active'?'default':'secondary'}>{u.status}</Badge></td><td className="p-4 text-xs text-muted-foreground">{u.lastLogin}</td><td className="p-4 text-right flex gap-1 justify-end"><Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-3.5 h-3.5" /></Button><Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button></td></tr>))}
      </tbody></table></div></CardContent></Card>

      {/* Permission Matrix */}
      <Card><CardHeader><CardTitle className="text-base">Permission Matrix</CardTitle></CardHeader><CardContent className="p-0"><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/30"><th className="h-10 px-4 text-left font-medium text-muted-foreground">Module</th><th className="h-10 px-4 text-center font-medium text-muted-foreground">Super Admin</th><th className="h-10 px-4 text-center font-medium text-muted-foreground">Doctor</th><th className="h-10 px-4 text-center font-medium text-muted-foreground">Staff</th><th className="h-10 px-4 text-center font-medium text-muted-foreground">Pharmacist</th></tr></thead><tbody>
        {permissions.map((p,i)=>(<tr key={i} className="border-b hover:bg-muted/30"><td className="p-4 font-medium">{p.module}</td>{[p.admin, p.doctor, p.staff, p.pharmacist].map((v,j)=>(<td key={j} className="p-4 text-center">{v ? <Check className="w-4 h-4 text-primary mx-auto" /> : <XIcon className="w-4 h-4 text-muted-foreground/30 mx-auto" />}</td>))}</tr>))}
      </tbody></table></div></CardContent></Card>
    </div>
  );
}
