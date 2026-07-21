import React from 'react';
import { PageHeader } from '../../../shared/layout/PageHeader';
import { Card, CardContent } from '../../../shared/ui/Card';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';
import { Send, User } from 'lucide-react';

export default function PatientMessagePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        description="Communicate privately with your doctors and hospital staff."
      />
      <div className="flex flex-col md:flex-row gap-6 h-[600px]">
        {/* Contacts List */}
        <Card className="w-full md:w-1/3 flex flex-col">
          <div className="p-4 border-b border-border font-semibold text-foreground">
            Conversations
          </div>
          <div className="flex-1 overflow-y-auto">
            {[
              { name: 'Dr. Sarah Smith', role: 'Cardiology', active: true },
              { name: 'Dr. Priya Patel', role: 'General Practice', active: false },
              { name: 'Receptionist', role: 'Support', active: false },
            ].map((contact, idx) => (
              <div key={idx} className={`p-4 border-b border-border flex items-center gap-3 cursor-pointer transition-colors ${contact.active ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-muted/50 border-l-4 border-l-transparent'}`}>
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 truncate">
                  <div className="font-medium text-sm text-foreground truncate">{contact.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{contact.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="w-full md:w-2/3 flex flex-col">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Dr. Sarah Smith</div>
              <div className="text-xs text-muted-foreground">Online</div>
            </div>
          </div>
          <CardContent className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto bg-muted/10">
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground text-sm p-3 rounded-lg rounded-tr-none max-w-[80%] shadow-sm">
                Hello Doctor, I wanted to follow up on my recent reports.
                <div className="text-[10px] opacity-70 text-right mt-1">10:42 AM</div>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-card border border-border text-foreground text-sm p-3 rounded-lg rounded-tl-none max-w-[80%] shadow-sm">
                Hi Tanvir. I have reviewed them and everything looks normal. Please continue the prescribed medication.
                <div className="text-[10px] text-muted-foreground text-right mt-1">10:45 AM</div>
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t border-border flex gap-2">
            <Input placeholder="Type your message..." className="flex-1" />
            <Button size="icon"><Send className="w-4 h-4" /></Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
