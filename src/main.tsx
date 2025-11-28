import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BookViewer } from "./components/BookViewer";
import type { PageContent } from "./types";
import "./styles/main.css";

const samplePages: PageContent[] = [
  {
    id: "intro",
    title: "Introduction",
    tabColor: "#FF6B6B",
    tabLabel: "INTRO",
    front: (
      <div className="folio-page-content">
        <h1>Welcome to Folio</h1>
        <p>
          Folio is a page-flip animated documentation generator. Write beautiful
          docs like turning pages of a book.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Beautiful page-flip animations</li>
          <li>Markdown support</li>
          <li>Mermaid diagrams</li>
          <li>Responsive design</li>
        </ul>
      </div>
    ),
    back: (
      <div className="folio-page-content">
        <h2>Getting Started</h2>
        <p>Install Folio via npm:</p>
        <pre>
          <code>npm install folio</code>
        </pre>
        <p>Then create your documentation files and run:</p>
        <pre>
          <code>npx folio build</code>
        </pre>
      </div>
    ),
  },
  {
    id: "usage",
    title: "Usage",
    tabColor: "#4ECDC4",
    tabLabel: "USAGE",
    front: (
      <div className="folio-page-content">
        <h1>Basic Usage</h1>
        <p>Create a folio.config.js in your project root:</p>
        <pre>
          <code>{`export default {
  title: 'My Docs',
  pages: 'auto',
  theme: 'classic'
}`}</code>
        </pre>
      </div>
    ),
    back: (
      <div className="folio-page-content">
        <h2>Page Structure</h2>
        <p>Each page has a front and back side:</p>
        <ul>
          <li>
            <strong>Front</strong>: Right side of the page (visible by default)
          </li>
          <li>
            <strong>Back</strong>: Left side (visible after flipping)
          </li>
        </ul>
        <blockquote>
          Click on a page or use the navigation buttons to flip pages.
        </blockquote>
      </div>
    ),
  },
  {
    id: "themes",
    title: "Themes",
    tabColor: "#FFE66D",
    tabLabel: "THEMES",
    front: (
      <div className="folio-page-content">
        <h1>Customizing Themes</h1>
        <p>Folio comes with several built-in themes:</p>
        <ul>
          <li>Classic (default)</li>
          <li>Dark</li>
          <li>Sepia</li>
          <li>Modern</li>
        </ul>
      </div>
    ),
    back: (
      <div className="folio-page-content">
        <h2>Custom Theme</h2>
        <p>Create your own theme:</p>
        <pre>
          <code>{`theme: {
  background: '#251612',
  bookCover: '#d32f2f',
  paper: '#fdf6e3',
  text: '#2c1a16',
  accent: '#00b0ff'
}`}</code>
        </pre>
      </div>
    ),
  },
];

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BookViewer pages={samplePages} />
    </StrictMode>
  );
}
