import { useRef } from "react";
import type { Group } from "three";
import type { PageContent } from "../types";

/**
 * Props for the BookModel component.
 */
interface BookModelProps {
  /** Array of pages to display */
  pages: PageContent[];
  /** Current page index (0-based) */
  currentPage: number;
  /** Callback when a page is clicked */
  onPageClick?: (pageIndex: number) => void;
}

/**
 * 3D Book model component rendered inside React Three Fiber Canvas.
 *
 * This is a placeholder implementation that renders a simple book shape.
 * Full implementation with page-flip animation will be added in Issue #7.
 *
 * @example
 * ```tsx
 * <Canvas>
 *   <BookModel pages={pages} currentPage={0} />
 * </Canvas>
 * ```
 */
export function BookModel({ pages, currentPage, onPageClick }: BookModelProps) {
  const groupRef = useRef<Group>(null);

  // Book dimensions
  const bookWidth = 4;
  const bookHeight = 3;
  const bookDepth = 0.5;

  return (
    <group ref={groupRef} rotation={[-Math.PI / 6, 0, 0]}>
      {/* Book Cover (Back) */}
      <mesh position={[0, 0, -bookDepth / 2]} receiveShadow>
        <boxGeometry args={[bookWidth, bookHeight, 0.1]} />
        <meshStandardMaterial color="#8B0000" roughness={0.8} />
      </mesh>

      {/* Book Spine */}
      <mesh position={[-bookWidth / 2, 0, 0]} receiveShadow>
        <boxGeometry args={[0.1, bookHeight, bookDepth]} />
        <meshStandardMaterial color="#6B0000" roughness={0.8} />
      </mesh>

      {/* Pages Stack (placeholder) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry
          args={[bookWidth - 0.2, bookHeight - 0.2, bookDepth - 0.15]}
        />
        <meshStandardMaterial color="#FDF6E3" roughness={0.9} />
      </mesh>

      {/* Book Cover (Front) - slightly open */}
      <mesh
        position={[bookWidth / 2 - 0.05, 0, bookDepth / 2 + 0.05]}
        rotation={[0, -0.1, 0]}
        receiveShadow
      >
        <boxGeometry args={[bookWidth, bookHeight, 0.1]} />
        <meshStandardMaterial color="#8B0000" roughness={0.8} />
      </mesh>

      {/* Current Page Indicator (simple plane) */}
      {pages.length > 0 && currentPage < pages.length && (
        // biome-ignore lint/a11y/noStaticElementInteractions: Three.js mesh element
        <mesh
          position={[0.1, 0, bookDepth / 2 + 0.1]}
          rotation={[0, -0.05, 0]}
          castShadow
          onClick={() => onPageClick?.(currentPage + 1)}
        >
          <planeGeometry args={[bookWidth - 0.3, bookHeight - 0.3]} />
          <meshStandardMaterial
            color="#FFFEF0"
            roughness={0.95}
            side={2} // DoubleSide
          />
        </mesh>
      )}

      {/* Ground plane for shadows */}
      <mesh
        position={[0, -bookHeight / 2 - 0.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </group>
  );
}
