import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';

export default function BloodBankPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Blood Bank Page"
        description="This is a placeholder page for BloodBankPage."
      />
      <div className="flex items-center justify-center h-64 border rounded-xl bg-card text-muted-foreground border-dashed">
        Coming Soon
      </div>
    </div>
  );
}
