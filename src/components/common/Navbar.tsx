import React, { useState } from 'react';
import { Menu, X, Calendar, MessageSquare } from 'lucide-react';
import { MAIN_WHATSAPP_NUMBER, buildWhatsAppUrl } from '../../utils/whatsapp';

interface NavbarProps {
  onOpenBookVisit: () => void;
}

const navLinks = [
  { label: 'Properties', href: '#properties' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Location', href: '#location' },
  { label: 'Legal Docs', href: '#legal' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenBookVisit }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-navy-950/90 backdrop-blur-xl border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-300 flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
              <span className="text-2xl">🏡</span>
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-wider text-white block leading-none">
                OWN YOUR <span className="text-gold-500">FARMHOUSE</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium block mt-1">
                Green Orchid • Bright Properties
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-gold-400 transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={onOpenBookVisit} className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold bg-navy-900 text-gold-400 border border-gold-500/40 hover:border-gold-400 hover:bg-navy-800 transition-all shadow-md">
              <Calendar className="w-4 h-4" />
              Book Site Visit
            </button>
            <a href={buildWhatsAppUrl("Hi R. Ganesh Sir, I want to inquire about Green Orchid Farm Land.", MAIN_WHATSAPP_NUMBER)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 hover:from-gold-400 hover:to-amber-400 transition-all shadow-lg shadow-gold-500/20 hover:scale-105">
              <MessageSquare className="w-4 h-4 fill-navy-950" />
              WhatsApp Us
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button onClick={onOpenBookVisit} className="px-3 py-1.5 rounded-full text-xs font-bold bg-navy-900 text-gold-400 border border-gold-500/40">
              Book Visit
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-300 hover:text-white rounded-xl bg-navy-900 border border-slate-800">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-900 border-b border-slate-800 px-4 pt-4 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-semibold tracking-wider text-slate-200 hover:text-gold-400 border-b border-slate-800/60 uppercase">
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <button onClick={() => { setMobileMenuOpen(false); onOpenBookVisit(); }} className="w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-navy-800 text-gold-400 border border-gold-500/40 flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Book Site Visit
            </button>
            <a href={buildWhatsAppUrl("Hi R. Ganesh Sir, I want to inquire about Green Orchid Farm Land.", MAIN_WHATSAPP_NUMBER)} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 flex items-center justify-center gap-2 shadow-lg">
              <MessageSquare className="w-4 h-4" />
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
