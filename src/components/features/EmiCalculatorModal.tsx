import React, { useState } from 'react';

interface EmiCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const properties = [
  { name: '1BHK Luxury Farmhouse', price: 2100000 },
];

export const EmiCalculatorModal: React.FC<EmiCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [selectedProperty, setSelectedProperty] = useState(properties[0].name);
  const [downPayment, setDownPayment] = useState(25);
  const [tenure, setTenure] = useState(24);
  const [interestRate] = useState(9);

  const property = properties.find((p) => p.name === selectedProperty) || properties[0];
  const downPaymentAmount = (property.price * downPayment) / 100;
  const loanAmount = property.price - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfMonths = tenure;
  const emi = monthlyRate > 0 ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1) : 0;
  const totalPayment = emi * numberOfMonths + downPaymentAmount;
  const totalInterest = totalPayment - property.price;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">EMI Calculator</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Select Property</label>
            <select value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500">
              {properties.map((p) => (
                <option key={p.name} value={p.name}>{p.name} - ₹{p.price.toLocaleString()}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Down Payment: {downPayment}%</label>
            <input type="range" min={10} max={50} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full accent-gold-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tenure: {tenure} months</label>
            <input type="range" min={12} max={84} step={12} value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full accent-gold-500" />
          </div>

          <div className="bg-navy-950 rounded-2xl p-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Property Price</span>
              <span className="text-white font-semibold">₹{property.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Down Payment ({downPayment}%)</span>
              <span className="text-white font-semibold">₹{Math.round(downPaymentAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Loan Amount</span>
              <span className="text-white font-semibold">₹{Math.round(loanAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Interest Rate</span>
              <span className="text-white font-semibold">{interestRate}% per annum</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between">
              <span className="text-slate-300 font-medium">Monthly EMI</span>
              <span className="text-gold-400 font-black text-lg">₹{Math.round(emi).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Total Interest</span>
              <span className="text-white font-semibold">₹{Math.round(totalInterest).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
