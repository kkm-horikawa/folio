import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ChevronLeft, ChevronRight, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import type { BookViewerProps } from "../types";
import { BookModel } from "./BookModel";

/**
 * Main book viewer component with Three.js-powered 3D rendering.
 *
 * Renders an interactive 3D book with realistic page-flip animations
 * using React Three Fiber.
 *
 * @example
 * ```tsx
 * <BookViewer
 *   pages={pages}
 *   initialPage={0}
 *   onPageChange={(index) => console.log(`Page: ${index}`)}
 * />
 * ```
 */
export function BookViewer({
  pages,
  initialPage = 0,
  className = "",
  onPageChange,
  cameraControls = false,
  ambientLight = 0.5,
  showShadows = true,
}: BookViewerProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  // Reading mode: camera locked, text selection enabled
  // Explore mode: OrbitControls enabled, page click to flip
  const [isReadingMode, setIsReadingMode] = useState(true);
  const totalPages = pages.length;

  /**
   * Navigate to the next page.
   */
  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  /**
   * Navigate to the previous page.
   */
  const handlePrev = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  /**
   * Jump to a specific page.
   *
   * @param index - The zero-based page index to navigate to
   */
  const goToPage = (index: number) => {
    if (index >= 0 && index <= totalPages) {
      setCurrentPage(index);
      onPageChange?.(index);
    }
  };

  return (
    <div
      className={`grimoire-container w-full h-screen flex flex-col items-center justify-center overflow-hidden relative ${className}`}
      style={{ backgroundColor: "#251612" }}
    >
      {/* Three.js Canvas */}
      <div className="w-full h-full">
        <Canvas shadows={showShadows}>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 5, 5]} fov={50} />

          {/* Lighting */}
          <ambientLight intensity={ambientLight} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={1}
            castShadow={showShadows}
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.3} />

          {/* Book Model */}
          <BookModel
            pages={pages}
            currentPage={currentPage}
            onNextPage={handleNext}
            onPrevPage={handlePrev}
            isReadingMode={isReadingMode}
          />

          {/* OrbitControls enabled in explore mode or when cameraControls prop is true */}
          {(!isReadingMode || cameraControls) && <OrbitControls />}
        </Canvas>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 flex gap-8 z-50">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0}
          aria-label="Previous page"
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
          aria-label="Next page"
          className="bg-[#00B0FF] hover:bg-[#40C4FF] disabled:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-xl shadow-[0_4px_0_#0080B0] active:shadow-none active:translate-y-1 transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Index Tabs */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
        {pages.map((page, index) => (
          <button
            key={page.id}
            type="button"
            onClick={() => goToPage(index)}
            aria-label={`Go to ${page.title}`}
            className="w-8 md:w-10 h-12 rounded-l-lg flex items-center justify-center text-[10px] font-bold tracking-widest cursor-pointer transition-all duration-300 hover:w-12 shadow-md"
            style={{
              backgroundColor:
                index === currentPage
                  ? page.tabColor || "#00B0FF"
                  : page.tabColor || "#E0E0E0",
              color: index === currentPage ? "#fff" : "#2c1a16",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              opacity: index <= currentPage ? 1 : 0.6,
            }}
          >
            {page.tabLabel || page.id}
          </button>
        ))}
      </div>

      {/* Mode Toggle Button */}
      <div className="absolute left-4 top-4 z-40">
        <button
          type="button"
          onClick={() => setIsReadingMode(!isReadingMode)}
          aria-label={
            isReadingMode ? "Switch to explore mode" : "Switch to reading mode"
          }
          className="bg-stone-800/80 hover:bg-stone-700 text-white p-3 rounded-lg backdrop-blur border border-stone-700 transition-all flex items-center gap-2"
          title={
            isReadingMode
              ? "Explore mode: drag to rotate, scroll to zoom"
              : "Reading mode: select text, scroll content"
          }
        >
          {isReadingMode ? <Unlock size={20} /> : <Lock size={20} />}
          <span className="text-xs">
            {isReadingMode ? "Explore" : "Reading"}
          </span>
        </button>
      </div>
    </div>
  );
}
