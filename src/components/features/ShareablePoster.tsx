import React, { useState } from 'react';
import { Download, Share2 } from 'lucide-react';

export const ShareablePoster: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const templates = [
    { title: '1BHK Farmhouse Offer', price: '₹21 Lakhs', tag: 'BEST DEAL', color: 'from-gold-400 to-amber-500' },
    { title: '2BHK Villa Farmhouse', price: '₹35 Lakhs', tag: 'PREMIUM', color: 'from-emerald-400 to-teal-500' },
    { title: 'Limited Time Offer', price: 'Save ₹3 Lakhs', tag: 'HOT DEAL', color: 'from-orange-400 to-red-500' },
  ];

  const template = templates[selectedTemplate];

  const handleShare = () => {
    const text = `🏡 ${template.title}\n💰 Starting at ${template.price}\n📍 Green Orchid Farm Land, Kothur, Hyderabad\n✅ HMDA Approved | 2 Years FREE Maintenance\n📞 Call: +91 9505903371\n🔗 https://own-your-farmhouse.vercel.app`;
    if (navigator.share) {
      navigator.share({ title: 'Green Orchid Farm Land', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-slate-900/40 relative border-t border-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-500/30">
            SHARE & EARN
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            Shareable Offer Poster
          </h2>
          <p className="text-base text-slate-400">
            Create and share eye-catching posters to introduce your friends and buyers to Green Orchid Farm Land.
          </p>
        </div>

        <div className="bg-navy-900/50 border border-slate-800 rounded-3xl p-8 md:p-10">
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {templates.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTemplate(idx)}
                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  selectedTemplate === idx
                    ? 'bg-gold-500 text-navy-950 shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>

          <div className={`relative bg-gradient-to-br ${template.color} rounded-3xl p-8 md:p-12 text-center mb-8 shadow-2xl`}>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
              {template.tag}
            </div>
            <div className="text-6xl mb-4">🏡</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{template.title}</h3>
            <p className="text-4xl md:text-5xl font-black text-white mb-4">{template.price}</p>
            <p className="text-white/90 text-sm mb-6">Green Orchid Farm Land • Kothur, Hyderabad</p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/80">
              <span className="bg-white/20 px-3 py-1 rounded-full">HMDA Approved</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">2 Years FREE Maintenance</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Gated Community</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg hover:scale-105"
            >
              <Share2 className="w-5 h-5" />
              Share This Poster
            </button>
            <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-slate-800 text-slate-200 font-bold text-sm hover:bg-slate-700 transition-all">
              <Download className="w-5 h-5" />
              Download Image
            </button>
          </div>

          {showThankYou && (
            <div className="mt-6 text-center text-emerald-400 text-sm font-medium animate-pulse">
              ✅ Poster details copied to clipboard!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
