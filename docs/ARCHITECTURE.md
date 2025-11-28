# Architecture & Design Decisions

This document explains the architectural decisions and the "why" behind them.

## The Problem We're Solving

### Current Documentation Limitations

1. **Static and boring**: Most docs are plain text with no visual appeal
2. **Hard to navigate**: Long pages require endless scrolling
3. **No physical metaphor**: Digital docs lack the satisfying feel of physical books
4. **Complex setup**: Many doc generators require extensive configuration

### What Users Want

> "I want to write Markdown files, drop them in a folder, and get a beautiful interactive 3D book."

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
  Three.js 3D Book
```

**Key Decision: React + Three.js Component First**

- Start with a reusable React component powered by Three.js
- Real 3D rendering for immersive experience
- CLI and static site generation come later
- Allows integration into existing React apps

### Phase 2: CLI & Static Generation (v0.3.0)

```
docs/
├── index.md
├── 01-intro.md
└── 02-guide.md
        ↓
   [grimoire3d build]
        ↓
dist/
├── index.html
├── assets/
└── pages.json
```

**Key Decision: Zero-Config by Default**

- Auto-detect Markdown files in `docs/` folder
- Sensible defaults for everything
- Optional `grimoire.yml` for customization

## Technical Decisions

### 3D Rendering Engine

**Why Three.js + React Three Fiber?**

| Option | Pros | Cons |
|--------|------|------|
| CSS 3D | Native, lightweight | Flat rotation only, limited realism |
| Three.js | Full 3D, realistic materials, lighting | Larger bundle (~150KB) |
| Canvas 2D | Flexible | Manual rendering, no 3D depth |
| **Three.js** | ✓ Chosen | Best visual quality for book experience |

**Why Three.js over CSS 3D:**

- **Realistic page bending**: Pages curve during flip, not just rotate
- **Dynamic lighting**: Shadows and depth perception
- **Material system**: Leather, paper, cloth textures with PBR
- **Camera control**: View book from different angles
- **Future extensibility**: Particle effects, environment maps

**Implementation:**

- React Three Fiber for React integration
- drei helpers for common 3D patterns
- Custom page bend deformation shader
- Raycasting for click detection on 3D objects

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19+ | UI framework |
| Three.js | 0.170+ | 3D rendering engine |
| React Three Fiber | 9+ | React renderer for Three.js |
| @react-three/drei | 9+ | Useful 3D helpers |
| TypeScript | 5.9+ | Type safety |
| Vite | 7+ | Build tool & dev server |
| Tailwind CSS | 4+ | UI styling (navigation, overlays) |
| Vitest | 4+ | Testing |
| Biome | 2+ | Linting & formatting |
| Node.js | 22+ | Runtime |

### 3D Book Structure

```
Canvas (React Three Fiber)
├── PerspectiveCamera
├── Lights
│   ├── AmbientLight (base illumination)
│   ├── DirectionalLight (main light + shadows)
│   └── PointLight (accent, optional)
├── BookModel
│   ├── FrontCover (mesh + leather material)
│   ├── BackCover
│   ├── Spine
│   └── Pages[]
│       ├── PageMesh (with bend deformation)
│       ├── FrontTexture (React → Canvas → Texture)
│       └── BackTexture
├── IndexTabs[] (3D clickable tabs)
└── OrbitControls (optional camera control)
```

### Page Content Pipeline

```
React Component (PageContent.front/back)
        ↓
    [html2canvas or drei Html]
        ↓
    Canvas 2D / DOM overlay
        ↓
    Three.js Texture / Html component
        ↓
    3D Page Mesh
```

**Two approaches for content rendering:**

1. **Html component (drei)**: Simpler, content stays as DOM
2. **Canvas texture**: More performant, content baked to texture

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
# grimoire.yml (optional)
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
interface ThemeConfig {
  name: string;

  colors: {
    background: string;
    bookCover: string;
    paper: string;
    text: string;
    accent: string;
  };

  materials: {
    cover: {
      type: 'leather' | 'cloth' | 'metal';
      roughness: number;
      metalness: number;
    };
    paper: {
      roughness: number;
    };
  };

  lighting: {
    preset: 'warm' | 'cool' | 'dramatic';
    ambientIntensity: number;
    shadowSoftness: number;
  };

  animation: {
    flipDuration: number;
    easing: string;
  };
}
```

**Built-in themes:**
- `vintage-red` - Classic red leather grimoire
- `modern-dark` - Sleek dark mode with metallic accents
- `paper-white` - Minimal white, matte materials
- `forest-green` - Nature tones with wood textures
- `arcane-purple` - Mystical with glow effects

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
[React Three Fiber Canvas]
      ↓
[WebGL 3D Scene]
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
| Core component (excl. Three.js) | < 50KB gzipped |
| With Three.js peer deps | < 200KB gzipped |
| With Markdown | < 250KB gzipped |
| Full (Mermaid) | < 350KB gzipped |

### Rendering Optimization

- Lazy load page textures not in view
- Pre-render adjacent pages
- GPU-accelerated 3D transforms
- Minimize React re-renders with memo
- LOD (Level of Detail) for distant pages
- Texture atlasing where possible

### WebGL Compatibility

- Require WebGL 2.0 (supported by all modern browsers)
- Graceful fallback message for unsupported browsers
- Mobile support (iOS Safari, Chrome Android)
- Reduced motion support (prefers-reduced-motion)

## Future Considerations (Not in Scope)

These are intentionally **not** planned for v1.0:

1. **Real-time collaboration**: Complex, different product
2. **Backend/database**: Static-first approach
3. **WYSIWYG editor**: Focus on Markdown-based workflow
4. **VR/AR support**: Future consideration
5. **Advanced physics**: Cloth simulation for pages

## Questions This Document Should Answer

| Question | Answer |
|----------|--------|
| Why page-flip animation? | Physical metaphor makes docs engaging |
| Why Three.js over CSS 3D? | Realistic bending, lighting, materials |
| Why React Three Fiber? | Declarative 3D in React ecosystem |
| Why React 19? | Latest stable with improved performance |
| Why Vite 7? | Fast dev server, modern ESM-first |
| Why Tailwind v4? | CSS-first config, better performance |
| Why file-based? | Simple mental model like mkdocs |
| Why Markdown first? | Industry standard for docs |
| Works on GitHub Pages? | Yes, static HTML + client-side WebGL |
