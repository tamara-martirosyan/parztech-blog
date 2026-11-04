import {
  CalendarDays,
  CheckCircle2,
  Globe,
  Languages,
  Mail,
  Newspaper,
  PenLine,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";

import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { SocialIcon } from "@/features/share/components/SocialIcon";
import { pageMetadata } from "@/features/seo/lib/metadata";
import { TELEGRAM_NETWORK } from "@/features/telegram/constants";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";

export const metadata: Metadata = pageMetadata({
  title: "Համագործակցություն",
  description:
    "Համագործակցեք Parz Tech-ի հետ՝ հովանավորություն, միջոցառումների մեդիա-գործընկերություն, հովանավորված հոդվածներ և հայերեն տեխնոլոգիական տեքստեր։",
  path: routes.partners,
});

const formats = [
  {
    icon: Newspaper,
    title: "Ուրբաթ օրվա ամփոփման հովանավորություն",
    text: "Շաբաթվա գլխավոր տեխնոլոգիական նորությունները՝ մեկ ամփոփման մեջ։ Հովանավորը նշվում է ամփոփման մեջ, և ձեր անունը տեսնում են բոլոր ընթերցողները։",
    tint: "bg-brand-violet/12 text-brand-violet",
  },
  {
    icon: CalendarDays,
    title: "Միջոցառումների մեդիա-գործընկերություն",
    text: "Ձեր կոնֆերանսի, հաքաթոնի կամ հանդիպման նախնական հայտարարություն և հետագա լուսաբանում։",
    tint: "bg-brand-pink/12 text-brand-pink",
  },
  {
    icon: PenLine,
    title: "Հովանավորված հոդված",
    text: "Հոդված ձեր արտադրանքի, ծառայության կամ նախաձեռնության մասին՝ գրված պարզ ու հասկանալի, Parz Tech-ի ոճով։",
    tint: "bg-brand-apricot/18 text-brand-apricot",
  },
  {
    icon: Languages,
    title: "Հայերեն տեխնոլոգիական տեքստեր",
    text: "Տեքստեր ձեր կայքի, արտադրանքի կամ բլոգի համար՝ գրված պարզ ու գրագետ հայերենով։",
    tint: "bg-brand-cyan/15 text-brand-cyan",
  },
];

const websiteServices = [
  {
    icon: Globe,
    title: "Կայք զրոյից",
    text: "Դիզայնից մինչև գործարկում, ձեր բիզնեսի կարիքներին համապատասխան։",
    tint: "bg-brand-violet/12 text-brand-violet",
  },
  {
    icon: Wrench,
    title: "Ուղղումներ և բարելավումներ",
    text: "Կշտկենք սխալները, կարագացնենք կայքը, կդարձնենք այն հարմար հեռախոսով օգտվելու համար և կավելացնենք նոր բաժիններ։",
    tint: "bg-brand-emerald/15 text-brand-emerald",
  },
];

const principles = [
  "Հովանավորված նյութերը միշտ նշվում են «Գովազդ» նշիչով։",
  "Հրապարակում եմ միայն ստուգված տեղեկություն։",
  "Չեմ գովազդում այն, ինչին ինքս չեմ վստահում։",
];

const { email, telegram } = siteConfig.contact;
const mailtoHref = (subject: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}`;
const partnershipEmailHref = mailtoHref("Համագործակցություն Parz Tech-ի հետ");
const websiteOrderEmailHref = mailtoHref("Կայքի պատվեր");

// Wraps instead of overflowing on the narrowest phones (long label, unbreakable email)
const emailButtonClass = cn(
  buttonVariants({ size: "lg" }),
  "h-auto min-h-11 max-w-full rounded-full px-5 py-2.5 whitespace-normal shadow-lg shadow-primary/25 [overflow-wrap:anywhere] sm:px-6",
);

export default function PartnersPage() {
  return (
    <div className="relative isolate overflow-x-clip">
      <div className="absolute -top-32 left-1/2 -z-10 h-96 w-200 -translate-x-1/2 rounded-full bg-linear-to-r from-brand-violet/25 via-brand-pink/20 to-brand-apricot/25 blur-3xl" />
      <div className="mx-auto max-w-4xl px-4 pt-16 sm:px-6 md:pt-24">
        <header className="space-y-5 text-center">
          <p className="text-sm font-semibold text-primary">
            Համագործակցություն
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-balance md:text-5xl">
            Եկեք <span className="text-gradient">միասին</span> աշխատենք
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {siteConfig.name}-ը պատմում է ՍԻ-ի, տեխնոլոգիաների և հայկական IT-ի
            մասին՝ պարզ հայերենով, ոչ մասնագետների համար։ Եթե ձեր ընկերությունը
            կամ միջոցառումը ուզում է հասնել այս լսարանին, ուրախ կլինեմ
            համագործակցել։
          </p>
          <a href={partnershipEmailHref} className={emailButtonClass}>
            <Mail />
            Առաջարկել համագործակցություն
          </a>
        </header>

        <section className="mt-20">
          <SectionHeading eyebrow="Լսարանը" title="Ովքեր են կարդում" />
          <Card>
            <CardContent className="flex gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-emerald/15 text-brand-emerald">
                <Sparkles className="size-5" />
              </div>
              <p className="leading-relaxed text-muted-foreground">
                Parz Tech-ի ընթերցողները հետաքրքրասեր մարդիկ են, ովքեր ուզում են
                հասկանալ տեխնոլոգիաները՝ առանց բարդ տերմինների։ Բլոգը նոր է և
                արագ աճում է. ամսական ընթերցողների և Telegram բաժանորդների թվերը
                կհրապարակեմ այստեղ, հենց վիճակագրությունը կուտակվի։
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mt-20">
          <SectionHeading
            eyebrow="Ինչ եմ առաջարկում"
            title="Համագործակցության ձևերը"
            description="Պայմանները՝ պայմանավորվածությամբ։"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {formats.map((format) => (
              <FeatureCard key={format.title} {...format} />
            ))}
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            title="Կայքերի պատրաստում"
            description="Նոր կայքի կարիք ունե՞ք, թե՞ ուզում եք բարելավել եղածը։ ParzTech-ը կարող է օգնել։"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            {websiteServices.map((service) => (
              <FeatureCard key={service.title} {...service} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href={websiteOrderEmailHref} className={emailButtonClass}>
              <Mail />
              Պատվիրել
            </a>
          </div>
        </section>

        <section className="mt-20">
          <SectionHeading
            eyebrow="Վստահություն"
            title="Իմ կանոնները"
            description="Ընթերցողների վստահությունը Parz Tech-ի ամենաարժեքավոր բանն է, և այն պահպանելու համար գործում են այս կանոնները։"
          />
          <ul className="space-y-3">
            {principles.map((principle) => (
              <li
                key={principle}
                className="flex items-start gap-3 rounded-2xl border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-emerald" />
                <span className="leading-relaxed">{principle}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="partners-contact"
          className="mt-20 rounded-3xl border bg-card px-5 py-8 text-center sm:p-12"
        >
          <h2
            id="partners-contact"
            className="text-2xl font-bold tracking-tight text-balance md:text-3xl"
          >
            Եկեք քննարկենք
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Գրեք ինձ՝ պատմեք ձեր գաղափարի մասին, և միասին կգտնենք հարմար
            ձևաչափը։
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={partnershipEmailHref} className={emailButtonClass}>
              <Mail />
              {email}
            </a>
            {telegram && (
              <a
                href={`https://t.me/${telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-full px-6",
                )}
              >
                <SocialIcon network={TELEGRAM_NETWORK} />@{telegram}
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
