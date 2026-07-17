'use server';

import { z } from 'zod';
import { validatedAction } from '@/lib/server-actions';
import { sendEmail, isMailkiteEmailConfigured } from '@/lib/mailkite-auth';

// Inquiry types offered in the contact form's select. Keep in sync with
// INQUIRY_TYPES in contact-form.tsx.
const INQUIRY_TYPES = ['general', 'sales', 'support', 'partnership', 'feedback'] as const;

const INQUIRY_LABELS: Record<(typeof INQUIRY_TYPES)[number], string> = {
  general: 'General inquiry',
  sales: 'Sales',
  support: 'Support',
  partnership: 'Partnership',
  feedback: 'Feedback',
};

const contactSchema = z.object({
  name: z.string().min(1, 'Please enter your name').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  inquiryType: z.enum(INQUIRY_TYPES, {
    errorMap: () => ({ message: 'Please choose an inquiry type' }),
  }),
  message: z.string().min(10, 'Please write a bit more (at least 10 characters)').max(5000),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const submitContact = validatedAction(contactSchema, async (data) => {
  const { name, email, inquiryType, message } = data;

  // Where the form lands. Set alongside your MailKite settings in .env.
  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    return { error: 'Contact form is not configured. Set CONTACT_EMAIL in your environment.', ...data };
  }

  if (!isMailkiteEmailConfigured()) {
    return { error: 'Email delivery is not configured. Set MAILKITE_API_KEY in your environment.', ...data };
  }

  const label = INQUIRY_LABELS[inquiryType];
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  const result = await sendEmail({
    to,
    // Must be an address on a verified MailKite domain. Overridable via CONTACT_FROM.
    from: process.env.CONTACT_FROM || 'noreply@mailkite.dev',
    // Replies go straight to the person who filled out the form.
    replyTo: email,
    subject: `[${label}] New contact from ${name}`,
    html: `
      <h2>New ${escapeHtml(label.toLowerCase())} message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Inquiry type:</strong> ${escapeHtml(label)}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
    text: `New ${label} message\n\nName: ${name}\nEmail: ${email}\nInquiry type: ${label}\n\nMessage:\n${message}`,
  });

  if (!result.ok) {
    return { error: 'Something went wrong sending your message. Please try again.', ...data };
  }

  return { success: "Thanks for reaching out — we'll get back to you soon." };
});
