# folio

[![npm version](https://badge.fury.io/js/folio.svg)](https://badge.fury.io/js/folio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A page-flip animated documentation generator. Write beautiful docs like turning pages of a book.

## What is this?

Folio transforms your Markdown documentation into an interactive book with realistic page-flip animations. Perfect for:

- Project documentation
- Design specifications
- Technical notes
- Portfolios
- Tutorials

## Features

- Page-flip animation with 3D effects
- Markdown rendering
- HTML support
- Mermaid diagram support (planned)
- Multiple themes
- Static site generation
- Zero-config setup

## Installation

```bash
npm install folio
# or
pnpm add folio
# or
yarn add folio
```

## Quick Start

### 1. Create your docs directory

```
my-project/
├── folio.yml          # Configuration (optional)
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
npx folio serve
```

### 4. Build for production

```bash
npx folio build
```

## Configuration

Create a `folio.yml` file in your project root:

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
import { BookViewer } from "folio/components";

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

- Vintage technical manuals and recipe books
- WordPress Gutenberg's Synced Patterns
- React component libraries
