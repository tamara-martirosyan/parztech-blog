import { Analytics } from "@vercel/analytics/next";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      {/* Only public pages are tracked, so admin visits don't skew the numbers */}
      <Analytics />
      <ServiceWorkerRegistrar />
    </>
  );
}
