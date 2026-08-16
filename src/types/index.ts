export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  propertyInterest: string;
  message?: string;
  source: 'contact_form' | 'whatsapp' | 'site_visit' | 'chat';
  aiScore?: number;
  createdAt: number;
}

export interface Property {
  id: string;
  title: string;
  type: string;
  price: number;
  originalPrice?: number;
  plotSize: string;
  houseSize: string;
  tag?: string;
  features: string[];
  image: string;
}

export interface SiteVisit {
  id: string;
  name: string;
  phone: string;
  date: string;
  timeSlot: string;
  pickupLocation: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: number;
}
