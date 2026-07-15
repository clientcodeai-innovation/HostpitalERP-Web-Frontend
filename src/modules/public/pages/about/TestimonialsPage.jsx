import React from 'react';
import { MessageSquare, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    relation: "Mother of 3-year-old",
    rating: 5,
    text: "The care my son received at Bachpan Hospital was exceptional. Dr. Sarah was so patient and explained everything clearly. The pediatric ward doesn't feel like a hospital at all!",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Rahul Verma",
    relation: "Father of newborn",
    rating: 5,
    text: "Our experience with the NICU team was life-saving. The nurses were available 24/7 and supported us through the toughest days. Forever grateful to the entire team.",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Sneha Patel",
    relation: "Mother of 7-year-old",
    rating: 4,
    text: "We opted for constitutional homeopathic care for my daughter's chronic asthma. After 6 months of treatment here, her immunity has improved drastically. Highly recommend their holistic approach.",
    date: "2 months ago"
  },
  {
    id: 4,
    name: "Amit Kumar",
    relation: "Father of 5-year-old",
    rating: 5,
    text: "Very clean premises and extremely professional staff. The vaccination process was so smooth, my son didn't even cry. The play area in the waiting room is a great touch.",
    date: "3 months ago"
  },
  {
    id: 5,
    name: "Neha Gupta",
    relation: "Mother of 10-year-old",
    rating: 5,
    text: "The emergency team responded immediately when my daughter had a high fever in the middle of the night. Their prompt action and gentle care made all the difference.",
    date: "4 months ago"
  },
  {
    id: 6,
    name: "Vikram Singh",
    relation: "Father of 2-year-old",
    rating: 4,
    text: "Good facilities and experienced doctors. The only thing is the wait time can sometimes be long during peak evening hours, but the quality of consultation makes up for it.",
    date: "5 months ago"
  }
];

export default function TestimonialsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-muted/30 py-16 border-b border-border text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <MessageSquare className="w-4 h-4" />
            <span>Patient Stories</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Parents Say About Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories and experiences from parents who trusted us with their most precious ones.
          </p>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="break-inside-avoid bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`} 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex justify-between items-end border-t border-border pt-4">
                  <div>
                    <div className="font-bold text-foreground text-sm">{testimonial.name}</div>
                    <div className="text-xs text-primary font-medium">{testimonial.relation}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
