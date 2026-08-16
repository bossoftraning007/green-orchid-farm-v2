import React from 'react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-navy-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-300 flex items-center justify-center shadow-lg">
              <span className="text-xl">🏡</span>
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider text-white block">OWN YOUR FARMHOUSE</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400">Green Orchid • Bright Properties</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Green Orchid Farm Land. All rights reserved.</p>
            <p className="text-slate-500 text-xs mt-1">HMDA Approved | Gated Community | Premium Farmhouses</p>
          </div>

          <button onClick={onOpenAdmin} className="text-xs text-slate-500 hover:text-gold-400 transition-colors">
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
};
