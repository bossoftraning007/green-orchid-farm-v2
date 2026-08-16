import React from 'react';
import { FileText, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LegalDocSection: React.FC = () => {
  const docs = [
    { title: 'Pattadar Passbook', desc: 'Dharani portal integrated passbook', status: 'Available' },
    { title: 'Freehold Title Deed', desc: 'Clear title with full ownership rights', status: 'Verified' },
    { title: 'Site Layout Plan', desc: 'Approved 5.5 acres layout with 72 units', status: 'Available' },
  ];

  return (
    <section id="legal" className="py-20 bg-navy-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800">
            LEGAL & TRANSPARENT
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            100% Legal & Verified
          </h2>
          <p className="text-base text-slate-400">
            Complete transparency with all legal documents. Your investment is secure and verified.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {docs.map((doc, idx) => (
            <div
              key={idx}
              className="bg-navy-900/50 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/40 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-sm mb-1">{doc.title}</h3>
                  <p className="text-slate-400 text-xs mb-3">{doc.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    {doc.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-navy-900/50 border border-gold-500/30 rounded-2xl px-6 py-4">
            <ShieldCheck className="w-6 h-6 text-gold-400" />
            <p className="text-sm text-slate-300">
              <span className="font-bold text-white">Spot Registration Available</span> — Same day assistance with Pattadar Passbook within 15 days
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
