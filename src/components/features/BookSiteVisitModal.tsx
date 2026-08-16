import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { saveLead } from '../../utils/leadsStorage';

interface BookSiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

const timeSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];

export const BookSiteVisitModal: React.FC<BookSiteVisitModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', timeSlot: '', pickupLocation: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.timeSlot) {
      onShowToast('Please fill all required fields');
      return;
    }

    saveLead({
      name: formData.name,
      phone: formData.phone,
      propertyInterest: 'Site Visit',
      message: `Date: ${formData.date}, Time: ${formData.timeSlot}, Pickup: ${formData.pickupLocation}`,
      source: 'site_visit',
    });

    onShowToast('Site visit booked! We will confirm shortly.');
    setFormData({ name: '', phone: '', date: '', timeSlot: '', pickupLocation: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Book FREE Site Visit</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Name *</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Phone Number *</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Preferred Date *</label>
            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Time Slot *</label>
            <select value={formData.timeSlot} onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500">
              <option value="">Select time slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Pickup Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input type="text" value={formData.pickupLocation} onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })} placeholder="e.g., Shamshabad Airport, ORR Exit 16" className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-gold-500" />
            </div>
          </div>
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-navy-950 font-black text-sm uppercase tracking-wider shadow-lg hover:from-gold-400 hover:to-amber-400 transition-all">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};
