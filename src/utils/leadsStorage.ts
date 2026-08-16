import type { Lead } from '../types';

const LEADS_KEY = 'farmhouse_leads';

export function getLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(LEADS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading leads', e);
  }
  return [];
}

export function saveLead(lead: Omit<Lead, 'id' | 'createdAt' | 'aiScore'>): void {
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    aiScore: calculateAIScore(lead),
  };
  leads.unshift(newLead);
  try {
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error('Error saving lead', e);
  }
}

export function calculateAIScore(lead: Partial<Lead>): number {
  let score = 0;
  if (lead.name && lead.name !== 'Not provided') score += 20;
  if (lead.phone && lead.phone !== 'Not provided') score += 30;
  if (lead.email) score += 15;
  if (lead.propertyInterest) score += 15;
  if (lead.message) score += 10;
  if (lead.source === 'site_visit') score += 10;
  else if (lead.source === 'whatsapp') score += 5;
  return Math.min(score, 100);
}

export function exportLeadsCSV(): void {
  const leads = getLeads();
  if (!leads.length) return;

  const headers = ['Name', 'Phone', 'Email', 'Property Interest', 'Source', 'AI Score', 'Date'];
  const rows = leads.map((l) => [
    l.name,
    l.phone,
    l.email || '',
    l.propertyInterest,
    l.source,
    l.aiScore ?? '',
    new Date(l.createdAt).toLocaleString(),
  ]);

  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
