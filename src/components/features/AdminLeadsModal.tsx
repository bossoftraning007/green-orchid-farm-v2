import React, { useState, useEffect } from 'react';
import { Download, Trash2, ShieldCheck } from 'lucide-react';
import { getLeads, exportLeadsCSV } from '../../utils/leadsStorage';
import type { Lead } from '../../types';

export const AdminLeadsModal: React.FC<{ isOpen: boolean; onClose: () => void; onShowToast: (msg: string) => void }> = ({ isOpen, onClose, onShowToast }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const admin = sessionStorage.getItem('farmhouse_admin');
      setIsAdmin(admin === 'true');
      setLeads(getLeads());
    }
  }, [isOpen]);

  const handleAdminLogin = () => {
    const password = prompt('Enter admin password:');
    if (password === 'ganesh123') {
      sessionStorage.setItem('farmhouse_admin', 'true');
      setIsAdmin(true);
      setLeads(getLeads());
    } else {
      onShowToast('Invalid password');
    }
  };

  const handleClearLeads = () => {
    if (confirm('Are you sure you want to clear all leads?')) {
      localStorage.removeItem('farmhouse_leads');
      setLeads([]);
      onShowToast('All leads cleared');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Admin - Leads Dashboard</h2>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {!isAdmin ? (
            <div className="text-center py-12">
              <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">Admin access required to view leads</p>
              <button onClick={handleAdminLogin} className="px-6 py-3 rounded-xl bg-gold-500 text-navy-950 font-bold text-sm hover:bg-gold-400 transition-colors">
                Admin Login
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-slate-400 text-sm">{leads.length} leads found</p>
                <div className="flex gap-3">
                  <button onClick={exportLeadsCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors">
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                  <button onClick={handleClearLeads} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="py-3 px-4 text-slate-400 font-medium">Name</th>
                      <th className="py-3 px-4 text-slate-400 font-medium">Phone</th>
                      <th className="py-3 px-4 text-slate-400 font-medium">Interest</th>
                      <th className="py-3 px-4 text-slate-400 font-medium">Source</th>
                      <th className="py-3 px-4 text-slate-400 font-medium">AI Score</th>
                      <th className="py-3 px-4 text-slate-400 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="py-3 px-4 text-white">{lead.name}</td>
                        <td className="py-3 px-4 text-slate-300">{lead.phone}</td>
                        <td className="py-3 px-4 text-slate-300">{lead.propertyInterest}</td>
                        <td className="py-3 px-4 text-slate-300">{lead.source}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${lead.aiScore && lead.aiScore >= 70 ? 'bg-emerald-500/20 text-emerald-400' : lead.aiScore && lead.aiScore >= 40 ? 'bg-gold-500/20 text-gold-400' : 'bg-slate-700 text-slate-300'}`}>
                            {lead.aiScore ?? 0}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
