import React from 'react';

export const Amenities: React.FC = () => {
  const amenities = [
    { icon: '🏊', title: 'Swimming Pool', desc: 'Resort-style pool for relaxation' },
    { icon: '🏛️', title: 'Club House', desc: 'Elegant space for events & gatherings' },
    { icon: '🏏', title: 'Cricket Net', desc: 'Practice nets for sports enthusiasts' },
    { icon: '🏨', title: 'Visitor Rooms', desc: 'Comfortable stay for guests' },
    { icon: '🥭', title: 'Fruit Plants', desc: 'Mango, Guava, Chikoo in every plot' },
    { icon: '🛝', title: 'Play Area', desc: 'Safe space for children to play' },
    { icon: '🧱', title: 'Gated Compound', desc: '5.5 acres fully secured with wall' },
    { icon: '⛩️', title: 'Grand Arch', desc: 'Premium entrance with security cabin' },
    { icon: '🛣️', title: 'Blacktop Roads', desc: '30 feet roads with street lights' },
    { icon: '🛡️', title: '24/7 Security', desc: 'CCTV surveillance & security staff' },
    { icon: '🔐', title: 'Private Community', desc: 'Exclusive gated community living' },
    { icon: '🌳', title: 'Landscaped Park', desc: 'Beautiful green spaces & parks' },
  ];

  return (
    <section id="amenities" className="py-20 bg-navy-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800">
            AMENITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            Premium Amenities
          </h2>
          <p className="text-base text-slate-400">
            Experience luxury living with world-class amenities designed for your comfort and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, idx) => (
            <div
              key={idx}
              className="bg-navy-900/50 border border-slate-800 rounded-2xl p-6 hover:border-gold-500/40 hover:bg-navy-900 transition-all group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{amenity.icon}</div>
              <h3 className="text-white font-bold text-sm mb-1">{amenity.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{amenity.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
