import { ContactForm } from './contact-form';
import { Mail } from 'lucide-react';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with our team — sales, support, partnerships, and more.',
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)]">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Get in touch
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-base text-[var(--color-muted)]">
            Have a question about sales, support, or a partnership? Pick an inquiry type,
            send us a note, and we&apos;ll get back to you.
          </p>
        </div>

        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
