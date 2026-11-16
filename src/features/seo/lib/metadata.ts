import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { OG_SIZE } from "@/features/seo/lib/og";
import { routes } from "@/lib/routes";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of the "%s | ParzTech" template */
  absoluteTitle?: boolean;
  /** Social preview image path; defaults to the site-wide card */
  image?: string;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    tags: string[];
    section: string;
  };
};

/**
 * Builds per-page metadata. Next.js merges metadata shallowly, so each page
 * sets its own canonical URL and Open Graph block through this helper.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  image,
  article,
}: PageMetadataInput): Metadata {
  const images = [
    { url: image ?? routes.defaultOgImage, ...OG_SIZE, alt: title },
  ];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": routes.rss },
    },
    openGraph: {
      type: article ? "article" : "website",
      url: path,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images,
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        tags: article.tags,
        section: article.section,
        authors: [siteConfig.author],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
