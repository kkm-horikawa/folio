import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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
  {
    id: "page3",
    title: "Page 3",
    front: <div>Front Content 3</div>,
    back: <div>Back Content 3</div>,
    tabLabel: "P3",
  },
];

describe("BookViewer", () => {
  describe("rendering", () => {
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
      expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
      expect(screen.getByLabelText("Next page")).toBeInTheDocument();
    });

    it("renders index tabs for each page", () => {
      render(<BookViewer pages={mockPages} />);
      expect(screen.getByLabelText("Go to Page 1")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to Page 2")).toBeInTheDocument();
      expect(screen.getByLabelText("Go to Page 3")).toBeInTheDocument();
    });

    it("renders Three.js canvas", () => {
      render(<BookViewer pages={mockPages} />);
      expect(document.querySelector("canvas")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<BookViewer pages={mockPages} className="custom-class" />);
      expect(document.querySelector(".custom-class")).toBeInTheDocument();
    });

    it("starts at initialPage when provided", () => {
      render(<BookViewer pages={mockPages} initialPage={1} />);
      expect(screen.getByText("Page 2")).toBeInTheDocument();
    });
  });

  describe("navigation", () => {
    it("navigates to next page when next button is clicked", () => {
      render(<BookViewer pages={mockPages} />);
      const nextButton = screen.getByLabelText("Next page");

      fireEvent.click(nextButton);

      expect(screen.getByText("Page 2")).toBeInTheDocument();
    });

    it("navigates to previous page when prev button is clicked", () => {
      render(<BookViewer pages={mockPages} initialPage={1} />);
      const prevButton = screen.getByLabelText("Previous page");

      fireEvent.click(prevButton);

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });

    it("disables prev button on first page", () => {
      render(<BookViewer pages={mockPages} />);
      const prevButton = screen.getByLabelText("Previous page");

      expect(prevButton).toBeDisabled();
    });

    it("disables next button on last page", () => {
      render(<BookViewer pages={mockPages} initialPage={3} />);
      const nextButton = screen.getByLabelText("Next page");

      expect(nextButton).toBeDisabled();
    });

    it("navigates to specific page when index tab is clicked", () => {
      render(<BookViewer pages={mockPages} />);
      const tab = screen.getByLabelText("Go to Page 3");

      fireEvent.click(tab);

      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });

    it("shows End when navigated past last page", () => {
      render(<BookViewer pages={mockPages} initialPage={2} />);
      const nextButton = screen.getByLabelText("Next page");

      fireEvent.click(nextButton);

      expect(screen.getByText("End")).toBeInTheDocument();
    });
  });

  describe("callbacks", () => {
    it("calls onPageChange when navigating to next page", () => {
      const onPageChange = vi.fn();
      render(<BookViewer pages={mockPages} onPageChange={onPageChange} />);
      const nextButton = screen.getByLabelText("Next page");

      fireEvent.click(nextButton);

      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it("calls onPageChange when navigating to previous page", () => {
      const onPageChange = vi.fn();
      render(
        <BookViewer
          pages={mockPages}
          initialPage={1}
          onPageChange={onPageChange}
        />
      );
      const prevButton = screen.getByLabelText("Previous page");

      fireEvent.click(prevButton);

      expect(onPageChange).toHaveBeenCalledWith(0);
    });

    it("calls onPageChange when clicking index tab", () => {
      const onPageChange = vi.fn();
      render(<BookViewer pages={mockPages} onPageChange={onPageChange} />);
      const tab = screen.getByLabelText("Go to Page 2");

      fireEvent.click(tab);

      expect(onPageChange).toHaveBeenCalledWith(1);
    });
  });

  describe("props", () => {
    it("renders with cameraControls enabled", () => {
      render(<BookViewer pages={mockPages} cameraControls />);
      expect(document.querySelector(".grimoire-container")).toBeInTheDocument();
    });

    it("renders with custom ambientLight", () => {
      render(<BookViewer pages={mockPages} ambientLight={0.8} />);
      expect(document.querySelector(".grimoire-container")).toBeInTheDocument();
    });

    it("renders with shadows disabled", () => {
      render(<BookViewer pages={mockPages} showShadows={false} />);
      expect(document.querySelector(".grimoire-container")).toBeInTheDocument();
    });
  });

  describe("mode toggle", () => {
    it("renders mode toggle button", () => {
      render(<BookViewer pages={mockPages} />);
      expect(
        screen.getByLabelText("Switch to explore mode")
      ).toBeInTheDocument();
    });

    it("starts in reading mode by default", () => {
      render(<BookViewer pages={mockPages} />);
      expect(screen.getByText("Reading")).toBeInTheDocument();
    });

    it("toggles to explore mode when button is clicked", () => {
      render(<BookViewer pages={mockPages} />);
      const toggleButton = screen.getByLabelText("Switch to explore mode");

      fireEvent.click(toggleButton);

      expect(screen.getByText("Explore")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Switch to reading mode")
      ).toBeInTheDocument();
    });

    it("toggles back to reading mode when clicked again", () => {
      render(<BookViewer pages={mockPages} />);
      const toggleButton = screen.getByLabelText("Switch to explore mode");

      fireEvent.click(toggleButton);
      fireEvent.click(screen.getByLabelText("Switch to reading mode"));

      expect(screen.getByText("Reading")).toBeInTheDocument();
    });

    it("enables OrbitControls when cameraControls prop is true even in reading mode", () => {
      render(<BookViewer pages={mockPages} cameraControls />);
      // In reading mode with cameraControls=true, should still show Reading label
      expect(screen.getByText("Reading")).toBeInTheDocument();
      // Canvas should be rendered (OrbitControls is inside)
      expect(document.querySelector("canvas")).toBeInTheDocument();
    });

    it("shows explore mode UI after toggle with cameraControls enabled", () => {
      render(<BookViewer pages={mockPages} cameraControls />);
      const toggleButton = screen.getByLabelText("Switch to explore mode");

      fireEvent.click(toggleButton);

      expect(screen.getByText("Explore")).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("handles empty pages array", () => {
      render(<BookViewer pages={[]} />);
      expect(document.querySelector(".grimoire-container")).toBeInTheDocument();
    });

    it("handles page without tabLabel using id", () => {
      const pagesWithoutTabLabel = [
        {
          id: "intro",
          title: "Introduction",
          front: <div>Content</div>,
          back: <div>Back</div>,
        },
      ];
      render(<BookViewer pages={pagesWithoutTabLabel} />);
      expect(screen.getByText("intro")).toBeInTheDocument();
    });

    it("does not navigate beyond bounds", () => {
      render(<BookViewer pages={mockPages} />);
      const prevButton = screen.getByLabelText("Previous page");

      // Try to go before first page
      fireEvent.click(prevButton);
      fireEvent.click(prevButton);

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });
});
