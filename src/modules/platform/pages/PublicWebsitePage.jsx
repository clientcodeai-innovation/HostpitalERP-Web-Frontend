import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Globe, Users, Image, Award, MessageSquare, FileText, Settings, ExternalLink } from 'lucide-react';

const sections = [
  { title: 'Doctor Listing', desc: 'Manage public doctor profiles, specializations, and availability.', icon: Users, count: '4 doctors' },
  { title: 'Gallery & Media', desc: 'Upload hospital images, procedure photos, and facility tours.', icon: Image, count: '24 photos' },
  { title: 'Awards & Recognition', desc: 'Showcase hospital certifications and achievements.', icon: Award, count: '6 awards' },
  { title: 'Testimonials', desc: 'Patient reviews and success stories.', icon: MessageSquare, count: '12 reviews' },
  { title: 'Blog / Articles', desc: 'Health tips, parenting articles, and medical news.', icon: FileText, count: '8 posts' },
  { title: 'SEO Settings', desc: 'Meta titles, descriptions, Open Graph, and sitemap.', icon: Settings, count: 'Configured' },
];

export default function PublicWebsitePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Public Website CMS" description="Doctor listing, gallery, testimonials, blog, appointment request form, and SEO." breadcrumbs={[{ label: 'Admin' }, { label: 'Platform' }, { label: 'Public Website' }]} actions={[{ label: 'View Live Site', icon: ExternalLink, variant: 'outline' }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><s.icon className="w-5 h-5 text-primary" /></div>
                <Badge variant="outline">{s.count}</Badge>
              </div>
              <CardTitle className="text-base mt-3">{s.title}</CardTitle>
            </CardHeader>
            <CardContent><CardDescription>{s.desc}</CardDescription></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
