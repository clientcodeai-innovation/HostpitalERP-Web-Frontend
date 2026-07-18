import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Phone, MapPin, Calendar, Activity, Syringe, Video, Info, Bot, Sparkles } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  
  const [history, setHistory] = useState([
    {
      type: 'bot',
      text: "🙏 Welcome to Hari Om Ayurved Clinic\n\nHow can we assist you today?",
      options: [
        { id: 'opd', label: "Book OPD Appointment", icon: Calendar },
        { id: 'emergency', label: "Emergency / Admission", icon: Activity },
        { id: 'vaccination', label: "Vaccination Schedule", icon: Syringe },
        { id: 'video', label: "Video Consultation", icon: Video },
        { id: 'doctors', label: "Specialist Information", icon: Info },
        { id: 'contact', label: "Contact & Location", icon: MapPin },
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isOpen]);

  const handleOptionClick = (option) => {
    // Add user message
    const newHistory = [...history, { type: 'user', text: option.label }];
    
    // Determine bot response based on ID
    let botResponse = {};

    switch(option.id) {
      case 'opd':
        botResponse = {
          type: 'bot',
          text: "Thanks — you chose to book an OPD appointment.\n\nPlease select your preferred department:",
          options: [
            { id: 'dept_pedia', label: "👶 Pediatrician (Dr. Vijay)" },
            { id: 'dept_gynae', label: "👩‍⚕️ Gynaecologist (Dr. Sweta)" },
            { id: 'dept_other', label: "👨‍⚕️ Other Specialists" }
          ]
        };
        break;
      case 'emergency':
        botResponse = {
          type: 'bot',
          text: "⚠️ For Medical Emergencies, please call us immediately on our 24/7 helpline:\n\n📞 +91 99999-99999\n\nWe have Critical Care and NICU facilities ready."
        };
        break;
      case 'vaccination':
        botResponse = {
          type: 'bot',
          text: "We offer all standard pediatric vaccinations in a child-friendly environment. \n\nWould you like to book a vaccination slot?",
          options: [
            { id: 'book_vac', label: "Yes, Book Slot" },
            { id: 'contact_desk', label: "Talk to Reception" }
          ]
        };
        break;
      case 'video':
        botResponse = {
          type: 'bot',
          text: "Video consultations are available daily from 10 AM to 6 PM. \n\nThe consultation fee is ₹500. Our team will share the Google Meet link once confirmed.",
          options: [
            { id: 'contact_desk', label: "Book Video Call" }
          ]
        };
        break;
      case 'doctors':
        botResponse = {
          type: 'bot',
          text: "👨‍⚕️ Dr. Vijay:\nExpert in Pediatrics & Neonatology (NICU).\n\n👩‍⚕️ Dr. Sweta:\nExpert in Gynaecology, Obstetrics & Infertility."
        };
        break;
      case 'contact':
        botResponse = {
          type: 'bot',
          text: "📍 Address: Hari Om Ayurved Clinic, Main Medical Road, City.\n\n📞 Phone: +91 99999-99999\n🕒 Timings: 9:00 AM - 9:00 PM (Mon-Sat)\n\nSunday: 10:00 AM - 2:00 PM"
        };
        break;
      case 'dept_pedia':
      case 'dept_gynae':
      case 'dept_other':
      case 'book_vac':
      case 'contact_desk':
        botResponse = {
          type: 'bot',
          text: "Please contact our reception desk to confirm your slot.\n\n📞 +91 99999-99999"
        };
        break;
      default:
        botResponse = {
          type: 'bot',
          text: "I can help you with that. Please call our reception for more details."
        };
    }
    
    // Add typing delay for realistic feel
    setHistory([...newHistory, { type: 'bot', isTyping: true }]);
    
    setTimeout(() => {
      setHistory([...newHistory, botResponse]);
    }, 600);
  };

  const whatsappNumber = "919999999999"; // Replace with actual number
  const whatsappMessage = "Hello, I would like to book an appointment.";

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-2 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-primary p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Hari Om Assistant</h3>
                <p className="text-xs text-primary-100">Online | AI Chatbot</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-6 space-y-4 max-h-[450px] overflow-y-auto bg-gray-50/50">
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none whitespace-pre-wrap'
                }`}>
                  {msg.isTyping ? (
                    <div className="flex gap-1 items-center h-5">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <>
                      {msg.text}
                      
                      {/* Options */}
                      {msg.options && (
                        <div className="mt-4 space-y-2">
                          {msg.options.map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => handleOptionClick(opt)}
                              className="w-full text-left p-3 rounded-xl border border-gray-100 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all flex items-center gap-3 group"
                            >
                              {opt.icon && <opt.icon className="w-4 h-4 text-gray-400 group-hover:text-primary" />}
                              <span className="font-medium">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Placeholder */}
          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20"
              readOnly
            />
            <button className="bg-primary text-white p-2 rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {/* WhatsApp Button */}
        {!isOpen && (
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 animate-in fade-in"
            title="Chat on WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        )}

        {/* AI Chatbot Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
            isOpen ? 'bg-gray-100 text-gray-600' : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white'
          }`}
          title="AI Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
               <Sparkles className="w-7 h-7" />
               <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
