import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Droplet } from 'lucide-react';

export default function PatientBloodBankPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Blood Bank"
        description="View available blood stock in our hospital."
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type, idx) => (
          <Card key={idx} className="border-border">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
                <Droplet className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold">{type}</h3>
              <p className="text-sm text-muted-foreground mt-1">Status</p>
              <Badge variant="outline" className={`mt-2 ${idx % 3 === 0 ? 'border-red-500 text-red-500' : 'border-emerald-500 text-emerald-500'}`}>
                {idx % 3 === 0 ? 'Low Stock' : 'Available'}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
