import { Footer } from '@/components/Footer';
import { SiteHeader } from '@/components/SiteHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <SiteHeader />
      {children}
      <Footer />
    </section>
  );
}
