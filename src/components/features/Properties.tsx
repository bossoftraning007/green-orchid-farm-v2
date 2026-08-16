import React from 'react';
import { PropertyCard } from './PropertyCard';
import { buildWhatsAppUrl } from '../../utils/whatsapp';
import { MAIN_WHATSAPP_NUMBER } from '../../utils/whatsapp';

interface PropertiesProps {
  onOpenBookVisit: () => void;
  onOpenEmi: () => void;
}

const properties = [
  {
    id: '1bhk',
    title: '1BHK Luxury Farmhouse',
    type: 'Best Deal',
    price: 2100000,
    originalPrice: 2400000,
    plotSize: '121 sq.yards',
    houseSize: '350 sq.ft',
    tag: 'Best Deal',
    image: '/posters/farmhouse.jpeg',
    features: [
      '8 Premium Furniture Items Included',
      '2 Years FREE Maintenance',
      'HMDA Approved Layout',
      'Organic Fruit Trees',
      'Gated Community',
      'Spot Registration',
    ],
  },
  {
    id: '2bhk',
    title: '2BHK Villa Farmhouse',
    type: 'Premium',
    price: 3500000,
    plotSize: '242 sq.yards',
    houseSize: '350 sq.ft',
    tag: 'Premium',
    image: '/posters/weekend-houses.jpeg',
    features: [
      '8 Premium Furniture Items Included',
      '2 Years FREE Maintenance',
      'HMDA Approved Layout',
      'Road-Facing Premium Plot',
      'Organic Fruit Trees',
      'Private Gated Community',
    ],
  },
];

export const Properties: React.FC<PropertiesProps> = ({ onOpenBookVisit, onOpenEmi }) => {
  return (
    <section id="properties" className="py-20 bg-navy-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-500/30">
            OUR PROPERTIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            Premium Farmhouse Plots
          </h2>
          <p className="text-base text-slate-400">
            Choose from our carefully designed 1BHK and 2BHK luxury farmhouse options with full amenities and legal approvals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
              onOpenBookVisit={onOpenBookVisit}
              onOpenEmi={onOpenEmi}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm mb-4">Still have questions? Contact us directly</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={buildWhatsAppUrl("Hi R. Ganesh Sir, I have questions about the properties.", MAIN_WHATSAPP_NUMBER)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition-all shadow-lg hover:scale-105"
            >
              WhatsApp Inquiry
            </a>
            <button
              onClick={onOpenEmi}
              className="px-8 py-3 rounded-xl bg-navy-900 border border-slate-700 text-slate-300 font-bold text-sm hover:bg-navy-800 hover:text-white transition-all"
            >
              Calculate EMI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
