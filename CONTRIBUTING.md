# Contributing to folio

Thank you for your interest in contributing!

## Development Setup

### Prerequisites

- Node.js 22+
- pnpm 10+ (recommended) or npm

### Clone and Setup

```bash
git clone https://github.com/kkm-horikawa/folio.git
cd folio

# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### Running Development Server

```bash
pnpm dev
```

### Running Tests

```bash
pnpm test
```

### Code Style

We use [Biome v2](https://biomejs.dev/) for linting and formatting:

```bash
# Lint
pnpm lint

# Format
pnpm format

# Check everything (lint + format)
pnpm check

# Fix everything
pnpm check:fix
```

## Coding Standards

### Overview

| Item | Standard |
|------|----------|
| Linter/Formatter | [Biome v2](https://biomejs.dev/) |
| Line length | 80 characters |
| Quotes | Double quotes `"` |
| Type hints | Required for public APIs |
| Docstrings | JSDoc style |
| TypeScript | 5.9+ with strict mode |
| React | 19+ with functional components |

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase | `BookViewer`, `PageFlip` |
| Function | camelCase | `handlePageFlip`, `renderContent` |
| Variable | camelCase | `currentPage`, `totalPages` |
| Constant | UPPER_SNAKE_CASE | `MAX_PAGES`, `DEFAULT_THEME` |
| Type/Interface | PascalCase | `PageContent`, `ThemeConfig` |
| File (component) | PascalCase | `BookViewer.tsx` |
| File (utility) | camelCase | `parseMarkdown.ts` |

### Type Annotations

Required for:
- All function parameters and return types
- Public component props
- Exported functions

```typescript
interface PageProps {
  id: string;
  title: string;
  content: ReactNode;
}

function renderPage(props: PageProps): JSX.Element {
  // ...
}
```

### Import Order

Biome automatically organizes imports. Use `node:` prefix for Node.js built-ins:

```typescript
// 1. Node.js built-ins (with node: prefix)
import { resolve } from "node:path";

// 2. External packages
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

// 3. Internal modules
import { BookViewer } from "./components/BookViewer";
import type { PageContent } from "./types";
```

### Testing Standards

#### Test Structure

```
tests/
├── setup.ts              # Test setup
├── components/
│   └── BookViewer.test.tsx
├── hooks/
│   └── usePageFlip.test.ts
└── utils/
    └── parseMarkdown.test.ts
```

#### Test Naming

```typescript
describe("BookViewer", () => {
  it("renders the cover page by default", () => {
    // ...
  });

  it("flips to next page when clicking right side", () => {
    // ...
  });

  it("does not flip past the last page", () => {
    // ...
  });
});
```

#### Running Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run specific test file
pnpm test tests/components/BookViewer.test.tsx
```

## Project Structure

```
folio/
├── src/
│   ├── index.ts              # Main exports
│   ├── components/
│   │   ├── index.ts
│   │   └── BookViewer.tsx
│   ├── hooks/
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   └── styles/
│       └── main.css
├── tests/
├── docs/
│   ├── ARCHITECTURE.md
│   └── GLOSSARY.md
├── package.json
├── tsconfig.json
├── vite.config.ts
└── biome.json
```

## Branch Strategy

We use a modified Git Flow strategy:

### Branch Types

| Branch | Purpose | Base | Merge To |
|--------|---------|------|----------|
| `main` | Production releases | - | - |
| `develop` | Development integration | `main` | `main` |
| `feature/*` | New features | `develop` | `develop` |
| `fix/*` | Bug fixes | `develop` | `develop` |
| `hotfix/*` | Urgent production fixes | `main` | `main` + `develop` |
| `chore/*` | Maintenance, config | `develop` | `develop` |
| `docs/*` | Documentation updates | `develop` | `develop` |

### Branch Naming

```
feature/<issue-number>-<short-description>
fix/<issue-number>-<short-description>
hotfix/<issue-number>-<short-description>
chore/<short-description>
docs/<short-description>
```

Examples:
- `feature/1-book-viewer-component`
- `fix/12-page-flip-animation`
- `chore/update-dependencies`
- `docs/api-reference`

## Development Workflow

### For External Contributors (Fork-based)

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/<your-username>/folio.git
   cd folio
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/kkm-horikawa/folio.git
   ```
4. **Create a branch from develop**:
   ```bash
   git fetch upstream
   git checkout -b feature/<issue-number>-<description> upstream/develop
   ```
5. **Make changes, commit, and push to your fork**:
   ```bash
   git push origin feature/<issue-number>-<description>
   ```
6. **Create a Pull Request** from your fork to `upstream/develop`

### For Maintainers (Direct)

1. Check existing issues before starting work
2. Create a branch from `develop`
3. Make changes and test
4. Push and create PR to `develop`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: add page flip animation"
git commit -m "fix: resolve Safari backface-visibility issue"
git commit -m "docs: update installation guide"
git commit -m "chore: update dependencies"
```

## Questions?

Open an [Issue](https://github.com/kkm-horikawa/folio/issues) for questions or discussions.
