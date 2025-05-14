export interface FormData {
  id?: string;
  name: string;
  address: string;
  pin: string;
  phone: string;
}

export interface FormError {
  name?: string;
  address?: string;
  pin?: string;
  phone?: string;
}