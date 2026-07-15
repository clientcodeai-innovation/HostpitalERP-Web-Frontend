import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card text-muted-foreground py-8 text-center text-sm border-t border-border">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2">
        <p className="flex items-center gap-1">
          Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by ClientCode AI
        </p>
        <p>&copy; {new Date().getFullYear()} Hari Om Homeo Clinic ERP. All rights reserved.</p>
      </div>
    </footer>
  );
}
