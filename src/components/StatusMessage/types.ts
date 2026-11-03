import type { ReactNode } from "react";

export type StatusMessageProps = {
  /** Large visual above the title, e.g. an error code or icon */
  visual: ReactNode;
  title: string;
  description: string;
};
