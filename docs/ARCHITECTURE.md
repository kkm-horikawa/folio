# Architecture & Design Decisions

This document explains the architectural decisions and the "why" behind them.

## The Problem We're Solving

### Current Documentation Limitations

1. **Static and boring**: Most docs are plain text with no visual appeal
2. **Hard to navigate**: Long pages require endless scrolling
3. **No physical metaphor**: Digital docs lack the satisfying feel of physical books
4. **Complex setup**: Many doc generators require extensive configuration

### What Users Want

> "I want to write Markdown files, drop them in a folder, and get a beautiful interactive book."

## Core Architecture

### Phase 1: Component Library (v0.1.0)

```
User's Markdown Files
        ↓
    [Parser]
        ↓
    Page Objects
        ↓
   [BookViewer]
        ↓
  3D Animated Book
```

**Key Decision: React Component First**

- Start with a reusable React component
- CLI and static site generation come later
- Allows integration into existing React apps

### Phase 2: CLI & Static Generation (v0.3.0)

```
docs/
├── index.md
├── 01-intro.md
└── 02-guide.md
        ↓
   [folio build]
        ↓
dist/
├── index.html
├── assets/
└── pages.json
```

**Key Decision: Zero-Config by Default**

- Auto-detect Markdown files in `docs/` folder
- Sensible defaults for everything
- Optional `folio.yml` for customization

## Technical Decisions

### 3D Page Flip Animation

**Why CSS 3D Transforms?**

| Option | Pros | Cons |
|--------|------|------|
| CSS 3D | Native, performant, no library | Limited to basic transforms |
| Three.js | Full 3D control | Heavy bundle, overkill |
| Canvas 2D | Flexible | Manual rendering, performance |
| **CSS 3D** | ✓ Chosen | Balance of simplicity and effect |

**Implementation:**
- `transform-style: preserve-3d` for 3D space
- `rotateY()` for page flip
- `backface-visibility: hidden` for two-sided pages
- CSS transitions for smooth animation

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19+ | UI framework |
| TypeScript | 5.9+ | Type safety |
| Vite | 7+ | Build tool & dev server |
| Tailwind CSS | 4+ | Styling |
| Vitest | 4+ | Testing |
| Biome | 2+ | Linting & formatting |
| Node.js | 22+ | Runtime |

### Content Rendering

**Supported Formats:**

| Format | Priority | Library |
|--------|----------|---------|
| Markdown | P0 | react-markdown |
| HTML | P0 | Native / sanitize |
| Mermaid | P1 | mermaid.js |
| Code | P1 | shiki / prism |

**Key Decision: Markdown-first, HTML-capable**

- Most documentation is Markdown
- Allow HTML for advanced layouts
- Mermaid for diagrams is essential for tech docs

### File-Based Routing

Inspired by mkdocs:

```yaml
# folio.yml (optional)
pages:
  - index.md        # Cover
  - intro.md        # Page 1
  - guide.md        # Page 2
```

**Auto-detection rules:**
1. Look for `docs/` directory
2. Find all `*.md` files
3. Sort alphabetically (prefix with numbers for order)
4. First file becomes cover page

### Theming System

```typescript
interface Theme {
  background: string;   // Body background
  bookCover: string;    // Book cover color
  paper: string;        // Page background
  text: string;         // Text color
  accent: string;       // Buttons, links
}
```

**Built-in themes:**
- `vintage-red` - Classic red leather
- `modern-dark` - Dark mode
- `paper-white` - Minimal white
- `forest-green` - Nature tones

## Data Flow

### Rendering a Page

```
[Markdown File]
      ↓
  [Parser]
      ↓
[PageContent Object]
      ↓
[BookViewer Component]
      ↓
[3D Page Elements]
```

### Page Structure

Each "sheet" has two sides:
- **Front (Right)**: Summary/title view
- **Back (Left)**: Detailed content

This mirrors real books where you see two pages at once.

## Performance Considerations

### Bundle Size Goals

| Target | Max Size |
|--------|----------|
| Core component | < 50KB gzipped |
| With Markdown | < 100KB gzipped |
| Full (Mermaid) | < 200KB gzipped |

### Rendering Optimization

- Lazy load pages not in view
- Pre-render adjacent pages
- Use CSS transforms (GPU accelerated)
- Minimize React re-renders

## Future Considerations (Not in Scope)

These are intentionally **not** planned for v1.0:

1. **Real-time collaboration**: Complex, different product
2. **Backend/database**: Static-first approach
3. **WYSIWYG editor**: Focus on Markdown-based workflow
4. **Mobile-first**: Desktop experience is primary

## Questions This Document Should Answer

| Question | Answer |
|----------|--------|
| Why page-flip animation? | Physical metaphor makes docs engaging |
| Why React 19? | Latest stable with improved performance |
| Why Vite 7? | Fast dev server, modern ESM-first |
| Why Tailwind v4? | CSS-first config, better performance |
| Why not Three.js? | Overkill for 2D page flip effect |
| Why file-based? | Simple mental model like mkdocs |
| Why Markdown first? | Industry standard for docs |
