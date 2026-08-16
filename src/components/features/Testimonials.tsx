import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Ravi Kumar',
      location: 'Hyderabad',
      text: 'Excellent investment! The team handled everything smoothly. Got my Pattadar Passbook within 2 weeks.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      location: 'Gachibowli',
      text: 'The free maintenance for 2 years is a huge plus. Beautiful location and great amenities.',
      rating: 5,
    },
    {
      name: 'Venkat Rao',
      location: 'Kothur',
      text: 'Very transparent process. The site visit was well organized and Ganesh Sir explained everything clearly.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-slate-900/40 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-500/30">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-navy-900/50 border border-slate-800 rounded-3xl p-8 hover:border-gold-500/40 transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
              <div>
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-slate-500 text-xs">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
