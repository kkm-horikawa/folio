# grimoire3d

[![npm version](https://badge.fury.io/js/grimoire3d.svg)](https://badge.fury.io/js/grimoire3d)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A 3D magical book documentation generator. Transform your docs into an interactive grimoire with realistic page-flip animations.

## What is this?

Grimoire3D transforms your Markdown documentation into an interactive 3D book. Perfect for:

- Project documentation
- Design specifications
- Technical notes
- Portfolios
- Tutorials

## Features

- Realistic 3D page-flip animation
- Markdown rendering
- HTML support
- Mermaid diagram support (planned)
- Multiple themes
- Static site generation
- Zero-config setup

## Installation

```bash
npm install grimoire3d
# or
pnpm add grimoire3d
# or
yarn add grimoire3d
```

## Quick Start

### 1. Create your docs directory

```
my-project/
├── grimoire.yml       # Configuration (optional)
└── docs/
    ├── index.md       # Cover page
    ├── 01-overview.md
    ├── 02-features.md
    └── assets/
        └── diagram.png
```

### 2. Write your content

```markdown
<!-- docs/index.md -->
# My Project

Welcome to the documentation.

## Overview

This is an amazing project...
```

### 3. Start the dev server

```bash
npx grimoire3d serve
```

### 4. Build for production

```bash
npx grimoire3d build
```

## Configuration

Create a `grimoire.yml` file in your project root:

```yaml
title: "My Project Documentation"
theme: "vintage-red"  # or "modern-dark", "paper-white"
pages:
  - index.md
  - 01-overview.md
  - 02-features.md
# Omit 'pages' to auto-detect all .md files
```

## Using as a React Component

```tsx
import { BookViewer } from "grimoire3d/components";

const pages = [
  {
    id: "cover",
    title: "Cover",
    front: <CoverPage />,
    back: <AboutPage />,
    tabColor: "#E57373",
    tabLabel: "Cover",
  },
  // ... more pages
];

function App() {
  return <BookViewer pages={pages} />;
}
```

## Themes

| Theme | Description |
|-------|-------------|
| `vintage-red` | Classic red leather book cover |
| `modern-dark` | Sleek dark mode |
| `paper-white` | Clean minimal design |
| `forest-green` | Nature-inspired |

## Roadmap

- [ ] v0.1.0 - MVP with basic page-flip and Markdown support
- [ ] v0.2.0 - Mermaid diagrams and code highlighting
- [ ] v0.3.0 - CLI for static site generation
- [ ] v0.4.0 - Theme customization and plugins

## Documentation

- [Architecture & Design Decisions](docs/ARCHITECTURE.md)
- [Glossary of Terms](docs/GLOSSARY.md)
- [Contributing Guide](CONTRIBUTING.md)

## Requirements

- Node.js 22+
- React 19+

## License

MIT License. See [LICENSE](LICENSE) for details.

## Inspiration

- Ancient grimoires and magical tomes
- Vintage technical manuals
- React component libraries
