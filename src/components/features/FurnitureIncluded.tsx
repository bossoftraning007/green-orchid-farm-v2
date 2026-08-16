import React from 'react';

export const FurnitureIncluded: React.FC = () => {
  const items = [
    'King-size bed with mattress',
    'Ceiling fans',
    'Dining table with chairs',
    'LED TV',
    'Refrigerator',
    'Barbecue grill',
    'Sofa set',
    'Garden chairs',
  ];

  return (
    <section className="py-20 bg-navy-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800">
            FULLY FURNISHED
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            8 Premium Items Included FREE
          </h2>
          <p className="text-base text-slate-400">
            Every farmhouse comes fully furnished with premium items at zero extra cost. Ready to move in!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-navy-900/50 border border-slate-800 rounded-2xl p-6 text-center hover:border-gold-500/40 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-gold-500/10 text-gold-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <span className="text-lg">✨</span>
              </div>
              <p className="text-slate-300 text-sm font-medium">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gold-400 font-bold text-lg">₹0 extra cost — All included in the price!</p>
        </div>
      </div>
    </section>
  );
};
