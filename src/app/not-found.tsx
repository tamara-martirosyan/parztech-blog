import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { StatusMessage } from "@/components/StatusMessage";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <StatusMessage
          visual={<p className="text-gradient text-8xl font-extrabold">404</p>}
          title="Էջը չի գտնվել"
          description="Կարծես այս էջը գոյություն չունի կամ տեղափոխվել է։"
        />
      </main>
      <SiteFooter />
    </>
  );
}
