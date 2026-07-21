import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';

export default function PatientProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Patient Profile Page"
        description="This is a placeholder page for PatientProfilePage."
      />
      <div className="flex items-center justify-center h-64 border rounded-xl bg-card text-muted-foreground border-dashed">
        Coming Soon
      </div>
    </div>
  );
}
