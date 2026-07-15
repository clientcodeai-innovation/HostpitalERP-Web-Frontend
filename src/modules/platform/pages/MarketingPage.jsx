import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../shared/ui/Card';
import { Badge } from '../../../shared/ui/Badge';
import { Button } from '../../../shared/ui/Button';
import { Megaphone, Star, MapPin, Share2, BarChart3, ExternalLink } from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Marketing Tools" description="Google Business profile, public marketing, and SEO management." breadcrumbs={[{ label: 'Admin' }, { label: 'Platform' }, { label: 'Marketing' }]} />

      {/* Google Business Profile */}
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" />Google Business Profile</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Profile Views</p><p className="text-2xl font-bold">2,480</p><p className="text-xs text-primary">+18% this month</p></div>
            <div className="p-4 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Reviews</p><p className="text-2xl font-bold flex items-center gap-1">4.8 <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /></p><p className="text-xs text-muted-foreground">124 reviews</p></div>
            <div className="p-4 bg-muted/50 rounded-lg"><p className="text-xs text-muted-foreground">Direction Requests</p><p className="text-2xl font-bold">340</p><p className="text-xs text-muted-foreground">This month</p></div>
          </div>
          <Button variant="outline" className="mt-4 gap-1.5"><ExternalLink className="w-4 h-4" />Open Google Business</Button>
        </CardContent>
      </Card>

      {/* Marketing Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'Social Media Links', desc: 'Connect Facebook, Instagram, YouTube.', icon: Share2, status: '3 connected' },
          { title: 'Review Management', desc: 'Track and respond to patient reviews.', icon: Star, status: '12 pending' },
          { title: 'Campaign Analytics', desc: 'Track marketing campaign performance.', icon: BarChart3, status: '2 active' },
          { title: 'SEO Dashboard', desc: 'Keywords, rankings, and organic traffic.', icon: Megaphone, status: 'Healthy' },
        ].map((t, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><t.icon className="w-5 h-5 text-primary" /></div>
                <Badge variant="outline">{t.status}</Badge>
              </div>
              <CardTitle className="text-base mt-3">{t.title}</CardTitle>
            </CardHeader>
            <CardContent><CardDescription>{t.desc}</CardDescription></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
