import React, { useState } from 'react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Is the property legally approved?',
      answer: 'Yes, 100% HMDA approved with spot registration available. You get Pattadar Passbook from Dharani portal within 15 working days. All plots are freehold with clear titles.',
    },
    {
      question: 'What is the payment plan?',
      answer: 'We offer a flexible 24-month payment plan. Just 25% booking amount and the balance can be paid in monthly EMIs. Bank loan assistance is also available.',
    },
    {
      question: 'What amenities are included?',
      answer: 'Premium amenities include resort-style swimming pool, club house, cricket net, visitor rooms, children play area, 24/7 security, gated compound wall, and landscaped park.',
    },
    {
      question: 'Is there free maintenance?',
      answer: 'Yes! We offer 2 years completely FREE maintenance covering security, water supply, organic tree care, common area upkeep, and basic structural repairs.',
    },
    {
      question: 'How do I book a site visit?',
      answer: 'You can book a FREE site visit through our website form, WhatsApp, or by calling us directly. We also provide complimentary pickup & drop from Shamshabad Airport and ORR Exit 16.',
    },
    {
      question: 'What furniture is included?',
      answer: 'Every farmhouse comes fully furnished with 8 premium items: King-size bed, ceiling fans, dining table, LED TV, refrigerator, barbecue grill, sofa set, and garden chairs - all at zero extra cost.',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-navy-950 relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-800">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-navy-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-gold-500/30 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-white font-semibold text-sm pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gold-400 shrink-0 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
