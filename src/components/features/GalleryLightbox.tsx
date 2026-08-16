import React, { useState } from 'react';
import { X } from 'lucide-react';

interface GalleryLightboxProps {
  images?: string[];
}

const defaultImages = [
  '/posters/farmhouse.jpeg',
  '/posters/weekend-houses.jpeg',
];

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ images = defaultImages }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 bg-slate-900/40 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-500/30">
            GALLERY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            Project Gallery
          </h2>
          <p className="text-base text-slate-400">
            Take a visual tour of Green Orchid Farm Land and imagine your future weekend getaway.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(img)}
              className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800 hover:border-gold-500/50 transition-all hover:scale-[1.02]"
            >
              <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img src={selectedImage} alt="Full size" className="relative max-w-full max-h-[90vh] rounded-2xl shadow-2xl" />
        </div>
      )}
    </section>
  );
};
