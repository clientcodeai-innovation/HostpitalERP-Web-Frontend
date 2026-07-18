import React, { useState } from 'react';
import { Users, Search, Star, Calendar } from 'lucide-react';
import { Button } from '../../../../shared/ui/Button';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Smith',
    specialty: 'Pediatrician',
    experience: '12+ Years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    reviews: 120
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Neonatologist',
    experience: '15+ Years',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    reviews: 85
  },
  {
    id: 3,
    name: 'Dr. Emily Davis',
    specialty: 'Ayurvedic Doctor',
    experience: '10+ Years',
    image: 'https://images.unsplash.com/photo-1594824436998-058a23116fc7?q=80&w=1000&auto=format&fit=crop',
    rating: 5.0,
    reviews: 210
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Allergy Specialist',
    experience: '8+ Years',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1000&auto=format&fit=crop',
    rating: 4.7,
    reviews: 95
  }
];

export default function OurDoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-muted/30 py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
            <Users className="w-4 h-4" />
            <span>Our Experts</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet Our Specialist Doctors
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Our team of highly qualified and experienced pediatricians and specialists are dedicated to providing the best care for your child.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by name or specialty..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Doctor Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {doctor.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{doctor.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{doctor.specialty}</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <span>{doctor.experience} Exp.</span>
                    <span>{doctor.reviews} Reviews</span>
                  </div>

                  <Button className="w-full gap-2 rounded-xl" asChild>
                    <a href="/#appointment">
                      <Calendar className="w-4 h-4" /> Book Appointment
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No doctors found matching your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
