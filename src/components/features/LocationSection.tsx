import React from 'react';
import { MapPin, ShieldCheck } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const locations = [
    { name: 'JP Dargah', distance: '1 km', time: '2 mins', icon: '🕌' },
    { name: 'Microsoft Data Center', distance: '2 km', time: '4 mins', icon: '💻' },
    { name: 'Kothur Commercial Hub', distance: '5 km', time: '7 mins', icon: '🏘️' },
    { name: 'Shamshabad Airport', distance: '18 km', time: '15 mins', icon: '✈️' },
    { name: 'ORR Exit 16', distance: '16 km', time: '15 mins', icon: '🛣️' },
    { name: 'Gachibowli IT District', distance: '35 km', time: '30 mins', icon: '🏢' },
  ];

  return (
    <section id="location" className="py-20 bg-slate-900/40 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-500/30">
            LOCATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            Prime Location Advantages
          </h2>
          <p className="text-base text-slate-400">
            Perfectly located near Kothur, JP Dargah on NH-44 Bangalore Highway with excellent connectivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              className="bg-navy-900/50 border border-slate-800 rounded-2xl p-6 hover:border-gold-500/40 transition-all flex items-start gap-4"
            >
              <div className="text-3xl">{loc.icon}</div>
              <div>
                <h3 className="text-white font-bold text-sm mb-1">{loc.name}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold-400" />
                    {loc.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    {loc.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
