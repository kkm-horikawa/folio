import { animated, useSpring } from "@react-spring/three";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { ReactNode } from "react";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { PageContent } from "../types";

// Book dimensions
// Spine is at x=0, pages pivot from there
const PAGE_WIDTH = 2.5;
const PAGE_HEIGHT = 3.5;
const PAGE_SEGMENTS = 20;
const COVER_WIDTH = PAGE_WIDTH + 0.1;
const COVER_HEIGHT = PAGE_HEIGHT + 0.1;
const COVER_THICKNESS = 0.05;
const SPINE_RADIUS = 0.12;

// Front cover open angle (shared between cover and pages)
const COVER_OPEN_ANGLE = -Math.PI * 0.85;

interface BookModelProps {
  pages: PageContent[];
  currentPage: number;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  isReadingMode?: boolean;
}

interface Page3DProps {
  index: number;
  totalPages: number;
  isFlipped: boolean;
  frontContent?: ReactNode;
  backContent?: ReactNode;
  onFlipForward: () => void;
  onFlipBackward: () => void;
  isReadingMode: boolean;
}

/**
 * Bend the page geometry to create realistic page curl effect
 */
function useBendGeometry(
  meshRef: React.RefObject<THREE.Mesh | null>,
  flipProgress: number
) {
  useFrame(() => {
    if (!meshRef.current) return;

    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const positions = geometry.attributes.position;

    if (!positions) return;

    // Maximum bend at 50% of flip
    const bendAmount = Math.sin(flipProgress * Math.PI) * 0.3;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      // Normalized x position (0 to 1) from spine edge
      const normalizedX = x / PAGE_WIDTH;

      // Create a curved bend effect - more bend toward the free edge
      const bend = Math.sin(normalizedX * Math.PI * 0.8) * bendAmount;

      // Store original z if not stored
      if (!geometry.userData.originalZ) {
        geometry.userData.originalZ = [];
      }
      if ((geometry.userData.originalZ as number[])[i] === undefined) {
        (geometry.userData.originalZ as number[])[i] = positions.getZ(i);
      }
      const originalZ = (geometry.userData.originalZ as number[])[i] ?? 0;

      positions.setZ(i, originalZ + bend);
    }

    positions.needsUpdate = true;
  });
}

/**
 * Individual 3D page with flip animation.
 * Pages are anchored at x=0 (spine) and extend in +x direction.
 * When flipped, they rotate -180 degrees around the y-axis.
 */
function Page3D({
  index,
  totalPages,
  isFlipped,
  frontContent,
  backContent,
  onFlipForward,
  onFlipBackward,
  isReadingMode,
}: Page3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Stack pages with slight z offset
  const stackOffset = 0.004;

  // Right side (unflipped): first page on top (highest z), last page at bottom
  // Page 0 should be on top when unflipped
  const rightSideZ = (totalPages - index) * stackOffset;

  // Left side (flipped): last flipped page on top
  // When flipped, pages are in front of the open cover
  // Need higher z than cover (which is at SPINE_RADIUS)
  const leftSideZ = SPINE_RADIUS + 0.1 + index * stackOffset;

  // Spring animation for flip
  // Flipped pages rotate to match the open cover angle (not full 180)
  const { flipProgress, rotation } = useSpring({
    flipProgress: isFlipped ? 1 : 0,
    rotation: isFlipped ? COVER_OPEN_ANGLE : 0,
    config: {
      mass: 1,
      tension: 120,
      friction: 26,
      clamp: true, // Prevent overshoot/bounce
    },
  });

  // Track which side is visible and z position based on flip progress
  const [showBackContent, setShowBackContent] = useState(isFlipped);
  const [useLeftZ, setUseLeftZ] = useState(isFlipped);
  const lastShowBack = useRef(isFlipped);

  // Apply bend deformation and track flip progress
  useFrame(() => {
    const progress = flipProgress.get();
    // Switch content visibility and z position at 50% flip
    const shouldShowBack = progress > 0.5;
    if (shouldShowBack !== lastShowBack.current) {
      lastShowBack.current = shouldShowBack;
      setShowBackContent(shouldShowBack);
      setUseLeftZ(shouldShowBack);
    }
  });

  // Z position switches at 50% of animation
  const zPos = useLeftZ ? leftSideZ : rightSideZ;

  useBendGeometry(meshRef, flipProgress.get());

  // Create page geometry with segments for bending
  // Geometry is created with left edge at x=0
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      PAGE_WIDTH,
      PAGE_HEIGHT,
      PAGE_SEGMENTS,
      1
    );
    // Shift geometry so left edge is at origin (pivot point)
    geo.translate(PAGE_WIDTH / 2, 0, 0);
    return geo;
  }, []);

  // Handle click - any page click triggers next/prev based on which side
  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    // Flipped pages are on the left, clicking goes backward
    // Unflipped pages are on the right, clicking goes forward
    if (isFlipped) {
      onFlipBackward();
    } else {
      onFlipForward();
    }
  };

  // Center position of the page (for Html placement)
  const pageCenterX = PAGE_WIDTH / 2;

  return (
    <animated.group position-z={zPos} rotation-y={rotation}>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: Three.js mesh */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#FFFEF5"
          roughness={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Front content (visible when page is facing right, not yet flipped past 50%) */}
      {!showBackContent && (
        <Html position={[pageCenterX, 0, 0.01]} transform distanceFactor={3.5}>
          {/* biome-ignore lint/a11y/noStaticElementInteractions: 3D content click */}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: 3D content click */}
          <div
            className={`page-content-inner ${isReadingMode ? "reading-mode" : "explore-mode"}`}
            onClick={isReadingMode ? undefined : onFlipForward}
          >
            {frontContent}
            <div className="page-number">{index * 2 + 1}</div>
          </div>
        </Html>
      )}

      {/* Back content (visible when page is flipped past 50%) */}
      {showBackContent && (
        <Html
          position={[pageCenterX, 0, -0.01]}
          rotation={[0, Math.PI, 0]}
          transform
          distanceFactor={3.5}
        >
          {/* biome-ignore lint/a11y/noStaticElementInteractions: 3D content click */}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: 3D content click */}
          <div
            className={`page-content-inner ${isReadingMode ? "reading-mode" : "explore-mode"}`}
            onClick={isReadingMode ? undefined : onFlipBackward}
          >
            {backContent}
            <div className="page-number">{index * 2 + 2}</div>
          </div>
        </Html>
      )}
    </animated.group>
  );
}

/**
 * Book cover - pivots from spine edge
 */
function BookCover({ isBack = false }: { isBack?: boolean }) {
  const { rotation } = useSpring({
    // Front cover opens, back cover stays flat
    rotation: isBack ? 0 : COVER_OPEN_ANGLE,
    config: { mass: 1, tension: 100, friction: 20 },
  });

  // Cover geometry pivots from left edge (spine side)
  const geometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(
      COVER_WIDTH,
      COVER_HEIGHT,
      COVER_THICKNESS
    );
    geo.translate(COVER_WIDTH / 2, 0, 0);
    return geo;
  }, []);

  const zPos = isBack ? -SPINE_RADIUS : SPINE_RADIUS;

  return (
    <animated.group position-z={zPos} rotation-y={rotation}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color="#8B0000" roughness={0.7} metalness={0.1} />
      </mesh>
    </animated.group>
  );
}

/**
 * Book spine - simple box connecting front and back covers
 */
function BookSpine() {
  return (
    <mesh position={[-SPINE_RADIUS / 2, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[SPINE_RADIUS, COVER_HEIGHT, SPINE_RADIUS * 2]} />
      <meshStandardMaterial color="#6B0000" roughness={0.8} metalness={0.1} />
    </mesh>
  );
}

/**
 * 3D Book model component with page flip animation.
 *
 * Coordinate system:
 * - Spine is centered at origin (x=0)
 * - Pages extend in +x direction (right side of open book)
 * - When flipped, pages rotate to -x direction (left side)
 */
export function BookModel({
  pages,
  currentPage,
  onNextPage,
  onPrevPage,
  isReadingMode = true,
}: BookModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group
      ref={groupRef}
      rotation={[-Math.PI / 10, 0, 0]}
      position={[0, 0.5, 0]}
    >
      {/* Back Cover - lies flat, extends to +x */}
      <BookCover isBack />

      {/* Spine */}
      <BookSpine />

      {/* Pages - all pivot from spine (x=0) */}
      {pages.map((page, index) => (
        <Page3D
          key={page.id}
          index={index}
          totalPages={pages.length}
          isFlipped={index < currentPage}
          frontContent={page.front}
          backContent={page.back}
          onFlipForward={() => onNextPage?.()}
          onFlipBackward={() => onPrevPage?.()}
          isReadingMode={isReadingMode}
        />
      ))}

      {/* Front Cover - opens outward */}
      <BookCover />

      {/* Ground shadow plane */}
      <mesh
        position={[0, -COVER_HEIGHT / 2 - 0.8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[15, 15]} />
        <shadowMaterial opacity={0.25} />
      </mesh>
    </group>
  );
}
