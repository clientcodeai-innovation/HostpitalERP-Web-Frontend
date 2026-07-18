import React from 'react';
import { Newspaper, ArrowRight } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';

export default function BlogPage() {
  const articles = [
    { title: "Natural Ways to Boost Your Child's Immunity", category: "Pediatrics", date: "Oct 12, 2026" },
    { title: "Understanding Constitutional Ayurveda", category: "Ayurveda", date: "Sep 28, 2026" },
    { title: "Managing Seasonal Allergies Without Drowsiness", category: "Wellness", date: "Sep 15, 2026" },
    { title: "The First 1000 Days: A Guide for New Parents", category: "Infant Care", date: "Aug 02, 2026" },
  ];

  return (
    <div className="bg-background min-h-screen">
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <Newspaper className="w-4 h-4" />
            <span>Health Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Insights & Health Tips
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest articles on pediatric care, ayurveda, and natural wellness from our experts.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors group">
                <div className="flex justify-between items-center mb-4 text-sm text-muted-foreground">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-2">
                  Discover expert advice and practical tips on managing your family's health naturally and safely with our comprehensive guides.
                </p>
                <Button variant="outline" className="gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
                  Read Article <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
