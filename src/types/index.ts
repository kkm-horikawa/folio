import type { ReactNode } from "react";

/**
 * Content for a single page in the book.
 *
 * Each page has two sides: front (visible when the page is on the right)
 * and back (visible when the page is flipped to the left).
 *
 * @example
 * ```tsx
 * const page: PageContent = {
 *   id: "intro",
 *   title: "Introduction",
 *   front: <IntroContent />,
 *   back: <IntroDetails />,
 *   tabColor: "#E57373",
 *   tabLabel: "Intro",
 * };
 * ```
 */
export interface PageContent {
  /** Unique identifier for the page */
  id: string;
  /** Page title displayed in navigation */
  title: string;
  /** Content shown on the front (right side) of the page */
  front: ReactNode;
  /** Content shown on the back (left side after flipping) */
  back: ReactNode;
  /** Tab color for index tabs (CSS color string) */
  tabColor?: string;
  /** Short label for the tab (max 12 chars recommended) */
  tabLabel?: string;
}

/**
 * Props for the BookViewer component.
 *
 * The BookViewer renders an interactive 3D book with realistic page-flip
 * animations powered by Three.js.
 *
 * @example
 * ```tsx
 * <BookViewer
 *   pages={pages}
 *   initialPage={0}
 *   onPageChange={(index) => console.log(`Page: ${index}`)}
 *   cameraControls={true}
 *   ambientLight={0.5}
 *   showShadows={true}
 * />
 * ```
 */
export interface BookViewerProps {
  /** Array of pages to display in the book */
  pages: PageContent[];
  /** Initial page index to display (default: 0) */
  initialPage?: number;
  /** Custom CSS class for the container element */
  className?: string;
  /** Callback fired when the current page changes */
  onPageChange?: (pageIndex: number) => void;
  /**
   * Enable orbit camera controls for viewing the book from different angles.
   * When disabled, the camera shows a fixed top-down reading view.
   * @default false
   */
  cameraControls?: boolean;
  /**
   * Ambient light intensity for the scene (0-1).
   * Higher values make the book brighter overall.
   * @default 0.5
   */
  ambientLight?: number;
  /**
   * Enable shadow rendering for realistic depth perception.
   * May impact performance on lower-end devices.
   * @default true
   */
  showShadows?: boolean;
}

/**
 * Configuration for 3D book materials using PBR (Physically Based Rendering).
 *
 * Controls the appearance of the book cover and pages in the 3D scene.
 *
 * @example
 * ```ts
 * const materials: BookMaterialConfig = {
 *   coverColor: "#8B0000",
 *   paperColor: "#FDF6E3",
 *   coverRoughness: 0.8,
 *   coverMetalness: 0.0,
 * };
 * ```
 */
export interface BookMaterialConfig {
  /**
   * Color of the book cover (CSS color string).
   * @default "#8B0000" (dark red leather)
   */
  coverColor: string;
  /**
   * Color of the paper pages (CSS color string).
   * @default "#FDF6E3" (warm white)
   */
  paperColor: string;
  /**
   * Roughness of the cover material (0-1).
   * 0 = mirror-like, 1 = completely rough/matte.
   * @default 0.8
   */
  coverRoughness: number;
  /**
   * Metalness of the cover material (0-1).
   * 0 = non-metallic (leather, cloth), 1 = fully metallic.
   * @default 0.0
   */
  coverMetalness: number;
}

/**
 * Configuration for Grimoire3D.
 *
 * Used by the CLI tools to configure the documentation site.
 */
export interface GrimoireConfig {
  /** Document title displayed in the browser tab */
  title: string;
  /** Theme name or custom theme object */
  theme?: string | ThemeConfig;
  /** Pages configuration - array of file paths or "auto" for auto-detection */
  pages?: string[] | "auto";
  /** Output directory for build (default: "dist") */
  outDir?: string;
}

/**
 * Theme configuration for visual customization.
 *
 * Defines the color scheme for the book viewer UI elements.
 *
 * @example
 * ```ts
 * const darkTheme: ThemeConfig = {
 *   background: "#1a1a2e",
 *   bookCover: "#16213e",
 *   paper: "#e8e8e8",
 *   text: "#ffffff",
 *   accent: "#00b4d8",
 * };
 * ```
 */
export interface ThemeConfig {
  /** Background color of the viewer container (CSS color string) */
  background: string;
  /** Book cover color (CSS color string) */
  bookCover: string;
  /** Paper/page background color (CSS color string) */
  paper: string;
  /** Primary text color (CSS color string) */
  text: string;
  /** Accent color for buttons and interactive elements (CSS color string) */
  accent: string;
}
