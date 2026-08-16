export const MAIN_WHATSAPP_NUMBER = '919505903371';
export const DIRECT_PHONE_NUMBER = '9505903371';

export function buildWhatsAppUrl(message: string, phoneNumber: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
