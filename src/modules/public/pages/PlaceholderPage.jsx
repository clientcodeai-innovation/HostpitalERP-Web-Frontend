import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlaceholderPage({ title, description, icon: Icon }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-background text-center">
      <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8">
        {Icon ? <Icon className="w-10 h-10 text-primary" /> : <Clock className="w-10 h-10 text-primary" />}
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
        {title}
      </h1>
      
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
        {description || "We are working hard to bring you detailed information about this section. Please check back soon."}
      </p>

      <Link 
        to="/" 
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-5 h-5" />
        Return to Home
      </Link>
    </div>
  );
}
