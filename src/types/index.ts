import type { ReactNode } from "react";

/**
 * Content for a single page in the book
 */
export interface PageContent {
  /** Unique identifier for the page */
  id: string;
  /** Page title displayed in navigation */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Content shown on the front (right side) of the page */
  front: ReactNode;
  /** Content shown on the back (left side after flipping) */
  back: ReactNode;
  /** Tab color for index tabs */
  tabColor?: string;
  /** Short label for the tab (max 12 chars recommended) */
  tabLabel?: string;
}

/**
 * Props for the BookViewer component
 */
export interface BookViewerProps {
  /** Array of pages to display */
  pages: PageContent[];
  /** Initial page index (default: 0) */
  initialPage?: number;
  /** Custom CSS class for the container */
  className?: string;
  /** Callback when page changes */
  onPageChange?: (pageIndex: number) => void;
}

/**
 * Configuration for Folio
 */
export interface FolioConfig {
  /** Document title */
  title: string;
  /** Theme name or custom theme object */
  theme?: string | ThemeConfig;
  /** Pages configuration - array of file paths or auto-detect */
  pages?: string[] | "auto";
  /** Output directory for build */
  outDir?: string;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  /** Background color */
  background: string;
  /** Book cover color */
  bookCover: string;
  /** Paper/page color */
  paper: string;
  /** Text color */
  text: string;
  /** Button/accent color */
  accent: string;
}
