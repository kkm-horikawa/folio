import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Mock ResizeObserver for react-use-measure (used by @react-three/fiber)
class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
globalThis.ResizeObserver = ResizeObserver;

// Mock WebGL context for Three.js
class WebGLRenderingContext {}
// @ts-expect-error - Mock for testing
globalThis.WebGLRenderingContext = WebGLRenderingContext;

// Mock canvas getContext
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
  canvas: { width: 100, height: 100 },
  drawImage: vi.fn(),
  fillRect: vi.fn(),
  clearRect: vi.fn(),
  getImageData: vi.fn(() => ({ data: new Uint8Array(4) })),
  putImageData: vi.fn(),
  createImageData: vi.fn(),
  setTransform: vi.fn(),
  resetTransform: vi.fn(),
  scale: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  closePath: vi.fn(),
  stroke: vi.fn(),
  fill: vi.fn(),
  measureText: vi.fn(() => ({ width: 0 })),
  // WebGL methods
  attachShader: vi.fn(),
  bindBuffer: vi.fn(),
  bindFramebuffer: vi.fn(),
  bindRenderbuffer: vi.fn(),
  bindTexture: vi.fn(),
  blendFunc: vi.fn(),
  bufferData: vi.fn(),
  checkFramebufferStatus: vi.fn(() => 36053),
  clear: vi.fn(),
  clearColor: vi.fn(),
  clearDepth: vi.fn(),
  clearStencil: vi.fn(),
  colorMask: vi.fn(),
  compileShader: vi.fn(),
  createBuffer: vi.fn(() => ({})),
  createFramebuffer: vi.fn(() => ({})),
  createProgram: vi.fn(() => ({})),
  createRenderbuffer: vi.fn(() => ({})),
  createShader: vi.fn(() => ({})),
  createTexture: vi.fn(() => ({})),
  cullFace: vi.fn(),
  deleteBuffer: vi.fn(),
  deleteFramebuffer: vi.fn(),
  deleteProgram: vi.fn(),
  deleteRenderbuffer: vi.fn(),
  deleteShader: vi.fn(),
  deleteTexture: vi.fn(),
  depthFunc: vi.fn(),
  depthMask: vi.fn(),
  disable: vi.fn(),
  disableVertexAttribArray: vi.fn(),
  drawArrays: vi.fn(),
  drawElements: vi.fn(),
  enable: vi.fn(),
  enableVertexAttribArray: vi.fn(),
  framebufferRenderbuffer: vi.fn(),
  framebufferTexture2D: vi.fn(),
  frontFace: vi.fn(),
  generateMipmap: vi.fn(),
  getActiveAttrib: vi.fn(() => ({})),
  getActiveUniform: vi.fn(() => ({})),
  getAttribLocation: vi.fn(() => 0),
  getExtension: vi.fn(() => null),
  getParameter: vi.fn(() => null),
  getProgramInfoLog: vi.fn(() => ""),
  getProgramParameter: vi.fn(() => true),
  getShaderInfoLog: vi.fn(() => ""),
  getShaderParameter: vi.fn(() => true),
  getShaderPrecisionFormat: vi.fn(() => ({
    precision: 23,
    rangeMax: 127,
    rangeMin: 127,
  })),
  getUniformLocation: vi.fn(() => ({})),
  lineWidth: vi.fn(),
  linkProgram: vi.fn(),
  pixelStorei: vi.fn(),
  renderbufferStorage: vi.fn(),
  scissor: vi.fn(),
  shaderSource: vi.fn(),
  stencilFunc: vi.fn(),
  stencilMask: vi.fn(),
  stencilOp: vi.fn(),
  texImage2D: vi.fn(),
  texParameteri: vi.fn(),
  uniform1f: vi.fn(),
  uniform1fv: vi.fn(),
  uniform1i: vi.fn(),
  uniform1iv: vi.fn(),
  uniform2f: vi.fn(),
  uniform2fv: vi.fn(),
  uniform2i: vi.fn(),
  uniform2iv: vi.fn(),
  uniform3f: vi.fn(),
  uniform3fv: vi.fn(),
  uniform3i: vi.fn(),
  uniform3iv: vi.fn(),
  uniform4f: vi.fn(),
  uniform4fv: vi.fn(),
  uniform4i: vi.fn(),
  uniform4iv: vi.fn(),
  uniformMatrix2fv: vi.fn(),
  uniformMatrix3fv: vi.fn(),
  uniformMatrix4fv: vi.fn(),
  useProgram: vi.fn(),
  vertexAttribPointer: vi.fn(),
  viewport: vi.fn(),
})) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// Cleanup after each test
afterEach(() => {
  cleanup();
});
