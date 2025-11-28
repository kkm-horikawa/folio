# Glossary

Key terminology used in this project.

## Core Concepts

### BookViewer

The main React component that renders the interactive book.

```tsx
<BookViewer pages={pages} />
```

**Analogy**: Like a digital flip-book or photo album.

### Page

A single sheet in the book with two sides (front and back).

```typescript
interface PageContent {
  id: string;
  title: string;
  front: ReactNode;  // Right side (summary)
  back: ReactNode;   // Left side (details)
}
```

### Front / Back

- **Front**: The right-hand page visible before flipping
- **Back**: The left-hand page visible after flipping

Think of it like a real book:
```
     BACK    |    FRONT
  (details)  |  (summary)
     ←flip   |   flip→
```

### Tab

The colored index tab on the right edge of pages, like dividers in a notebook.

### Theme

A set of colors and styles that define the book's appearance.

```typescript
interface Theme {
  background: string;  // "#251612"
  bookCover: string;   // "#D32F2F"
  paper: string;       // "#FDF6E3"
  text: string;        // "#2c1a16"
  accent: string;      // "#00B0FF"
}
```

## File Structure

### folio.yml

Configuration file for the documentation site.

```yaml
title: "My Docs"
theme: "vintage-red"
pages:
  - index.md
  - guide.md
```

### docs/

Default directory for Markdown content files.

## CSS 3D Concepts

### transform-style: preserve-3d

CSS property that allows child elements to exist in 3D space.

### backface-visibility: hidden

Hides the back of an element when it's rotated away from the viewer. Essential for two-sided pages.

### perspective

Defines how far the viewer is from the 3D scene. Higher values = less dramatic 3D effect.

```css
.container {
  perspective: 2000px;
}
```

## Commands

### folio serve

Start a development server with hot reload.

```bash
npx folio serve
```

### folio build

Generate static HTML/JS files for deployment.

```bash
npx folio build
```

## Relationships

```
User Files                   Folio Components
───────────────────────────────────────────────────
folio.yml            →       FolioConfig
docs/*.md            →       PageContent[]
PageContent[]        →       BookViewer
BookViewer           →       3D Animated Book
```

## Naming Conventions

### Components

| Name | Purpose |
|------|---------|
| `BookViewer` | Main container component |
| `PageFlip` | Individual page with flip animation |
| `RingBinder` | Decorative binder rings |
| `IndexTab` | Clickable navigation tab |

### Types

| Name | Purpose |
|------|---------|
| `PageContent` | Data for a single page |
| `BookViewerProps` | Props for BookViewer |
| `FolioConfig` | Configuration options |
| `ThemeConfig` | Theme colors |

## Abbreviations

| Abbrev | Full Name |
|--------|-----------|
| SSG | Static Site Generator |
| 3D | Three-Dimensional |
| CSS | Cascading Style Sheets |
| MVP | Minimum Viable Product |

## Version History

| Version | Codename | Focus |
|---------|----------|-------|
| v0.1.0 | MVP | Basic BookViewer component |
| v0.2.0 | Content | Markdown + Mermaid rendering |
| v0.3.0 | CLI | Static site generation |
| v0.4.0 | Themes | Theme customization |
