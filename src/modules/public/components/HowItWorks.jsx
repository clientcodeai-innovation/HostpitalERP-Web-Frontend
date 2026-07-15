import { Badge } from '../../../shared/ui/Badge';
import { Card, CardContent } from '../../../shared/ui/Card';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Fill in the appointment form",
      active: false
    },
    {
      number: "02",
      title: "Get treatment on scheduled time",
      active: true
    },
    {
      number: "03",
      title: "Give us feedback & follow up",
      active: false
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Curved Background Line */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <svg className="w-full h-full text-foreground" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <path 
            d="M0,200 C200,100 400,300 600,200 C800,100 1000,300 1000,200" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeDasharray="8,8" 
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Badge variant="outline" className="mb-4">
            Working Process
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
            How we work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}>
              <Card 
                className={`
                  h-full p-8 transition-all duration-300 transform hover:-translate-y-2
                  ${step.active 
                    ? 'bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20' 
                    : 'bg-card text-card-foreground border-border/50 hover:border-primary/50'}
                `}
              >
                <CardContent className="p-0">
                  <div className="mb-6">
                    <span className={`
                      text-6xl font-black tracking-tighter opacity-20
                      ${step.active ? 'text-primary-foreground' : 'text-primary'}
                    `}>
                      {step.number}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold leading-tight ${step.active ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {step.title}
                  </h3>
                </CardContent>
              </Card>
              
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-px border-t border-dashed border-border z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
