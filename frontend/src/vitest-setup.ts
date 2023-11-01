import { expect, vi } from "vitest";
import "vitest-axe/extend-expect";
import "@testing-library/jest-dom";
import * as matchers from "vitest-axe/matchers";

// Extend the expect function with the axe matchers
expect.extend(matchers);

// Mock matchMedia
// Gathered from the official documentation of Jest
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
