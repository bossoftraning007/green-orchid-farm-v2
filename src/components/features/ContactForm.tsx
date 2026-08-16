import React, { useState } from 'react';
import { MAIN_WHATSAPP_NUMBER, buildWhatsAppUrl } from '../../utils/whatsapp';
import { saveLead } from '../../utils/leadsStorage';

interface ContactFormProps {
  onShowToast: (msg: string) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      onShowToast('Please enter your name and phone number');
      return;
    }

    setIsSubmitting(true);
    saveLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      propertyInterest: 'General Inquiry',
      message: formData.message,
      source: 'contact_form',
    });

    const waMsg = `Hello R. Ganesh Sir,\n\nI submitted a contact form on your website.\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'Not provided'}\nMessage: ${formData.message || 'No message'}`;
    window.open(buildWhatsAppUrl(waMsg, MAIN_WHATSAPP_NUMBER), '_blank');
    onShowToast('Thank you! Redirecting to WhatsApp...');
    setFormData({ name: '', phone: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/40 relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-500/30">
            CONTACT US
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            Get In Touch
          </h2>
          <p className="text-base text-slate-400">
            Have questions? Fill out the form and we'll connect you directly with R. Ganesh Sir on WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-navy-900/50 border border-slate-800 rounded-3xl p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email (Optional)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          <div className="mb-8">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your requirements..."
              rows={4}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 font-black text-sm uppercase tracking-wider shadow-lg hover:from-gold-400 hover:to-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
          >
            {isSubmitting ? 'Submitting...' : 'Send Inquiry via WhatsApp'}
          </button>
        </form>
      </div>
    </section>
  );
};
