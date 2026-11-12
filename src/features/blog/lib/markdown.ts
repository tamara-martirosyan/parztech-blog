import "server-only";

import type { Root } from "hast";
import { toString } from "hast-util-to-string";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";

export type Heading = { id: string; text: string; level: 2 | 3 };

declare module "vfile" {
  interface DataMap {
    headings: Heading[];
  }
}

/** Collects h2/h3 after rehype-slug, so TOC ids always match the rendered HTML */
function rehypeCollectHeadings() {
  return (tree: Root, file: VFile) => {
    const headings: Heading[] = [];
    visit(tree, "element", (node) => {
      if (
        (node.tagName === "h2" || node.tagName === "h3") &&
        node.properties.id
      ) {
        headings.push({
          id: String(node.properties.id),
          text: toString(node),
          level: node.tagName === "h2" ? 2 : 3,
        });
      }
    });
    file.data.headings = headings;
  };
}

const SAME_TAB_HREF = /^(#|mailto:|tel:)/i;

function rehypeLinksNewTab() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "a") return;
      const href = String(node.properties.href ?? "");
      if (!href || SAME_TAB_HREF.test(href)) return;
      node.properties.target = "_blank";
      node.properties.rel = ["noopener", "noreferrer"];
    });
  };
}

// Raw HTML in markdown is dropped (remark-rehype default), so output is safe to inject
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeLinksNewTab)
  .use(rehypeCollectHeadings)
  .use(rehypePrettyCode, {
    theme: { light: "github-light", dark: "github-dark-dimmed" },
    keepBackground: false,
  })
  .use(rehypeStringify);

export async function renderMarkdown(markdown: string) {
  const file = await processor.process(markdown);
  return {
    html: String(file),
    headings: file.data.headings ?? [],
  };
}
