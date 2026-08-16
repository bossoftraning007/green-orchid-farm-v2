import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { MAIN_WHATSAPP_NUMBER } from '../../utils/whatsapp';

interface PropertyCardProps {
  title: string;
  type: string;
  price: number;
  originalPrice?: number;
  plotSize: string;
  houseSize: string;
  tag?: string;
  features: string[];
  image: string;
  onOpenBookVisit: () => void;
  onOpenEmi: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  title, type, price, originalPrice, plotSize, houseSize, tag, features, image, onOpenBookVisit
}) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(price);

  return (
    <div className="bg-navy-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:border-gold-500/40 transition-all group">
      <div className="relative bg-slate-950 p-4">
        <img src={image} alt={title} className="w-full h-56 object-cover rounded-2xl border border-slate-800 group-hover:scale-105 transition-transform duration-500" />
        {tag && (
          <span className={`absolute top-6 left-6 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            tag === 'Best Deal' ? 'bg-gold-500 text-navy-950' : 'bg-emerald-500 text-white'
          }`}>
            {tag === 'Best Deal' && <Sparkles className="w-3 h-3 inline mr-1" />}
            {tag}
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-slate-400 text-xs uppercase tracking-wider">{type}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-gold-400">₹{formattedPrice}</p>
            {originalPrice && (
              <p className="text-xs text-slate-500 line-through">₹{new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(originalPrice)}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4 text-xs text-slate-400">
          <span>Plot: {plotSize}</span>
          <span className="w-1 h-1 rounded-full bg-slate-600" />
          <span>House: {houseSize}</span>
        </div>

        <div className="space-y-2 mb-6">
          {features.slice(0, 5).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {feature}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenBookVisit}
            className="py-3 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 font-bold text-xs hover:from-gold-400 hover:to-amber-400 transition-all shadow-lg hover:scale-105"
          >
            Book Visit
          </button>
          <a
            href={buildWhatsAppUrl(`Hi R. Ganesh Sir, I am interested in ${title} at ₹${formattedPrice}.`, MAIN_WHATSAPP_NUMBER)}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center hover:bg-emerald-500 transition-all hover:scale-105"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
