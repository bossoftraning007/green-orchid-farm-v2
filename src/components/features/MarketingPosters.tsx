import React from 'react';
import { Download, Share2 } from 'lucide-react';

interface MarketingPostersProps {
  onShowToast: (msg: string) => void;
}

export const MarketingPosters: React.FC<MarketingPostersProps> = ({ onShowToast }) => {
  const posters = [
    {
      id: 'farmhouse-main',
      title: 'Main Farmhouse Marketing Poster',
      description: '1BHK Luxury Farmhouse at ₹21 Lakhs offer banner.',
      image: '/posters/farmhouse.jpeg',
      downloadUrl: '/posters/farmhouse.jpeg',
    },
    {
      id: 'weekend-house',
      title: 'Weekend Houses Discount Poster',
      description: 'Weekend Farmhouse Land discount banner (₹21L offer).',
      image: '/posters/weekend-houses.jpeg',
      downloadUrl: '/posters/weekend-houses.jpeg',
    },
  ];

  const handleShare = (posterTitle: string) => {
    const text = `Check out this amazing farmhouse offer in Hyderabad! ${posterTitle} - Green Orchid Farm Land. https://own-your-farmhouse.vercel.app`;
    if (navigator.share) {
      navigator.share({ title: posterTitle, text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      onShowToast('Poster link copied to clipboard!');
    }
  };

  return (
    <section className="py-20 bg-navy-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800">
            MARKETING MEDIA ASSETS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            Downloadable Marketing Posters
          </h2>
          <p className="text-base text-slate-400">
            Share these high-resolution banners on WhatsApp Status, Instagram, and Facebook.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posters.map((poster) => (
            <div key={poster.id} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
              <div className="bg-slate-950 p-4 flex items-center justify-center">
                <img src={poster.image} alt={poster.title} className="w-full h-auto rounded-2xl object-cover border border-slate-800 max-h-80" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{poster.title}</h3>
                <p className="text-xs text-slate-400 mb-6">{poster.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  <a href={poster.downloadUrl} download className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95">
                    <Download className="w-4 h-4" />
                    Download Poster
                  </a>
                  <button onClick={() => handleShare(poster.title)} className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors">
                    <Share2 className="w-4 h-4 text-emerald-400" />
                    Share Link
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
