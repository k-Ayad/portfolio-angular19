// Contact Form Data Interface
export interface ContactFormData {
  fullName: string;
  subject: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  message: string;
}

// EmailJS Response Interface
export interface EmailJSResponse {
  status: number;
  text: string;
}

// Country Code Interface
export interface CountryCode {
  code: string;
  name: string;
  flag: string;
}
