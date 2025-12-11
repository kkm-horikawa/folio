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
        <h1>Welcome to Grimoire3D</h1>
        <p>
          Grimoire3D is a 3D magical book documentation generator. Transform
          your docs into an interactive grimoire with realistic page-flip
          animations.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Realistic 3D page-flip animations</li>
          <li>Markdown support</li>
          <li>Mermaid diagrams</li>
          <li>Multiple themes</li>
        </ul>
      </div>
    ),
    back: (
      <div className="folio-page-content">
        <h2>Getting Started</h2>
        <p>Install Grimoire3D via npm:</p>
        <pre>
          <code>npm install grimoire3d</code>
        </pre>
        <p>Then create your documentation files and run:</p>
        <pre>
          <code>npx grimoire3d build</code>
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
        <p>Create a grimoire.yml in your project root:</p>
        <pre>
          <code>{`title: My Docs
pages: auto
theme: vintage-red`}</code>
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
        <p>Grimoire3D comes with several built-in themes:</p>
        <ul>
          <li>vintage-red (default)</li>
          <li>modern-dark</li>
          <li>paper-white</li>
          <li>forest-green</li>
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
