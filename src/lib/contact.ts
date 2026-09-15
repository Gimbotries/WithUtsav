export const BRAND = 'WorkwithUtsav';
export const PHONE_DISPLAY = '+91 9667246278';
export const PHONE_TEL = '+919667246278';
export const EMAIL = 'productiveabhinav@gmail.com';
export const WHATSAPP_URL = `https://wa.me/919667246278`;

export function quoteMailto(fields: {
  name: string;
  clinic: string;
  email: string;
  phone: string;
  city: string;
  specialty: string;
  message: string;
}) {
  const subject = `Clinic website quote — ${fields.clinic || fields.name}`;
  const body = [
    'Hello WorkwithUtsav,',
    '',
    'I would like a quote for a clinic website + booking + WhatsApp setup.',
    '',
    `Name: ${fields.name}`,
    `Clinic: ${fields.clinic}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `City: ${fields.city}`,
    `Specialty: ${fields.specialty}`,
    '',
    'Details:',
    fields.message || 'Please share packages and next steps.',
    '',
    'Thank you.',
  ].join('\n');

  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
