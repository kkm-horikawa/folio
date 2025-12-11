import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BookViewer } from "../../src/components/BookViewer";

const mockPages = [
  {
    id: "page1",
    title: "Page 1",
    front: <div>Front Content 1</div>,
    back: <div>Back Content 1</div>,
    tabLabel: "P1",
  },
  {
    id: "page2",
    title: "Page 2",
    front: <div>Front Content 2</div>,
    back: <div>Back Content 2</div>,
    tabLabel: "P2",
  },
];

describe("BookViewer", () => {
  it("renders the book viewer container", () => {
    render(<BookViewer pages={mockPages} />);
    expect(document.querySelector(".grimoire-container")).toBeInTheDocument();
  });

  it("displays the first page title by default", () => {
    render(<BookViewer pages={mockPages} />);
    expect(screen.getByText("Page 1")).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(<BookViewer pages={mockPages} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it("renders index tabs for each page", () => {
    render(<BookViewer pages={mockPages} />);
    expect(screen.getByLabelText("Go to Page 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to Page 2")).toBeInTheDocument();
  });

  it("renders Three.js canvas", () => {
    render(<BookViewer pages={mockPages} />);
    expect(document.querySelector("canvas")).toBeInTheDocument();
  });
});
