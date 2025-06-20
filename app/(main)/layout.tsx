import { NavbarPremium } from "@/components/navbar-premium";
import { FooterPremium } from "@/components/footer-premium";
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from "@/components/cookie-consent";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavbarPremium />
      <main className="flex-1">{children}</main>
      <FooterPremium />
      <Toaster />
      <CookieConsent />
    </div>
  );
}