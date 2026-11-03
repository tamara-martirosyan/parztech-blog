import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";

import type { StatusMessageProps } from "./types";

/** Centered message with a way back home, shared by the 404 and offline pages */
export default function StatusMessage({
  visual,
  title,
  description,
}: StatusMessageProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      {visual}
      <h1 className="mt-6 text-2xl font-bold">{title}</h1>
      <p className="mt-3 text-muted-foreground">{description}</p>
      <Link
        href={routes.home}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "mt-8 rounded-full",
        )}
      >
        <ArrowLeft />
        Վերադառնալ գլխավոր էջ
      </Link>
    </div>
  );
}
