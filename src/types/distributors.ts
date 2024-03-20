export type Distributor = {
  id: string;
  created_at: Date;
  postalCode: string;
  city: string;
  state: string;
  company: string;
  distributor: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  country: string;
  region?: string;
};
