import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Phone, Calendar, ArrowRight } from 'lucide-react';
import { MAIN_WHATSAPP_NUMBER, buildWhatsAppUrl } from '../../utils/whatsapp';

export const PromotionalBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="hidden sm:flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0">
              <Sparkles className="w-3 h-3" />
              Limited Offer
            </span>
            <p className="text-sm sm:text-base font-bold truncate">
              🏡 1BHK Luxury Farmhouse at <span className="text-gold-300">₹21 Lakhs</span> — 2 Years FREE Maintenance + HMDA Approved
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a
              href={buildWhatsAppUrl("Hi R. Ganesh Sir, I saw the limited offer and want to book a site visit.", MAIN_WHATSAPP_NUMBER)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-emerald-700 text-xs font-bold hover:bg-gold-300 hover:text-navy-950 transition-all shadow-lg"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </a>
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-navy-950/80 text-white text-xs font-bold hover:bg-navy-950 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Visit
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full hover:bg-white/20 transition-colors shrink-0"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
