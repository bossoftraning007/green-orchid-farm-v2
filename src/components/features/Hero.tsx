import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { VideoBackground } from '../common/VideoBackground';
import { MAIN_WHATSAPP_NUMBER, buildWhatsAppUrl } from '../../utils/whatsapp';

interface HeroProps {
  onOpenBookVisit: () => void;
  onOpenEmi: () => void;
}

const CountUp: React.FC<{
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}> = ({ end, duration = 2, suffix = '', prefix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(progress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenBookVisit, onOpenEmi }) => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-navy-950">
      <VideoBackground
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4"
        poster="/posters/farmhouse.jpeg"
        overlayClassName="bg-gradient-to-b from-navy-950/80 via-navy-950/70 to-navy-950/90"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gold-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-navy-800/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-navy-900/90 border border-gold-500/40 text-gold-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 shadow-2xl backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            <span>GREEN ORCHID FARM LAND • KOTHUR, HYDERABAD</span>
            <span className="bg-gold-500 text-navy-950 font-black px-2.5 py-0.5 rounded-full text-[10px]">GOVT APPROVED</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-wider leading-[1.15] mb-8"
          >
            Own Your Private <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500">
              Luxury Farmhouse
            </span> In Hyderabad
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl mx-auto text-slate-200 text-base sm:text-xl font-normal leading-[1.7] mb-10"
          >
            Government Approved 1BHK Luxury Farmhouses starting at just{' '}
            <span className="text-gold-400 font-extrabold underline decoration-gold-500 decoration-2 underline-offset-4">
              ₹21,00,000/-
            </span>{' '}
            with 121 sq.yards plot area &amp;{' '}
            <span className="text-emerald-400 font-semibold">2 Years FREE Maintenance</span> near Kothur &amp; JP Dargah.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16"
          >
            <button
              onClick={onOpenBookVisit}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 text-navy-950 font-black text-sm uppercase tracking-wider shadow-2xl animate-glow-pulse hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              <Calendar className="w-5 h-5 text-navy-950" />
              Book Site Visit Now
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href={buildWhatsAppUrl("Hi R. Ganesh Sir, I am interested in Green Orchid Farm Land 1BHK Farmhouse offer.", MAIN_WHATSAPP_NUMBER)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-navy-800 hover:bg-navy-700 text-white border border-gold-500/30 font-bold text-sm uppercase tracking-wider shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
            >
              WhatsApp Inquiry
            </a>

            <button
              onClick={onOpenEmi}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-navy-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-navy-800 font-semibold text-xs uppercase tracking-wider transition-all"
            >
              Calculate EMI
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto"
          >
            <div className="bg-navy-900/90 border border-gold-500/20 p-5 rounded-2xl backdrop-blur-md shadow-xl hover:border-gold-500/40 transition-colors">
              <div className="font-serif text-3xl sm:text-4xl font-black text-gold-400">
                <CountUp end={5.5} decimals={1} suffix=" Acres" />
              </div>
              <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Total Area</div>
            </div>

            <div className="bg-navy-900/90 border border-gold-500/20 p-5 rounded-2xl backdrop-blur-md shadow-xl hover:border-gold-500/40 transition-colors">
              <div className="font-serif text-3xl sm:text-4xl font-black text-white">
                <CountUp end={72} decimals={0} suffix=" Units" />
              </div>
              <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Total Plots</div>
            </div>

            <div className="bg-navy-900/90 border border-gold-500/20 p-5 rounded-2xl backdrop-blur-md shadow-xl hover:border-gold-500/40 transition-colors">
              <div className="font-serif text-3xl sm:text-4xl font-black text-emerald-400">
                <CountUp end={2} decimals={0} suffix=" Years" />
              </div>
              <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">FREE Maintenance</div>
            </div>

            <div className="bg-navy-900/90 border border-gold-500/20 p-5 rounded-2xl backdrop-blur-md shadow-xl hover:border-gold-500/40 transition-colors">
              <div className="font-serif text-3xl sm:text-4xl font-black text-gold-400">
                <CountUp end={21} decimals={0} prefix="₹" suffix=" Lakhs" />
              </div>
              <div className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Offer Price</div>
            </div>
          </motion.div>

          <div className="mt-10 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Location: Near Kothur, JP Dargah, NH-44 Bangalore Highway, Hyderabad</span>
          </div>
        </div>
      </VideoBackground>
    </section>
  );
};
