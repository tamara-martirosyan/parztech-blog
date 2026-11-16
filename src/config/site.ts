import { routes } from "@/lib/routes";

export const siteConfig = {
  name: "ParzTech",
  tagline: "Տեխնոլոգիաներ և ՍԻ (արհեստական բանականություն)՝ պարզ լեզվով",
  description:
    "ParzTech-ը հայալեզու բլոգ է տեխնոլոգիաների և արհեստական բանականության (ՍԻ) մասին՝ բացատրված պարզ ու հասկանալի։",
  alternateNames: ["Parz", "ParzTech", "Պարզ", "Պարզ Թեք"],
  locale: "hy_AM",
  themeColor: { light: "#fbfbfe", dark: "#090913" },
  author: "Թամարա Մարտիրոսյան",
  contact: {
    email: "info@parztech.am",
    telegram: "",
  },
  social: {
    instagram: "https://www.instagram.com/parztech/",
  },
  nav: [
    { title: "Գլխավոր", href: routes.home },
    { title: "Բլոգ", href: routes.blog },
    { title: "Իմ մասին", href: routes.about },
  ],
  footerNav: [{ title: "Համագործակցություն", href: routes.partners }],
} as const;

export const siteTitle = `${siteConfig.name} | ${siteConfig.tagline}`;

export const authorInitials = siteConfig.author
  .split(" ")
  .map((part) => part[0])
  .join("");
