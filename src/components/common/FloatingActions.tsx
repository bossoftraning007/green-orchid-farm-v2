import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { MAIN_WHATSAPP_NUMBER, DIRECT_PHONE_NUMBER, buildWhatsAppUrl } from '../../utils/whatsapp';

interface FloatingActionsProps {
  onOpenBookVisit: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBookVisit }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      <button
        onClick={onOpenBookVisit}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-navy-900/90 text-gold-400 font-bold text-xs border border-gold-500/40 shadow-xl backdrop-blur-md hover:bg-navy-800 transition-all hover:scale-105"
      >
        <Calendar className="w-4 h-4 text-gold-400" />
        <span className="hidden sm:inline">Book Visit</span>
      </button>

      <a
        href={`tel:${DIRECT_PHONE_NUMBER}`}
        className="w-14 h-14 rounded-full bg-navy-900 text-gold-400 border border-gold-500/40 flex items-center justify-center shadow-xl hover:scale-110 transition-all p-3.5 group"
        aria-label="Call R. Ganesh"
      >
        <Phone className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </a>

      <a
        href={buildWhatsAppUrl("Hi R. Ganesh Sir, I want to inquire about Green Orchid Farm Land.", MAIN_WHATSAPP_NUMBER)}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-600/50 hover:scale-110 transition-all p-3.5 animate-pulse-slow"
        aria-label="WhatsApp Chat"
      >
        <MessageSquare className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
};
