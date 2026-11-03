import { WifiOff } from "lucide-react";
import type { Metadata } from "next";

import { StatusMessage } from "@/components/StatusMessage";

const title = "Ինտերնետ կապ չկա";

// Served by the service worker (public/sw.js) for pages not saved for offline
export const metadata: Metadata = {
  title,
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <StatusMessage
      visual={<WifiOff className="size-20 text-brand-violet" />}
      title={title}
      description="Այս էջը դեռ պահված չէ անցանց ընթերցման համար։ Ստուգեք կապը և փորձեք կրկին, իսկ մինչ այդ կարող եք կարդալ արդեն բացված հոդվածները։"
    />
  );
}
