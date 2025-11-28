import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BookViewerProps } from "../types";

/**
 * Main book viewer component with page-flip animation
 */
export function BookViewer({
  pages,
  initialPage = 0,
  className = "",
  onPageChange,
}: BookViewerProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = pages.length;

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const goToPage = (index: number) => {
    setCurrentPage(index);
    onPageChange?.(index);
  };

  return (
    <div
      className={`folio-container w-full h-screen flex flex-col items-center justify-center overflow-hidden relative ${className}`}
      style={{ backgroundColor: "#251612" }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-[#1a0f0c] to-[#0f0806]" />

      {/* 3D Scene Container */}
      <div className="relative w-full max-w-5xl aspect-[1.4/1] md:aspect-[2/1] flex items-center justify-center p-4 md:p-12 perspective-2000">
        {/* Book Wrapper */}
        <div className="relative w-full h-full transform-style-3d shadow-2xl bg-[#2a1810] rounded-lg">
          {/* Ring Binder */}
          <RingBinder />

          {/* Pages */}
          {pages.map((page, index) => {
            const isFlipped = index < currentPage;
            const zIndex = isFlipped ? index : totalPages - index;

            const handlePageClick = () => {
              if (!isFlipped && index === currentPage) handleNext();
              if (isFlipped && index === currentPage - 1) handlePrev();
            };

            const handlePageKeyDown = (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePageClick();
              }
            };

            return (
              <div
                key={page.id}
                role="button"
                tabIndex={0}
                aria-label={`Page ${index + 1}: ${page.title}`}
                className="absolute inset-0 w-1/2 h-full left-1/2 origin-left transition-transform duration-700 ease-in-out transform-style-3d cursor-pointer"
                style={{
                  zIndex,
                  transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
                }}
                onClick={handlePageClick}
                onKeyDown={handlePageKeyDown}
              >
                {/* Front of Page (Right side) */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-r-lg shadow-inner overflow-hidden border-l border-stone-200"
                  style={{ backgroundColor: "#FDF6E3" }}
                >
                  {page.front}
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-stone-400">
                    {index * 2 + 1}
                  </div>
                  <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Back of Page (Left side after flip) */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-l-lg shadow-inner overflow-hidden border-r border-stone-200"
                  style={{
                    backgroundColor: "#FDF6E3",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {page.back}
                  <div className="absolute bottom-4 left-4 text-[10px] font-mono text-stone-400">
                    {index * 2 + 2}
                  </div>
                  <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                </div>
              </div>
            );
          })}

          {/* Index Tabs */}
          {pages.map((page, index) => (
            <IndexTab
              key={page.id}
              page={page}
              index={index}
              activeIndex={currentPage}
              onClick={() => goToPage(index)}
            />
          ))}

          {/* Back Cover Shadow */}
          <div className="absolute inset-0 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] -z-10 bg-[#2a1810]" />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 flex gap-8 z-50">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="bg-[#00B0FF] hover:bg-[#40C4FF] disabled:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-xl shadow-[0_4px_0_#0080B0] active:shadow-none active:translate-y-1 transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="px-6 py-4 bg-stone-800/80 backdrop-blur rounded-xl text-white font-mono text-sm border border-stone-700 flex flex-col items-center">
          <span className="text-[10px] text-stone-400 mb-1">
            CURRENT SECTION
          </span>
          <span className="font-bold text-[#00B0FF]">
            {currentPage < totalPages
              ? (pages[currentPage]?.title ?? "Untitled")
              : "End"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="bg-[#00B0FF] hover:bg-[#40C4FF] disabled:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-xl shadow-[0_4px_0_#0080B0] active:shadow-none active:translate-y-1 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Global Styles for 3D */}
      <style>{`
        .perspective-2000 {
          perspective: 2000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #d6d3d1;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}

function RingBinder() {
  return (
    <div className="absolute left-1/2 top-0 bottom-0 w-8 -ml-4 z-50 flex flex-col justify-evenly py-8 pointer-events-none">
      {[1, 2, 3].map((i) => (
        <div key={i} className="relative w-full h-8">
          <div className="absolute top-1/2 left-1/2 -ml-6 -mt-4 w-12 h-8 rounded-full border-4 border-stone-400 shadow-md transform rotate-12" />
          <div className="absolute top-1/2 left-0 w-3 h-3 bg-[#251612] rounded-full -mt-1.5 ml-1 shadow-inner" />
          <div className="absolute top-1/2 right-0 w-3 h-3 bg-[#251612] rounded-full -mt-1.5 mr-1 shadow-inner" />
        </div>
      ))}
    </div>
  );
}

interface IndexTabProps {
  page: { tabColor?: string; tabLabel?: string; id: string };
  index: number;
  activeIndex: number;
  onClick: () => void;
}

function IndexTab({ page, index, activeIndex, onClick }: IndexTabProps) {
  const isFlipped = index < activeIndex;

  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-0 w-8 md:w-10 h-16 rounded-r-lg flex items-center justify-center text-[10px] font-bold tracking-widest cursor-pointer transition-all duration-500 hover:w-12 shadow-md border-l border-black/10 z-0"
      style={{
        top: `${80 + index * 70}px`,
        backgroundColor: page.tabColor || "#E0E0E0",
        color: "#2c1a16",
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        transform: isFlipped
          ? "translateX(-20px) scale(0.9)"
          : "translateX(100%)",
        opacity: isFlipped ? 0 : 1,
        zIndex: 100 - index,
      }}
    >
      {page.tabLabel || page.id}
    </button>
  );
}
