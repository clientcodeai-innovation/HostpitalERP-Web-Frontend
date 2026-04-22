export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Fill in the appointment form",
      active: false
    },
    {
      number: "02",
      title: "Get Treatment on scheduler time",
      active: true
    },
    {
      number: "03",
      title: "Give us feedback",
      active: false
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white relative overflow-hidden">
      {/* Curved Background Line (Optional/Subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
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
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-bold rounded-md mb-4 border border-orange-100 uppercase tracking-wider">
            Working Process
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark">
            How we works?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`
                relative p-10 rounded-3xl transition-all duration-300 transform hover:-translate-y-2
                ${step.active 
                  ? 'bg-orange-500 text-white shadow-2xl shadow-orange-200' 
                  : 'bg-white text-dark shadow-xl shadow-gray-100 border border-gray-50'}
              `}
            >
              <div className="mb-6">
                <span className={`
                  text-6xl font-black opacity-30 tracking-tighter
                  ${step.active ? 'text-white' : 'text-orange-500'}
                `}>
                  {step.number}
                </span>
              </div>
              <h3 className={`text-xl font-bold leading-tight ${step.active ? 'text-white' : 'text-gray-800'}`}>
                {step.title}
              </h3>
              
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-px border-t border-dashed border-gray-300 z-0"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
